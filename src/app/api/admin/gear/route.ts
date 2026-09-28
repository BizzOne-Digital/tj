export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/auth";
import type { GearProduct } from "@/data/gear-for-sale";
import {
  deleteGearProduct,
  listAllGearProducts,
  recordGearSale,
  upsertGearProduct,
} from "@/lib/gear-store";

function revalidateGear() {
  revalidatePath("/mountie-gear-for-sale");
}

export async function GET() {
  try {
    await requireAdmin();
    const items = await listAllGearProducts();
    return NextResponse.json({ items });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const body = (await request.json()) as { product?: GearProduct; action?: string; id?: string };

    if (body.action === "sell" && body.id) {
      const updated = await recordGearSale(body.id, 1);
      if (!updated) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
      }
      revalidateGear();
      return NextResponse.json({ product: updated });
    }

    const product = body.product;
    if (!product?.id || !product.name) {
      return NextResponse.json({ error: "product with id and name is required" }, { status: 400 });
    }

    const saved = await upsertGearProduct({
      id: product.id,
      name: product.name,
      description: product.description ?? "",
      priceCents: Number(product.priceCents) || 0,
      priceLabel: product.priceLabel || undefined,
      image: product.image ?? "",
      images: Array.isArray(product.images) ? product.images : undefined,
      quantityInStock: Math.max(0, Number(product.quantityInStock) || 0),
      published: Boolean(product.published),
      order: Number(product.order) || 0,
    });

    revalidateGear();
    return NextResponse.json({ product: saved });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await requireAdmin();
    const id = new URL(request.url).searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "id query param required" }, { status: 400 });
    }
    await deleteGearProduct(id);
    revalidateGear();
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}
