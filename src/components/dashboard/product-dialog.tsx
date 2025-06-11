"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { useSession } from "next-auth/react"

interface Product {
    _id: string
    title: string
    description: string
    price: number
    category: {
        _id: string
        title: string
    }
    stock: string
    sold: number
    featured: boolean
    discount: number
    // eslint-disable-next-line
    specs: any
}

interface Category {
    _id: string
    title: string
}

interface ProductDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    product: Product | null
    isEditing: boolean
    onSuccess: () => void
}

export function ProductDialog({ open, onOpenChange, product, isEditing, onSuccess }: ProductDialogProps) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: 0,
        category: "",
        stock: "in stock",
        sold: 0,
        featured: false,
        discount: 0,
        thumbnail: null as File | null,
        images: [] as File[],
        specs: "",
    })
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(false)


    const session = useSession()
    const token = session?.data?.user?.accessToken

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/categories`)
                const data = await response.json()
                if (data.success) {
                    setCategories(data.data)
                }
            } catch (error) {
                console.error("Failed to fetch categories:", error)
            }
        }

        if (open) {
            fetchCategories()
        }
    }, [open])

    useEffect(() => {
        if (isEditing && product) {
            setFormData({
                title: product.title,
                description: product.description,
                price: product.price,
                category: product.category._id,
                stock: product.stock || "in stock",
                sold: product.sold,
                featured: product.featured,
                discount: product.discount,
                thumbnail: null,
                images: [],
                specs: JSON.stringify(product.specs, null, 2),
            })
        } else {
            setFormData({
                title: "",
                description: "",
                price: 0,
                category: "",
                stock: "in stock",
                sold: 0,
                featured: false,
                discount: 0,
                thumbnail: null,
                images: [],
                specs: "",
            })
        }
    }, [isEditing, product, open])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const formDataToSend = new FormData()
            formDataToSend.append("title", formData.title)
            formDataToSend.append("description", formData.description)
            formDataToSend.append("price", formData.price.toString())
            formDataToSend.append("category", formData.category)
            formDataToSend.append("stock", formData.stock.toString())
            formDataToSend.append("discount", formData.discount.toString())
            formDataToSend.append("sold", formData.sold.toString())
            formDataToSend.append("featured", formData.featured.toString())
            formDataToSend.append("specs", formData.specs)

            if (formData.thumbnail) {
                formDataToSend.append("thumbnail", formData.thumbnail)
            }

            formData.images.forEach((image) => {
                formDataToSend.append("images", image)
            })

            const url = isEditing
                ? `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products/edit/${product?._id}`
                : `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products/createproduct`

            const method = isEditing ? "PUT" : "POST"

            const response = await fetch(url, {
                method,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formDataToSend,
            })

            const data = await response.json()

            if (response.ok && data.success) {
                toast.success(data.message || `Product ${isEditing ? "updated" : "created"} successfully`)
                onSuccess()
                onOpenChange(false)
            } else {
                toast.error(data.message || `Failed to ${isEditing ? "update" : "create"} product`)
            }
            // eslint-disable-next-line
        } catch (error: any) {
            toast.error(`Error: ${error.message}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto bg-white">
                <DialogHeader>
                    <DialogTitle className="text-green-700">{isEditing ? "Edit Product" : "Add New Product"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                                className="focus:ring-green-500 focus:border-green-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="price">Price</Label>
                            <Input
                                id="price"
                                type="number"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: Number.parseFloat(e.target.value) })}
                                required
                                className="focus:ring-green-500 focus:border-green-500"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                            className="focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Select
                                value={formData.category}
                                onValueChange={(value) => setFormData({ ...formData, category: value })}
                            >
                                <SelectTrigger className="focus:ring-green-500 focus:border-green-500">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    {categories.map((category) => (
                                        <SelectItem key={category._id} value={category._id}>
                                            {category.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="stock">Stock</Label>
                            <Select
                                value={formData.stock}
                                onValueChange={(value) => setFormData({ ...formData, stock: value })}
                            >
                                <SelectTrigger className="focus:ring-green-500 focus:border-green-500">
                                    <SelectValue placeholder="Select stock status" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    <SelectItem value="in stock">In Stock</SelectItem>
                                    <SelectItem value="out of stock">Out of Stock</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="sold">Sold</Label>
                            <Input
                                id="sold"
                                type="number"
                                value={formData.sold}
                                onChange={(e) => setFormData({ ...formData, sold: Number.parseInt(e.target.value) })}
                                className="focus:ring-green-500 focus:border-green-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="discount">Discount (%)</Label>
                            <Input
                                id="discount"
                                type="number"
                                value={formData.discount}
                                onChange={(e) => setFormData({ ...formData, discount: Number.parseInt(e.target.value) })}
                                className="focus:ring-green-500 focus:border-green-500"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="thumbnail">Thumbnail</Label>
                        <Input
                            id="thumbnail"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setFormData({ ...formData, thumbnail: e.target.files?.[0] || null })}
                            required={!isEditing}
                            className="focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="images">Images</Label>
                        <Input
                            id="images"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => setFormData({ ...formData, images: Array.from(e.target.files || []) })}
                            className="focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="specs">Specifications (JSON)</Label>
                        <Textarea
                            id="specs"
                            value={formData.specs}
                            onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
                            placeholder='{"key": "value"}'
                            rows={4}
                            className="focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <Switch
                            id="featured"
                            checked={formData.featured}
                            onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                        />
                        <Label htmlFor="featured">Featured Product</Label>
                    </div>

                    <div className="flex justify-end space-x-2">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700">
                            {loading ? "Saving..." : isEditing ? "Update" : "Create"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
