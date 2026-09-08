export type StockMovementType =
  | "opening_stock"
  | "stock_in"
  | "stock_out"
  | "sale"
  | "purchase"
  | "adjustment";

export interface InventoryMovement {
  id: string;

  productId: string;

  type: StockMovementType;

  quantity: number;

  previousQty: number;
  newQty: number;

  reason?: string;

  reference?: string;

  actor: string;

  createdAt: string;
}

export interface InventoryItem {
  id: string;

  name: string;
  sku: string;

  category: string;
  brand?: string;

  unit: string;

  stockQty: number;
  reorderLevel: number;

  costPrice: number;
  sellingPrice: number;

  image?: string;

  movements: InventoryMovement[];
}
