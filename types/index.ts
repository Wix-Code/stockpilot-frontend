export type StockStatus = "in-stock" | "low-stock" | "out-of-stock";

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  brand?: string;
  unit: string;
  costPrice: number;
  sellingPrice: number;
  stockQty: number;
  reorderLevel: number;
  imageUrl?: string;
  status: StockStatus;
}

export type MovementType = "stock-in" | "stock-out" | "adjustment";

export interface InventoryMovement {
  id: string;
  productId: string;
  productName: string;
  type: MovementType;
  quantity: number;
  reason: string;
  actor: string;
  createdAt: string;
}

export type PaymentStatus = "unpaid" | "partial" | "paid" | "refunded";

export interface Sale {
  id: string;
  reference: string;
  customerName?: string;
  items: number;
  subtotal: number;
  discount: number;
  total: number;
  paymentStatus: PaymentStatus;
  createdAt: string;
}

export interface Purchase {
  id: string;
  reference: string;
  supplierName: string;
  items: number;
  total: number;
  status: "pending" | "received" | "cancelled";
  createdAt: string;
}

export interface Supplier {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  totalPurchases: number;
}

export interface DashboardStats {
  totalProducts: number;
  totalStockValue: number;
  lowStockCount: number;
  outOfStockCount: number;
  todaySales: number;
  periodSales: number;
}
