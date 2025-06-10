"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Trash2, Eye, Search, FileText } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"
import { BlogDialog } from "@/components/dashboard/blog-dialog"
import { DeleteDialog } from "@/components/dashboard/delete-dialog"
import { useSession } from "next-auth/react"

interface Blog {
    _id: string
    title: string
    description: string
    main_content: string
    image: string
    createdAt: string
    updatedAt: string
}

export default function BlogsPage() {
    const [blogs, setBlogs] = useState<Blog[]>([])
    const [loading, setLoading] = useState(true)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")

    const session = useSession()
    const token = session?.data?.user?.accessToken

    const fetchBlogs = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/blogs`)
            const data = await response.json()

            if (data.success) {
                setBlogs(data.data)
                toast.success(data.message)
            } else {
                toast.error(data.message || "Failed to fetch blogs")
            }
            // eslint-disable-next-line
        } catch (error: any) {
            toast.error(`Error: ${error.message}`)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBlogs()
    }, [])

    const handleAddBlog = () => {
        setSelectedBlog(null)
        setIsEditing(false)
        setDialogOpen(true)
    }

    const handleEditBlog = (blog: Blog) => {
        setSelectedBlog(blog)
        setIsEditing(true)
        setDialogOpen(true)
    }

    const handleDeleteBlog = (blog: Blog) => {
        setSelectedBlog(blog)
        setDeleteDialogOpen(true)
    }

    const confirmDelete = async () => {
        if (!selectedBlog) return

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/blogs/delete/${selectedBlog._id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            const data = await response.json()

            if (response.ok && data.success) {
                await fetchBlogs()
                toast.success(data.message || "Blog deleted successfully")
                setDeleteDialogOpen(false)
                setSelectedBlog(null)
            } else {
                toast.error(data.message || "Failed to delete blog")
            }
            // eslint-disable-next-line
        } catch (error: any) {
            toast.error(`Error: ${error.message}`)
        }
    }

    const filteredBlogs = blogs.filter(
        (blog) =>
            blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )

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
                    <h1 className="text-3xl font-bold text-green-700">Blogs</h1>
                    <p className="text-muted-foreground">Manage your blog posts and articles</p>
                </div>
                <Button onClick={handleAddBlog} className="bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Blog Post
                </Button>
            </div>

            <div className="mb-6">
                <div className="relative max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                        placeholder="Search blogs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 focus:ring-green-500 focus:border-green-500"
                    />
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredBlogs.map((blog) => (
                    <Card key={blog._id} className="overflow-hidden border-green-200">
                        <div className="relative h-48">
                            <Image src={blog.image || "/placeholder.svg"} alt={blog.title} fill className="object-cover" />
                        </div>
                        <CardContent className="p-4">
                            <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-green-700">{blog.title}</h3>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{blog.description}</p>
                            <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                                <span>{new Date(blog.updatedAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="flex-1 border-green-200 hover:bg-green-50">
                                    <Eye className="h-4 w-4 mr-1" />
                                    View
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleEditBlog(blog)}
                                    className="border-green-200 hover:bg-green-50"
                                >
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleDeleteBlog(blog)}
                                    className="border-red-200 hover:bg-red-50"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {filteredBlogs.length === 0 && (
                <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No blog posts found</h3>
                    <p className="text-muted-foreground">
                        {searchTerm ? `No blog posts match "${searchTerm}".` : "Start by creating your first blog post."}
                    </p>
                </div>
            )}

            <BlogDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                blog={selectedBlog}
                isEditing={isEditing}
                onSuccess={fetchBlogs}
            />

            <DeleteDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                title="Delete Blog Post"
                description={`Are you sure you want to delete "${selectedBlog?.title}"? This action cannot be undone.`}
                onConfirm={confirmDelete}
            />
        </div>
    )
}
