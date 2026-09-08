"use client";

import { useState } from "react";

import { sales as initialSales } from "@/components/sales/MockData";

import { SalesHeader } from "@/components/sales/SalesHeader";
import { SalesStats } from "@/components/sales/SalesStats";
import { SalesTable } from "@/components/sales/SalesTable";
import { SaleForm } from "@/components/sales/SalesForm";
import { SaleDetails } from "@/components/sales/SalesDetails";

import { FormDialog } from "@/components/reuseable/FormDialog";
import { DetailsSheet } from "@/components/reuseable/DetailsSheet";
import { Sale } from "@/components/sales/SalesType";
import { inventoryItems } from "@/components/inventory/MockData";

export default function SalesPage() {
  const [sales, setSales] = useState<Sale[]>(initialSales);

  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);

  const [formOpen, setFormOpen] = useState(false);

  const [detailsOpen, setDetailsOpen] = useState(false);

  function openSale(sale: Sale) {
    setSelectedSale(sale);
    setDetailsOpen(true);
  }

  function createSale(values: {
    customerName: string;
    items: Sale["items"];
    discount: number;
    paymentStatus: "paid" | "pending";
  }) {
    const subtotal = values.items.reduce((sum, item) => sum + item.subtotal, 0);

    const newSale: Sale = {
      id: crypto.randomUUID(),

      reference: `SL-${Date.now().toString().slice(-5)}`,

      customerName: values.customerName || "Walk-in Customer",

      items: values.items,

      subtotal,

      discount: values.discount,

      total: subtotal - values.discount,

      paymentStatus: values.paymentStatus,

      status: "completed",

      createdBy: "Daniel Adeyemi",

      createdAt: new Date().toISOString(),
    };

    setSales((current) => [newSale, ...current]);

    setFormOpen(false);
  }

  function cancelSale(sale: Sale) {
    setSales((current) =>
      current.map((item) =>
        item.id === sale.id
          ? {
              ...item,
              status: "cancelled",
            }
          : item,
      ),
    );

    setDetailsOpen(false);
  }

  return (
    <>
      <SalesHeader onNewSale={() => setFormOpen(true)} />

      <SalesStats sales={sales} />

      <SalesTable sales={sales} onView={openSale} onCancel={cancelSale} />

      <FormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        title="New sale"
        description="Select products, confirm quantities and complete the transaction."
        size="xl"
      >
        <SaleForm
          products={inventoryItems}
          onCancel={() => setFormOpen(false)}
          onSubmit={createSale}
        />
      </FormDialog>

      <DetailsSheet
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        title="Sale details"
        description="Review transaction information and items."
        width="lg"
      >
        {selectedSale && (
          <SaleDetails
            sale={
              sales.find((sale) => sale.id === selectedSale.id) || selectedSale
            }
            onCancel={() => cancelSale(selectedSale)}
          />
        )}
      </DetailsSheet>
    </>
  );
}
