import { Purchase } from "./PurchaseTypes";

export const purchases: Purchase[] = [
  {
    id: "pur-001",
    reference: "PO-0018",

    supplierId: "sup-001",
    supplierName: "Tech Distribution Nigeria",

    items: [
      {
        id: "pi-1",
        productId: "prd-001",
        productName: "iPhone 15 Pro",
        sku: "IPH15-PRO-256",

        quantity: 10,
        unitCost: 1080000,
        subtotal: 10800000,
      },
    ],

    total: 10800000,

    status: "received",

    createdBy: "Daniel Adeyemi",

    createdAt: "2026-09-05T11:00:00",

    receivedAt: "2026-09-05T14:00:00",
  },
];

export const suppliers = [
  {
    id: "sup-001",
    name: "Tech Distribution Nigeria",
  },
  {
    id: "sup-002",
    name: "MobileHub Wholesale",
  },
  {
    id: "sup-003",
    name: "Prime Accessories Ltd",
  },
];