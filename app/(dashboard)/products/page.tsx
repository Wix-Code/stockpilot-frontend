"use client";

import { useMemo, useState } from "react";

import { products as initialProducts } from "@/components/product/MockData";
import { Product } from "@/components/product/ProductTypes";
import { ProductHeader } from "@/components/product/ProductHeader";
import { ProductStats } from "@/components/product/ProductStats";
import { ProductToolbar } from "@/components/product/ProductToolbar";
import { ProductTable } from "@/components/product/ProductTable";
import { FormDialog } from "@/components/reuseable/FormDialog";
import { ProductForm } from "@/components/product/ProductForm";
import { DetailsSheet } from "@/components/reuseable/DetailsSheet";
import { ProductDetails } from "@/components/product/ProductDetailsSheet";


export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("all");

  const [stock, setStock] = useState("all");

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [detailsOpen, setDetailsOpen] = useState(false);

  const [formOpen, setFormOpen] = useState(false);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    return products.filter((product) => {
      if (product.status === "archived") {
        return false;
      }

      const matchesSearch =
        !searchTerm ||
        product.name.toLowerCase().includes(searchTerm) ||
        product.sku.toLowerCase().includes(searchTerm) ||
        product.brand?.toLowerCase().includes(searchTerm);

      const matchesCategory =
        category === "all" || product.category === category;

      let matchesStock = true;

      if (stock === "in_stock") {
        matchesStock = product.stockQty > product.reorderLevel;
      }

      if (stock === "low_stock") {
        matchesStock =
          product.stockQty > 0 && product.stockQty <= product.reorderLevel;
      }

      if (stock === "out_of_stock") {
        matchesStock = product.stockQty <= 0;
      }

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [products, search, category, stock]);

  const categories = useMemo(
    () =>
      Array.from(new Set(products.map((product) => product.category))).sort(),
    [products],
  );

  function openAddProduct() {
    setEditingProduct(null);
    setFormOpen(true);
  }

  function openProduct(product: Product) {
    setSelectedProduct(product);
    setDetailsOpen(true);
  }

  function editProduct(product: Product) {
    setDetailsOpen(false);
    setEditingProduct(product);
    setFormOpen(true);
  }

  function archiveProduct(product: Product) {
    setProducts((current) =>
      current.map((item) =>
        item.id === product.id
          ? {
              ...item,
              status: "archived",
            }
          : item,
      ),
    );

    setDetailsOpen(false);
  }

  function saveProduct(values: {
    name: string;
    sku: string;
    category: string;
    brand: string;
    unit: string;
    costPrice: string;
    sellingPrice: string;
    stockQty: string;
    reorderLevel: string;
    image: string;
  }) {
    if (editingProduct) {
      setProducts((current) =>
        current.map((product) =>
          product.id === editingProduct.id
            ? {
                ...product,
                name: values.name,
                sku: values.sku,
                category: values.category,
                brand: values.brand,
                unit: values.unit,
                costPrice: Number(values.costPrice),
                sellingPrice: Number(values.sellingPrice),
                reorderLevel: Number(values.reorderLevel),
                image: values.image || undefined,
                updatedAt: new Date().toISOString(),
              }
            : product,
        ),
      );
    } else {
      const newProduct: Product = {
        id: crypto.randomUUID(),

        name: values.name,
        sku: values.sku,

        category: values.category,

        brand: values.brand || undefined,

        unit: values.unit,

        costPrice: Number(values.costPrice),

        sellingPrice: Number(values.sellingPrice),

        stockQty: Number(values.stockQty || 0),

        reorderLevel: Number(values.reorderLevel || 0),

        image: values.image || undefined,

        status: "active",

        createdAt: new Date().toISOString(),

        updatedAt: new Date().toISOString(),

        movements:
          Number(values.stockQty) > 0
            ? [
                {
                  id: crypto.randomUUID(),
                  type: "opening_stock",
                  quantity: Number(values.stockQty),
                  reason: "Opening stock",
                  actor: "Daniel Adeyemi",
                  createdAt: new Date().toISOString(),
                },
              ]
            : [],
      };

      setProducts((current) => [newProduct, ...current]);
    }

    setFormOpen(false);
    setEditingProduct(null);
  }

  return (
    <>
      <ProductHeader onAddProduct={openAddProduct} />

      <ProductStats products={products} />

      <ProductToolbar
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        stock={stock}
        onStockChange={setStock}
        categories={categories}
      />

      <ProductTable
        products={filteredProducts}
        onView={openProduct}
        onEdit={editProduct}
        onArchive={archiveProduct}
      />

      {/* ADD / EDIT PRODUCT */}

      <FormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        title={editingProduct ? "Edit product" : "Add product"}
        description={
          editingProduct
            ? "Update product information and restocking settings."
            : "Create a new product and enter its opening inventory."
        }
        size="lg"
      >
        <ProductForm
          product={editingProduct}
          onSubmit={saveProduct}
          onCancel={() => {
            setFormOpen(false);
            setEditingProduct(null);
          }}
        />
      </FormDialog>

      {/* PRODUCT DETAILS */}

      <DetailsSheet
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        title="Product details"
        description="View pricing, stock information and recent movement activity."
        width={"lg"}
      >
        {selectedProduct && (
          <ProductDetails
            product={selectedProduct}
            onEdit={() => editProduct(selectedProduct)}
            onArchive={() => archiveProduct(selectedProduct)}
          />
        )}
      </DetailsSheet>
    </>
  );
}
