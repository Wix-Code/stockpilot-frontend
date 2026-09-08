import { InventoryItem } from "./InventoryTypes";

export const inventoryItems: InventoryItem[] = [
  {
    id: "prd-001",
    name: "iPhone 15 Pro",
    sku: "IPH15-PRO-256",
    category: "Mobile Phones",
    brand: "Apple",
    unit: "Piece",

    stockQty: 18,
    reorderLevel: 5,

    costPrice: 1080000,
    sellingPrice: 1250000,

    movements: [
      {
        id: "mv-001",
        productId: "prd-001",
        type: "opening_stock",
        quantity: 10,
        previousQty: 0,
        newQty: 10,
        reason: "Opening inventory",
        actor: "Daniel Adeyemi",
        createdAt: "2026-09-01T09:00:00",
      },

      {
        id: "mv-002",
        productId: "prd-001",
        type: "purchase",
        quantity: 10,
        previousQty: 10,
        newQty: 20,
        reference: "PO-0018",
        actor: "Michael James",
        createdAt: "2026-09-05T12:30:00",
      },

      {
        id: "mv-003",
        productId: "prd-001",
        type: "sale",
        quantity: -2,
        previousQty: 20,
        newQty: 18,
        reference: "SL-1298",
        actor: "Grace Bello",
        createdAt: "2026-09-07T10:15:00",
      },
    ],
  },

  {
    id: "prd-002",
    name: "AirPods Pro 2",
    sku: "APP-PRO-002",
    category: "Audio",
    brand: "Apple",
    unit: "Piece",

    stockQty: 2,
    reorderLevel: 5,

    costPrice: 155000,
    sellingPrice: 185000,

    movements: [],
  },

  {
    id: "prd-003",
    name: "Samsung Galaxy A55",
    sku: "SAM-A55-128",
    category: "Mobile Phones",
    brand: "Samsung",
    unit: "Piece",

    stockQty: 0,
    reorderLevel: 4,

    costPrice: 455000,
    sellingPrice: 520000,

    movements: [],
  },

  {
    id: "prd-004",
    name: "20W USB-C Charger",
    sku: "CHR-20W-USB",
    category: "Accessories",
    brand: "Generic",
    unit: "Piece",

    stockQty: 34,
    reorderLevel: 10,

    costPrice: 8500,
    sellingPrice: 12500,

    movements: [],
  },

  {
    id: "prd-005",
    name: "Tecno Camon 30",
    sku: "TEC-CAM30",
    category: "Mobile Phones",
    brand: "Tecno",
    unit: "Piece",

    stockQty: 3,
    reorderLevel: 8,

    costPrice: 235000,
    sellingPrice: 270000,

    movements: [],
  },
];
