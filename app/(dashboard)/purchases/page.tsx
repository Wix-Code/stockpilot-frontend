"use client";

import { useState } from "react";

import { purchases as initialPurchases, suppliers } from "@/components/purchase/MockData";

import { FormDialog } from "@/components/reuseable/FormDialog";

import { DetailsSheet } from "@/components/reuseable/DetailsSheet";

import { Purchase } from "@/components/purchase/PurchaseTypes";
import { PurchaseHeader } from "@/components/purchase/PurchaseHeader";
import { PurchaseTable } from "@/components/purchase/PurchaseTable";
import { PurchaseForm } from "@/components/purchase/PurchaseForm";
import { inventoryItems } from "@/components/inventory/MockData";
import { PurchaseDetails } from "@/components/purchase/PurchaseDetais";
export default function PurchasesPage() {
  const [purchases, setPurchases] = useState<Purchase[]>(initialPurchases);

  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(
    null,
  );

  const [formOpen, setFormOpen] = useState(false);

  const [detailsOpen, setDetailsOpen] = useState(false);

  function openPurchase(purchase: Purchase) {
    setSelectedPurchase(purchase);

    setDetailsOpen(true);
  }

  function createPurchase(values: {
    supplierId: string;

    items: Purchase["items"];

    receiveNow: boolean;
  }) {
    const supplier = suppliers.find(
      (supplier) => supplier.id === values.supplierId,
    );

    if (!supplier) return;

    const total = values.items.reduce((sum, item) => sum + item.subtotal, 0);

    const newPurchase: Purchase = {
      id: crypto.randomUUID(),

      reference: `PO-${Date.now().toString().slice(-5)}`,

      supplierId: supplier.id,

      supplierName: supplier.name,

      items: values.items,

      total,

      status: values.receiveNow ? "received" : "pending",

      createdBy: "Daniel Adeyemi",

      createdAt: new Date().toISOString(),

      receivedAt: values.receiveNow ? new Date().toISOString() : undefined,
    };

    setPurchases((current) => [newPurchase, ...current]);

    setFormOpen(false);
  }

  function receivePurchase(purchase: Purchase) {
    setPurchases((current) =>
      current.map((item) =>
        item.id === purchase.id
          ? {
              ...item,

              status: "received",

              receivedAt: new Date().toISOString(),
            }
          : item,
      ),
    );

    setDetailsOpen(false);
  }

  return (
    <>
      <PurchaseHeader onNewPurchase={() => setFormOpen(true)} />

      <PurchaseTable
        purchases={purchases}
        onView={openPurchase}
        onReceive={receivePurchase}
      />

      <FormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        title="New purchase"
        description="Record products purchased from a supplier and optionally receive them immediately."
        size="xl"
      >
        <PurchaseForm
          products={inventoryItems}
          suppliers={suppliers}
          onCancel={() => setFormOpen(false)}
          onSubmit={createPurchase}
        />
      </FormDialog>

      <DetailsSheet
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        title="Purchase details"
        description="Review supplier, items and receiving information."
        width="lg"
      >
        {selectedPurchase && (
          <PurchaseDetails
            purchase={
              purchases.find((item) => item.id === selectedPurchase.id) ||
              selectedPurchase
            }
            onReceive={() => receivePurchase(selectedPurchase)}
          />
        )}
      </DetailsSheet>
    </>
  );
}
