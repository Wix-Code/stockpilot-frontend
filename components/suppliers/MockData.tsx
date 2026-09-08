import { Supplier } from "./SuppliersTypes";

export const suppliers: Supplier[] = [
  {
    id: "sup-001",
    name: "Tech Distribution Nigeria",
    contactPerson: "Chinedu Okafor",
    phone: "+234 803 321 7788",
    email: "sales@techdistribution.ng",
    address: "Wuse 2, Abuja",
    notes: "Primary supplier for Apple and Samsung devices.",
    totalPurchases: 10800000,
    purchaseCount: 8,
    status: "active",
    createdAt: "2026-06-15T09:00:00",
  },

  {
    id: "sup-002",
    name: "MobileHub Wholesale",
    contactPerson: "Aisha Bello",
    phone: "+234 806 450 0192",
    email: "orders@mobilehub.ng",
    address: "Computer Village, Ikeja, Lagos",
    totalPurchases: 5840000,
    purchaseCount: 5,
    status: "active",
    createdAt: "2026-07-02T09:00:00",
  },

  {
    id: "sup-003",
    name: "Prime Accessories Ltd",
    contactPerson: "Samuel Obi",
    phone: "+234 809 112 4400",
    email: "hello@primeaccessories.ng",
    address: "Garki Area 11, Abuja",
    totalPurchases: 1920000,
    purchaseCount: 12,
    status: "active",
    createdAt: "2026-05-21T09:00:00",
  },
];
