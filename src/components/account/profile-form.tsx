"use client"

import type React from "react"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import { Camera, Loader2 } from "lucide-react"
import { format } from "date-fns"


const profileFormSchema = z.object({
    fullName: z.string().min(2, {
        message: "Full name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    phone: z.string().min(10, {
        message: "Phone number must be at least 10 digits.",
    }),
    city: z.string().min(2, {
        message: "City must be at least 2 characters.",
    }),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// Mock API call
const fetchUserProfile = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return {
        fullName: "John Doe",
        email: "john.doe@example.com",
        phone: "1234567890",
        city: "New York",
        profilePicture: "",
        createdAt: "2023-01-15T00:00:00.000Z",
    }
}

// Mock API call
// const updateUserProfile = async (data: ProfileFormValues) => {
//     // Simulate API call
//     await new Promise((resolve) => setTimeout(resolve, 1500))
//     console.log("Updating profile:", data)
//     return data
// }

export function ProfileForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [profileImage, setProfileImage] = useState<string | null>(null)

    const { data: userProfile, isLoading } = useQuery({
        queryKey: ["userProfile"],
        queryFn: fetchUserProfile,
    })

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            city: "",
        },
        values: userProfile
            ? {
                fullName: userProfile.fullName,
                email: userProfile.email,
                phone: userProfile.phone,
                city: userProfile.city,
            }
            : undefined,
    })

    function onSubmit(values: ProfileFormValues) {
        setIsSubmitting(true)

        // Simulate API call
        setTimeout(() => {
            console.log(values)
            setIsSubmitting(false)
            toast.success("Profile updated successfully")
        }, 2000)
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setProfileImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    if (isLoading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-green-600" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-center space-y-4">
                            <Avatar className="h-32 w-32">
                                <AvatarImage src={profileImage || userProfile?.profilePicture} />
                                <AvatarFallback className="bg-green-100 text-green-600 text-xl">
                                    {userProfile?.fullName
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </AvatarFallback>
                            </Avatar>

                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <label htmlFor="picture" className="cursor-pointer">
                                    <div className="flex items-center gap-2 rounded-md border border-green-600 bg-green-50 px-4 py-2 text-green-600 hover:bg-green-100 dark:bg-green-950 dark:hover:bg-green-900">
                                        <Camera className="h-4 w-4" />
                                        <span>Change Picture</span>
                                    </div>
                                </label>
                                <Input id="picture" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                            </div>

                            <div className="text-sm text-muted-foreground">
                                Profile created:{" "}
                                {userProfile?.createdAt ? format(new Date(userProfile.createdAt), "MMMM dd, yyyy") : "N/A"}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="John Doe" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="john.doe@example.com" {...field} disabled />
                                            </FormControl>
                                            <FormDescription>Email cannot be changed</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="1234567890" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>City</FormLabel>
                                            <FormControl>
                                                <Input placeholder="New York" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={isSubmitting}>
                                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Save Changes
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
