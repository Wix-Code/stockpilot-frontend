export interface Supplier {
  id: string;

  name: string;
  contactPerson?: string;

  phone?: string;
  email?: string;
  address?: string;

  notes?: string;

  totalPurchases: number;
  purchaseCount: number;

  status: "active" | "inactive";

  createdAt: string;
}
