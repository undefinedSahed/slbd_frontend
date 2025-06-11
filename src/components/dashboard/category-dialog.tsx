"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { useSession } from "next-auth/react"

interface Category {
    _id: string
    title: string
    description: string
    image: string
    isActive: boolean
}

interface CategoryDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    category: Category | null
    isEditing: boolean
    onSuccess: () => void
}

export function CategoryDialog({ open, onOpenChange, category, isEditing, onSuccess }: CategoryDialogProps) {

    const session = useSession()
    const token = session?.data?.user?.accessToken


    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: null as File | null,
        isActive: true,
    })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (isEditing && category) {
            setFormData({
                title: category.title,
                description: category.description,
                image: null,
                isActive: category.isActive,
            })
        } else {
            setFormData({
                title: "",
                description: "",
                image: null,
                isActive: true,
            })
        }
    }, [isEditing, category, open])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const formDataToSend = new FormData()
            formDataToSend.append("title", formData.title)
            formDataToSend.append("description", formData.description)

            if (formData.image) {
                formDataToSend.append("image", formData.image)
            }

            const url = isEditing
                ? `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/categories/edit/${category?._id}`
                : `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/categories/createcategory`

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
                toast.success(data.message || `Category ${isEditing ? "updated" : "created"} successfully`)
                onSuccess()
                onOpenChange(false)
            } else {
                toast.error(data.message || `Failed to ${isEditing ? "update" : "create"} category`)
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
            <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                    <DialogTitle className="text-green-700">{isEditing ? "Edit Category" : "Add New Category"}</DialogTitle>
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
                            required
                            className="focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="image">Image</Label>
                        <Input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
                            required={!isEditing}
                            className="focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <Switch
                            id="isActive"
                            checked={formData.isActive}
                            onCheckedChange={(checked: boolean) => setFormData({ ...formData, isActive: checked })}
                        />
                        <Label htmlFor="isActive">Active</Label>
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
