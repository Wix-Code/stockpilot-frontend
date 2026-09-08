import { Sale } from "./SalesType";

export const sales: Sale[] = [
  {
    id: "sale-001",
    reference: "SL-1298",

    customerName: "David Musa",

    items: [
      {
        id: "item-1",
        productId: "prd-001",
        productName: "iPhone 15 Pro",
        sku: "IPH15-PRO-256",
        quantity: 1,
        unitPrice: 1250000,
        subtotal: 1250000,
      },
    ],

    subtotal: 1250000,
    discount: 50000,
    total: 1200000,

    paymentStatus: "paid",
    status: "completed",

    createdBy: "Grace Bello",
    createdAt: "2026-09-08T09:30:00",
  },

  {
    id: "sale-002",
    reference: "SL-1297",

    customerName: "Walk-in Customer",

    items: [
      {
        id: "item-2",
        productId: "prd-004",
        productName: "20W USB-C Charger",
        sku: "CHR-20W-USB",
        quantity: 2,
        unitPrice: 12500,
        subtotal: 25000,
      },
    ],

    subtotal: 25000,
    discount: 0,
    total: 25000,

    paymentStatus: "paid",
    status: "completed",

    createdBy: "Grace Bello",
    createdAt: "2026-09-08T08:15:00",
  },
];
