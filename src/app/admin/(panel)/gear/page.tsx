"use client";

import { useCallback, useEffect, useState } from "react";
import { LocalImageField } from "@/components/admin/LocalImageField";
import { useToast } from "@/components/admin/Toast";
import type { GearProduct } from "@/data/gear-for-sale";

function newProduct(): GearProduct {
  return {
    id: `gear-${Date.now()}`,
    name: "",
    description: "",
    priceCents: 0,
    image: "",
    quantityInStock: 1,
    published: true,
    order: 0,
  };
}

export default function AdminGearPage() {
  const { showToast } = useToast();
  const [items, setItems] = useState<GearProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);

  const load = useCallback(() => {
    return fetch("/api/admin/gear")
      .then((res) => res.json())
      .then((data) => setItems(data.items || []))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function saveProduct(product: GearProduct) {
    setSavingId(product.id);
    try {
      const response = await fetch("/api/admin/gear", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product }),
      });
      if (!response.ok) throw new Error("Save failed");
      showToast(`Saved “${product.name}”`);
      await load();
    } catch {
      showToast("Failed to save item", "error");
    } finally {
      setSavingId(null);
    }
  }

  async function markSold(id: string) {
    setSavingId(id);
    try {
      const response = await fetch("/api/admin/gear", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "sell", id }),
      });
      if (!response.ok) throw new Error("Update failed");
      showToast("Quantity reduced by 1");
      await load();
    } catch {
      showToast("Failed to update quantity", "error");
    } finally {
      setSavingId(null);
    }
  }

  async function removeProduct(id: string) {
    if (!confirm("Delete this item permanently?")) return;
    try {
      const response = await fetch(`/api/admin/gear?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Delete failed");
      showToast("Item deleted");
      setItems((prev) => prev.filter((p) => p.id !== id));
    } catch {
      showToast("Failed to delete item", "error");
    }
  }

  function updateLocal(id: string, patch: Partial<GearProduct>) {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }

  if (loading) return <p>Loading gear...</p>;

  return (
    <div>
      <h1 className="font-display text-3xl font-bold uppercase text-deep-navy">Mountie Gear For Sale</h1>
      <p className="mt-2 max-w-2xl text-sm text-mountie-blue/70">
        Manage items shown on the public store. Use <strong>Mark 1 sold</strong> after each sale to
        lower quantity; at zero, the site shows <strong>Sold out</strong>.
      </p>

      <button
        type="button"
        className="mt-6 rounded-sm bg-electric-blue px-4 py-2 text-sm font-bold uppercase text-white hover:bg-mountie-blue"
        onClick={() => setItems((prev) => [...prev, newProduct()])}
      >
        Add item
      </button>

      <div className="mt-8 space-y-6">
        {items.length === 0 && (
          <p className="text-sm text-mountie-blue/60">No items yet. Click Add item to create one.</p>
        )}
        {items.map((product) => (
          <div key={product.id} className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-mountie-blue/10">
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase text-mountie-blue/60">Name</label>
                <input
                  className="form-input w-full"
                  value={product.name}
                  onChange={(e) => updateLocal(product.id, { name: e.target.value })}
                />
                <label className="block text-xs font-bold uppercase text-mountie-blue/60">
                  Description
                </label>
                <textarea
                  className="form-input w-full min-h-[80px]"
                  value={product.description}
                  onChange={(e) => updateLocal(product.id, { description: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-mountie-blue/60">
                      Price (USD)
                    </label>
                    <input
                      type="number"
                      min={0}
                      step={0.01}
                      className="form-input w-full"
                      value={(product.priceCents / 100).toFixed(2)}
                      onChange={(e) =>
                        updateLocal(product.id, {
                          priceCents: Math.round(parseFloat(e.target.value || "0") * 100),
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-mountie-blue/60">
                      In stock
                    </label>
                    <input
                      type="number"
                      min={0}
                      className="form-input w-full"
                      value={product.quantityInStock}
                      onChange={(e) =>
                        updateLocal(product.id, {
                          quantityInStock: Math.max(0, parseInt(e.target.value || "0", 10)),
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-mountie-blue/60">
                    Price label (optional)
                  </label>
                  <input
                    className="form-input w-full"
                    placeholder='e.g. "From $25.00"'
                    value={product.priceLabel ?? ""}
                    onChange={(e) =>
                      updateLocal(product.id, { priceLabel: e.target.value || undefined })
                    }
                  />
                </div>
                <div className="flex flex-wrap gap-4 text-sm">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={product.published}
                      onChange={(e) => updateLocal(product.id, { published: e.target.checked })}
                    />
                    Published on store
                  </label>
                  <label className="flex items-center gap-2">
                    Sort order
                    <input
                      type="number"
                      className="form-input w-20"
                      value={product.order}
                      onChange={(e) =>
                        updateLocal(product.id, { order: parseInt(e.target.value || "0", 10) })
                      }
                    />
                  </label>
                </div>
              </div>
              <LocalImageField
                label="Product photo"
                folder="products"
                value={product.image}
                onChange={(url) => updateLocal(product.id, { image: url })}
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                disabled={savingId === product.id}
                className="rounded-sm bg-deep-navy px-3 py-2 text-xs font-bold uppercase text-white hover:bg-mountie-blue disabled:opacity-50"
                onClick={() => saveProduct(product)}
              >
                {savingId === product.id ? "Saving…" : "Save"}
              </button>
              <button
                type="button"
                disabled={savingId === product.id || product.quantityInStock <= 0}
                className="rounded-sm border border-mountie-blue/30 px-3 py-2 text-xs font-bold uppercase text-mountie-blue hover:bg-light-bg disabled:opacity-50"
                onClick={() => markSold(product.id)}
              >
                Mark 1 sold
              </button>
              <button
                type="button"
                className="rounded-sm border border-red-300 px-3 py-2 text-xs font-bold uppercase text-red-700 hover:bg-red-50"
                onClick={() => removeProduct(product.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
