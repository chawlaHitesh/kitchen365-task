"use client"

import { useEffect, useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { productService } from "@/services/productService"

type Product = {
    id: string
    name: string
    price: number
    description?: string
}

export default function ProductList({ refresh }: { refresh: number }) {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        async function loadProducts() {
            try {
                setLoading(true)
                const data = await productService.getAll()
                setProducts(data)
            } catch (err) {
                setError("Failed to load products")
            } finally {
                setLoading(false)
            }
        }
        loadProducts()
    }, [refresh])

    const handleDelete = async (id: string) => {
        try {
            await productService.delete(id)
            setProducts((prev) => prev.filter((p) => p.id !== id))
        } catch (err) {
            console.error("Delete failed", err)
        }
    }

    if (loading) return <p>Loading products...</p>
    if (error) return <p className="text-red-500">{error}</p>

    return (
        <div className="grid gap-4 mt-6">
            {products.length === 0 ? (
                <p>No products available</p>
            ) : (
                products.map((product) => (
                    <Card key={product.id} className="shadow-sm">
                        <CardHeader className="flex flex-row justify-between items-center">
                            <CardTitle>{product.name}</CardTitle>
                            <Button variant="destructive" size="sm" onClick={() => handleDelete(product.id)}>
                                Delete
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-700">Price: ${product.price}</p>
                            {product.description && <p className="text-gray-500">{product.description}</p>}
                        </CardContent>
                    </Card>
                ))
            )}
        </div>
    )
}
