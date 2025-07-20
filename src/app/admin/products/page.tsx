"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Trash2, Eye, Search } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"
import { ProductDialog } from "@/components/dashboard/product-dialog"
import { DeleteDialog } from "@/components/dashboard/delete-dialog"
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
    thumbnail: string
    images: string[]
    stock: string
    sold: number
    // eslint-disable-next-line
    specs: any
    featured: boolean
    discount: number
    rating: number
    createdAt: string
    topSold: boolean // Added to match expected Product type
}

interface ProductsResponse {
    results: number
    total: number
    page: number
    totalPages: number
    data: Product[]
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const session = useSession()
    const token = session?.data?.user?.accessToken

    const fetchProducts = async (page = 1, search = "") => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products?page=${page}&limit=10&search=${search}`)
            const data: { success: boolean; data: ProductsResponse; message: string } = await response.json()

            if (data.success) {
                setProducts(data.data.data)
                setTotalPages(data.data.totalPages)
                setCurrentPage(data.data.page)
            } else {
                toast.error(data.message || "Failed to fetch products")
            }
            // eslint-disable-next-line
        } catch (error: any) {
            toast.error(`Error: ${error.message}`)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts(currentPage, searchTerm)
    }, [currentPage, searchTerm])

    const handleAddProduct = () => {
        setSelectedProduct(null)
        setIsEditing(false)
        setDialogOpen(true)
    }

    const handleEditProduct = (product: Product) => {
        setSelectedProduct(product)
        setIsEditing(true)
        setDialogOpen(true)
    }

    const handleDeleteProduct = (product: Product) => {
        setSelectedProduct(product)
        setDeleteDialogOpen(true)
    }

    const confirmDelete = async () => {
        if (!selectedProduct) return

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products/delete/${selectedProduct._id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            const data = await response.json()

            if (response.ok && data.success) {
                await fetchProducts(currentPage, searchTerm)
                toast.success(data.message || "Product deleted successfully")
                setDeleteDialogOpen(false)
                setSelectedProduct(null)
            } else {
                toast.error(data.message || "Failed to delete product")
            }
            // eslint-disable-next-line
        } catch (error: any) {
            toast.error(`Error: ${error.message}`)
        }
    }

    if (loading) {
        return (
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <div className="h-8 w-32 bg-muted animate-pulse rounded" />
                    <div className="h-10 w-24 bg-muted animate-pulse rounded" />
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[...Array(6)].map((_, i) => (
                        <Card key={i}>
                            <div className="h-48 bg-muted animate-pulse" />
                            <CardContent className="p-4">
                                <div className="h-6 w-3/4 bg-muted animate-pulse rounded mb-2" />
                                <div className="h-4 w-full bg-muted animate-pulse rounded mb-2" />
                                <div className="h-4 w-1/2 bg-muted animate-pulse rounded" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-green-700">Products</h1>
                    <p className="text-muted-foreground">Manage your product catalog</p>
                </div>
                <Button onClick={handleAddProduct} className="bg-green-600 text-white hover:bg-green-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                </Button>
            </div>

            <div className="mb-6">
                <div className="relative max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 focus:ring-green-500 focus:border-green-500"
                    />
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                    <Card key={product._id} className="overflow-hidden border-green-200 pt-0 pb-2">
                        <div className="relative h-48">
                            <Image src={product.thumbnail || "/placeholder.svg"} alt={product.title} fill className="object-cover" />
                            <div className="absolute top-2 right-2 flex gap-1">
                                {product.featured && <Badge className="bg-green-600 text-white">Featured</Badge>}
                                {product.topSold && <Badge className="bg-green-600 text-white">Top Sold</Badge>}
                                {product.discount > 0 && <Badge variant="destructive" className="bg-primary">{product.discount}% OFF</Badge>}
                            </div>
                        </div>
                        <CardContent className="p-4 pt-0">
                            <h3 className="font-semibold text-lg mb-1 text-green-700">{product.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{product.category.title}</p>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-lg text-green-600">${product.price}</span>
                                    {product.discount > 0 && (
                                        <span className="text-sm text-muted-foreground line-through">
                                            ${Math.round(product.price / (1 - product.discount / 100))}
                                        </span>
                                    )}
                                </div>
                                <Badge
                                    variant={product.stock === "in stock" ? "default" : "secondary"}
                                    className={product.stock === "in stock" ? "bg-green-600 text-white" : ""}
                                >
                                    {product.stock}
                                </Badge>
                            </div>
                            <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                                <span>Sold: {product.sold}</span>
                                <span>Rating: {product.rating}/5</span>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="flex-1 border-green-200 hover:bg-green-50">
                                    <Eye className="h-4 w-4 mr-1" />
                                    View
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleEditProduct(product)}
                                    className="border-green-200 hover:bg-green-50"
                                >
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleDeleteProduct(product)}
                                    className="border-red-200 hover:bg-red-50"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center mt-6 gap-2">
                    <Button
                        variant="outline"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="border-green-200 hover:bg-green-50"
                    >
                        Previous
                    </Button>
                    <span className="flex items-center px-4">
                        Page {currentPage} of {totalPages}
                    </span>
                    <Button
                        variant="outline"
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="border-green-200 hover:bg-green-50"
                    >
                        Next
                    </Button>
                </div>
            )}

            <ProductDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                product={selectedProduct}
                isEditing={isEditing}
                onSuccess={() => fetchProducts(currentPage, searchTerm)}
            />

            <DeleteDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                title="Delete Product"
                description={`Are you sure you want to delete "${selectedProduct?.title}"? This action cannot be undone.`}
                onConfirm={confirmDelete}
            />
        </div>
    )
}
