"use client"

import ProductForm from "@/components/ProductForm";
import ProductList from "@/components/ProductList";
import { useState } from "react";

export default function Home() {
  const [refresh, setRefresh] = useState(0)

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Products</h1>
      <ProductForm onProductAdded={() => setRefresh((prev) => prev + 1)} />
      <ProductList refresh={refresh} />
    </div>
  )
}
