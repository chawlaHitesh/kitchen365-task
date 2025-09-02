"use client"

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { productService } from "@/services/productService"

const schema = yup.object().shape({
    name: yup.string().required("Product name is required"),
    price: yup.number().positive("Price must be a positive number").required("Price is required").typeError("Price is required"),
    description: yup.string().default(""),
})

type FormData = yup.InferType<typeof schema>

export default function ProductForm({ onProductAdded }: { onProductAdded: () => void }) {
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    })

    const onSubmit = async (data: FormData) => {
        try {
            setLoading(true)
            await productService.create(data)
            reset()
            onProductAdded()
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 border rounded-lg shadow-sm bg-white">
            <div>
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" placeholder="Enter product name" {...register("name")} />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div>
                <Label htmlFor="price">Price</Label>
                <Input id="price" type="number" placeholder="Enter price" {...register("price")} />
                {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
            </div>

            <div>
                <Label htmlFor="description">Description</Label>
                <Input id="description" placeholder="Enter description" {...register("description")} />
                {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>

            <Button type="submit" disabled={loading}>
                {loading ? "Adding..." : "Add Product"}
            </Button>
        </form>
    )
}
