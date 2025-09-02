import api from "@/lib/axiosInstance";
import { Product } from "@/types/table";

export const productService = {
    getAll: async (): Promise<Product[]> => {
        const res = await api.get("/products");
        return res.data;
    },

    create: async (data: Omit<Product, "id">): Promise<Product> => {
        const res = await api.post("/products", data);
        return res.data;
    },

    delete: async (id: string): Promise<void> => {
        await api.delete(`/products/${id}`);
    },
};
