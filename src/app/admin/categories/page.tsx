"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Eye } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"
import { CategoryDialog } from "@/components/dashboard/category-dialog"
import { DeleteDialog } from "@/components/dashboard/delete-dialog"
import { useSession } from "next-auth/react"

interface Category {
    _id: string
    title: string
    description: string
    image: string
    products: string[]
    isActive: boolean
    createdAt: string
    updatedAt: string
}

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
    const [isEditing, setIsEditing] = useState(false)

    
        const session = useSession()
        const token = session?.data?.user?.accessToken

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/categories`)
            const data = await response.json()

            if (data.success) {
                setCategories(data.data)
                toast.success(data.message || "Categories fetched successfully")
            } else {
                toast.error(data.message || "Failed to fetch categories")
            }
            // eslint-disable-next-line
        } catch (error: any) {
            toast.error(`Error: ${error.message}`)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    const handleAddCategory = () => {
        setSelectedCategory(null)
        setIsEditing(false)
        setDialogOpen(true)
    }

    const handleEditCategory = (category: Category) => {
        setSelectedCategory(category)
        setIsEditing(true)
        setDialogOpen(true)
    }

    const handleDeleteCategory = (category: Category) => {
        setSelectedCategory(category)
        setDeleteDialogOpen(true)
    }

    const confirmDelete = async () => {
        if (!selectedCategory) return

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/categories/delete/${selectedCategory._id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            const data = await response.json()

            if (response.ok && data.success) {
                await fetchCategories()
                toast.success(data.message || "Category deleted successfully")
                setDeleteDialogOpen(false)
                setSelectedCategory(null)
            } else {
                toast.error(data.message || "Failed to delete category")
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
                    <h1 className="text-3xl font-bold text-green-700">Categories</h1>
                    <p className="text-muted-foreground">Manage your product categories</p>
                </div>
                <Button onClick={handleAddCategory} className="bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Category
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {categories.map((category) => (
                    <Card key={category._id} className="overflow-hidden border-green-200">
                        <div className="relative h-48">
                            <Image src={category.image || "/placeholder.svg"} alt={category.title} fill className="object-cover" />
                            <div className="absolute top-2 right-2">
                                <Badge
                                    variant={category.isActive ? "default" : "secondary"}
                                    className={category.isActive ? "bg-green-600" : ""}
                                >
                                    {category.isActive ? "Active" : "Inactive"}
                                </Badge>
                            </div>
                        </div>
                        <CardContent className="p-4">
                            <h3 className="font-semibold text-lg mb-2 text-green-700">{category.title}</h3>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{category.description}</p>
                            <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                                <span>{category.products.length} products</span>
                                <span>{new Date(category.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="flex-1 border-green-200 hover:bg-green-50">
                                    <Eye className="h-4 w-4 mr-1" />
                                    View
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleEditCategory(category)}
                                    className="border-green-200 hover:bg-green-50"
                                >
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleDeleteCategory(category)}
                                    className="border-red-200 hover:bg-red-50"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <CategoryDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                category={selectedCategory}
                isEditing={isEditing}
                onSuccess={fetchCategories}
            />

            <DeleteDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                title="Delete Category"
                description={`Are you sure you want to delete "${selectedCategory?.title}"? This action cannot be undone.`}
                onConfirm={confirmDelete}
            />
        </div>
    )
}
