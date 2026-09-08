"use client";

import { useMemo, useState } from "react";
import { suppliers as initialSuppliers } from "@/components/suppliers/MockData";

import { FormDialog } from "@/components/reuseable/FormDialog";
import { DetailsSheet } from "@/components/reuseable/DetailsSheet";
import { Supplier } from "@/components/suppliers/SuppliersTypes";
import { SupplierHeader } from "@/components/suppliers/SuppliersHeader";
import { SupplierStats } from "@/components/suppliers/SuppliersStats";
import { SupplierToolbar } from "@/components/suppliers/SuppliersToolbar";
import { SupplierTable } from "@/components/suppliers/SuppliersTable";
import { SupplierForm } from "@/components/suppliers/SuppliersForm";
import { SupplierDetails } from "@/components/suppliers/SuppliersDetails";

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("all");

  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null,
  );

  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);

  const [detailsOpen, setDetailsOpen] = useState(false);

  const [formOpen, setFormOpen] = useState(false);

  const filteredSuppliers = useMemo(() => {
    const term = search.trim().toLowerCase();

    return suppliers.filter((supplier) => {
      const matchesSearch =
        !term ||
        supplier.name.toLowerCase().includes(term) ||
        supplier.contactPerson?.toLowerCase().includes(term) ||
        supplier.phone?.toLowerCase().includes(term) ||
        supplier.email?.toLowerCase().includes(term);

      const matchesStatus = status === "all" || supplier.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [suppliers, search, status]);

  function openSupplier(supplier: Supplier) {
    setSelectedSupplier(supplier);
    setDetailsOpen(true);
  }

  function editSupplier(supplier: Supplier) {
    setDetailsOpen(false);
    setEditingSupplier(supplier);
    setFormOpen(true);
  }

  function saveSupplier(values: {
    name: string;
    contactPerson: string;
    phone: string;
    email: string;
    address: string;
    notes: string;
  }) {
    if (editingSupplier) {
      setSuppliers((current) =>
        current.map((supplier) =>
          supplier.id === editingSupplier.id
            ? {
                ...supplier,
                ...values,
              }
            : supplier,
        ),
      );
    } else {
      const newSupplier: Supplier = {
        id: crypto.randomUUID(),
        ...values,
        totalPurchases: 0,
        purchaseCount: 0,
        status: "active",
        createdAt: new Date().toISOString(),
      };

      setSuppliers((current) => [newSupplier, ...current]);
    }

    setFormOpen(false);
    setEditingSupplier(null);
  }

  return (
    <>
      <SupplierHeader
        onAddSupplier={() => {
          setEditingSupplier(null);
          setFormOpen(true);
        }}
      />

      <SupplierStats suppliers={suppliers} />

      <SupplierToolbar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
      />

      <SupplierTable
        suppliers={filteredSuppliers}
        onView={openSupplier}
        onEdit={editSupplier}
      />

      <FormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        title={editingSupplier ? "Edit supplier" : "Add supplier"}
        description={
          editingSupplier
            ? "Update supplier contact and business information."
            : "Create a supplier record for purchases and receiving."
        }
        size="lg"
      >
        <SupplierForm
          supplier={editingSupplier}
          onSubmit={saveSupplier}
          onCancel={() => {
            setFormOpen(false);
            setEditingSupplier(null);
          }}
        />
      </FormDialog>

      <DetailsSheet
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        title="Supplier details"
        description="Review supplier information and purchasing activity."
        width="lg"
      >
        {selectedSupplier && (
          <SupplierDetails
            supplier={
              suppliers.find(
                (supplier) => supplier.id === selectedSupplier.id,
              ) || selectedSupplier
            }
            onEdit={() => editSupplier(selectedSupplier)}
          />
        )}
      </DetailsSheet>
    </>
  );
}
