export type ProductStatus = "active" | "archived";

export type StockMovementType =
  | "opening_stock"
  | "stock_in"
  | "stock_out"
  | "sale"
  | "purchase"
  | "adjustment";

export interface StockMovement {
  id: string;
  type: StockMovementType;
  quantity: number;
  reason?: string;
  reference?: string;
  actor: string;
  createdAt: string;
}

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

  image?: string;

  status: ProductStatus;

  createdAt: string;
  updatedAt: string;

  movements?: StockMovement[];
}
