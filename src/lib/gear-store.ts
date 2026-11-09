import { getDb } from "@/lib/db";
import { gearProductsSeed, type GearProduct } from "@/data/gear-for-sale";

const COLLECTION = "gear_products";

async function withDb<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  if (!process.env.MONGODB_URI) return fallback;
  try {
    return await fn();
  } catch (error) {
    console.error("Gear store database unavailable, using static fallback:", error);
    return fallback;
  }
}

function sortProducts(products: GearProduct[]): GearProduct[] {
  return [...products].sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
}

function mergeWithSeed(stored: GearProduct[]): GearProduct[] {
  const byId = new Map(stored.map((p) => [p.id, p]));
  for (const seed of gearProductsSeed) {
    if (!byId.has(seed.id)) {
      byId.set(seed.id, seed);
    }
  }
  return sortProducts(Array.from(byId.values()));
}

export async function ensureGearStoreSeeded(): Promise<void> {
  if (!process.env.MONGODB_URI || gearProductsSeed.length === 0) return;
  const db = await getDb();
  const now = new Date();

  for (const product of gearProductsSeed) {
    await db.collection(COLLECTION).updateOne(
      { id: product.id },
      {
        $set: {
          id: product.id,
          name: product.name,
          description: product.description,
          priceCents: product.priceCents,
          priceLabel: product.priceLabel,
          image: product.image,
          images: product.images,
          published: product.published,
          order: product.order,
          updatedAt: now,
        },
        $setOnInsert: {
          quantityInStock: product.quantityInStock,
          createdAt: now,
        },
      },
      { upsert: true },
    );
  }
}

async function readAllFromDb(): Promise<GearProduct[]> {
  const db = await getDb();
  await ensureGearStoreSeeded();
  const docs = await db.collection<GearProduct>(COLLECTION).find({}).toArray();
  return mergeWithSeed(docs);
}

export async function listPublishedGearProducts(): Promise<GearProduct[]> {
  return withDb(async () => {
    const all = await readAllFromDb();
    return all.filter((p) => p.published);
  }, sortProducts(gearProductsSeed.filter((p) => p.published)));
}

export async function listAllGearProducts(): Promise<GearProduct[]> {
  return withDb(async () => readAllFromDb(), sortProducts(gearProductsSeed));
}

export async function upsertGearProduct(product: GearProduct): Promise<GearProduct> {
  const now = new Date();
  return withDb(
    async () => {
      const db = await getDb();
      await db.collection(COLLECTION).updateOne(
        { id: product.id },
        {
          $set: { ...product, updatedAt: now },
          $setOnInsert: { createdAt: now },
        },
        { upsert: true },
      );
      return product;
    },
    product,
  );
}

export async function deleteGearProduct(id: string): Promise<void> {
  await withDb(async () => {
    const db = await getDb();
    await db.collection(COLLECTION).deleteOne({ id });
  }, null);
}

export async function recordGearSale(id: string, quantity = 1): Promise<GearProduct | null> {
  return withDb(
    async () => {
      const db = await getDb();
      const doc = await db.collection<GearProduct>(COLLECTION).findOne({ id });
      if (!doc) return null;
      const nextQty = Math.max(0, doc.quantityInStock - quantity);
      await db.collection(COLLECTION).updateOne(
        { id },
        { $set: { quantityInStock: nextQty, updatedAt: new Date() } },
      );
      return { ...doc, quantityInStock: nextQty };
    },
    null,
  );
}

export function formatGearPrice(product: GearProduct): string {
  if (product.priceLabel) return product.priceLabel;
  if (product.priceCents <= 0) return "Contact for price";
  return `$${(product.priceCents / 100).toFixed(2)}`;
}
