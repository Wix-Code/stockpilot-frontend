export type PurchaseStatus = "pending" | "received" | "cancelled";

export interface PurchaseItem {
  id: string;

  productId: string;
  productName: string;
  sku: string;

  quantity: number;
  unitCost: number;
  subtotal: number;
}

export interface Purchase {
  id: string;
  reference: string;

  supplierId: string;
  supplierName: string;

  items: PurchaseItem[];

  total: number;

  status: PurchaseStatus;

  createdBy: string;

  createdAt: string;
  receivedAt?: string;
}
