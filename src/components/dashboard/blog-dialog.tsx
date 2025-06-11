"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useSession } from "next-auth/react"

interface Blog {
    _id: string
    title: string
    description: string
    main_content: string
    image: string
}

interface BlogDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    blog: Blog | null
    isEditing: boolean
    onSuccess: () => void
}

export function BlogDialog({ open, onOpenChange, blog, isEditing, onSuccess }: BlogDialogProps) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        main_content: "",
        image: null as File | null,
    })
    const [loading, setLoading] = useState(false)

    
    const session = useSession()
    const token = session?.data?.user?.accessToken

    useEffect(() => {
        if (isEditing && blog) {
            setFormData({
                title: blog.title,
                description: blog.description,
                main_content: blog.main_content,
                image: null,
            })
        } else {
            setFormData({
                title: "",
                description: "",
                main_content: "",
                image: null,
            })
        }
    }, [isEditing, blog, open])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const formDataToSend = new FormData()
            formDataToSend.append("title", formData.title)
            formDataToSend.append("description", formData.description)
            formDataToSend.append("main_content", formData.main_content)

            if (formData.image) {
                formDataToSend.append("image", formData.image)
            }

            const url = isEditing
                ? `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/blogs/update/${blog?._id}`
                : `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/blogs/create`

            const method = isEditing ? "PUT" : "POST"

            const response = await fetch(url, {
                method,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formDataToSend,
            })

            const data = await response.json()

            if (response.ok && data.success) {
                toast.success(data.message || `Blog ${isEditing ? "updated" : "created"} successfully`)
                onSuccess()
                onOpenChange(false)
            } else {
                toast.error(data.message || `Failed to ${isEditing ? "update" : "create"} blog`)
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                    <DialogTitle className="text-green-700">{isEditing ? "Edit Blog Post" : "Add New Blog Post"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Brief description of the blog post"
                            required
                            className="focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="main_content">Content</Label>
                        <Textarea
                            id="main_content"
                            value={formData.main_content}
                            onChange={(e) => setFormData({ ...formData, main_content: e.target.value })}
                            placeholder="Write your blog post content here..."
                            rows={8}
                            required
                            className="focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="image">Featured Image</Label>
                        <Input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
                            required={!isEditing}
                            className="focus:ring-green-500 focus:border-green-500"
                        />
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
