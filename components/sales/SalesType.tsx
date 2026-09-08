export type PaymentStatus = "paid" | "pending" | "refunded";

export type SaleStatus = "completed" | "cancelled";

export interface SaleItem {
  id: string;
  productId: string;
  productName: string;
  sku: string;

  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Sale {
  id: string;
  reference: string;

  customerName?: string;

  items: SaleItem[];

  subtotal: number;
  discount: number;
  total: number;

  paymentStatus: PaymentStatus;
  status: SaleStatus;

  createdBy: string;
  createdAt: string;
}
