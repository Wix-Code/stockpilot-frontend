"use client";

import { useMemo, useState } from "react";

import { FormDialog } from "@/components/reuseable/FormDialog";

import { DetailsSheet } from "@/components/reuseable/DetailsSheet";
import { InventoryItem, InventoryMovement } from "@/components/inventory/InventoryTypes";
import { InventoryToolbar } from "@/components/inventory/InventoryToolbar";
import { InventoryStats } from "@/components/inventory/InventoryStats";
import { InventoryHeader } from "@/components/inventory/InventoryHeader";
import { InventoryTable } from "@/components/inventory/InventoryTable";
import { InventoryDetails } from "@/components/inventory/InventoryDetails";
import { StockMovementForm } from "@/components/inventory/InventoryStockForm";
import { inventoryItems as initialInventory } from "@/components/inventory/MockData";

type MovementAction = "stock_in" | "stock_out" | "adjustment";

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>(initialInventory);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("all");

  const [stock, setStock] = useState("all");

  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  const [detailsOpen, setDetailsOpen] = useState(false);

  const [movementOpen, setMovementOpen] = useState(false);

  const [movementAction, setMovementAction] =
    useState<MovementAction>("stock_in");

  const [movementItem, setMovementItem] = useState<InventoryItem | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(items.map((item) => item.category))).sort(),
    [items],
  );

  const filteredItems = useMemo(() => {
    const term = search.trim().toLowerCase();

    return items.filter((item) => {
      const matchesSearch =
        !term ||
        item.name.toLowerCase().includes(term) ||
        item.sku.toLowerCase().includes(term) ||
        item.brand?.toLowerCase().includes(term);

      const matchesCategory = category === "all" || item.category === category;

      let matchesStock = true;

      if (stock === "healthy") {
        matchesStock = item.stockQty > item.reorderLevel;
      }

      if (stock === "low") {
        matchesStock = item.stockQty > 0 && item.stockQty <= item.reorderLevel;
      }

      if (stock === "out") {
        matchesStock = item.stockQty <= 0;
      }

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [items, search, category, stock]);

  function openDetails(item: InventoryItem) {
    setSelectedItem(item);
    setDetailsOpen(true);
  }

  function openMovement(action: MovementAction, item?: InventoryItem) {
    setMovementAction(action);

    setMovementItem(item || null);

    setMovementOpen(true);
  }

  function recordMovement(values: {
    productId: string;
    action: MovementAction;
    quantity: number;
    reason: string;
  }) {
    setItems((current) =>
      current.map((item) => {
        if (item.id !== values.productId) {
          return item;
        }

        const previousQty = item.stockQty;

        let change = values.quantity;

        if (values.action === "stock_out") {
          change = -values.quantity;
        }

        /*
          For this first UI implementation,
          adjustment is treated as a positive
          correction.

          Later we can add:
          Adjustment direction:
          Increase / Decrease
        */

        const newQty = previousQty + change;

        if (newQty < 0) {
          return item;
        }

        const movement: InventoryMovement = {
          id: crypto.randomUUID(),

          productId: item.id,

          type: values.action === "adjustment" ? "adjustment" : values.action,

          quantity: change,

          previousQty,

          newQty,

          reason: values.reason,

          actor: "Daniel Adeyemi",

          createdAt: new Date().toISOString(),
        };

        return {
          ...item,

          stockQty: newQty,

          movements: [...item.movements, movement],
        };
      }),
    );

    setMovementOpen(false);

    /*
      Keep details in sync
      if currently viewing this product
    */

    if (selectedItem?.id === values.productId) {
      const target = items.find((item) => item.id === values.productId);

      if (target) {
        let change = values.quantity;

        if (values.action === "stock_out") {
          change = -values.quantity;
        }

        setSelectedItem({
          ...target,

          stockQty: target.stockQty + change,
        });
      }
    }
  }

  return (
    <>
      <InventoryHeader
        onStockIn={() => openMovement("stock_in")}
        onStockOut={() => openMovement("stock_out")}
      />

      <InventoryStats items={items} />

      <InventoryToolbar
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        stock={stock}
        onStockChange={setStock}
        categories={categories}
      />

      <InventoryTable
        items={filteredItems}
        onView={openDetails}
        onAdjust={(item) => openMovement("adjustment", item)}
      />

      {/* DETAILS */}

      <DetailsSheet
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        title="Inventory details"
        description="Review stock level and movement history."
        width="lg"
      >
        {selectedItem && (
          <InventoryDetails
            item={
              items.find((item) => item.id === selectedItem.id) || selectedItem
            }
            onStockIn={() => {
              setDetailsOpen(false);

              openMovement("stock_in", selectedItem);
            }}
            onStockOut={() => {
              setDetailsOpen(false);

              openMovement("stock_out", selectedItem);
            }}
            onAdjust={() => {
              setDetailsOpen(false);

              openMovement("adjustment", selectedItem);
            }}
          />
        )}
      </DetailsSheet>

      {/* STOCK MOVEMENT */}

      <FormDialog
        open={movementOpen}
        onOpenChange={setMovementOpen}
        title={
          movementAction === "stock_in"
            ? "Stock in"
            : movementAction === "stock_out"
              ? "Stock out"
              : "Adjust stock"
        }
        description="Record an inventory movement. The transaction will be added to the product history."
        size="md"
      >
        <StockMovementForm
          item={movementItem}
          defaultAction={movementAction}
          items={items}
          onCancel={() => setMovementOpen(false)}
          onSubmit={recordMovement}
        />
      </FormDialog>
    </>
  );
}
