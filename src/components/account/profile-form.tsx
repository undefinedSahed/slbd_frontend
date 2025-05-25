"use client"

import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import { Camera, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { useSession } from "next-auth/react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

const profileFormSchema = z.object({
    fullname: z.string().min(2, {
        message: "Full name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    mobile: z.string().regex(/^(\+8801|01)[3-9]\d{8}$/, { message: "Please enter a valid Bangladeshi phone number" }),
    city: z.string().min(2, {
        message: "City must be at least 2 characters.",
    }),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export const fetchUserProfile = async (token: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/profile`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if (!res.ok) {
        throw new Error("Failed to fetch user profile")
    }

    const data = await res.json()
    return data
}

export function ProfileForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [profileImage, setProfileImage] = useState<string | null>(null)
    const queryClient = useQueryClient()
    const [cities, setCities] = useState<string[]>([])
    const session = useSession()
    const token = session?.data?.user?.accessToken

    const { data: userProfile, isLoading, error } = useQuery({
        queryKey: ["userProfile"],
        queryFn: () => fetchUserProfile(String(token)),
        select: (userdata) => userdata.data,
        enabled: !!token,
    })

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            fullname: "",
            email: "",
            mobile: "",
            city: "",
        },
    })

    useEffect(() => {
        if (userProfile) {
            form.reset({
                fullname: userProfile.fullname,
                email: userProfile.email,
                mobile: userProfile.mobile,
                city: userProfile.city,
            })
        }
    }, [userProfile, form])

    // Get cities of BD
    useEffect(() => {
        const fetchCities = async () => {
            const res = await fetch("https://countriesnow.space/api/v0.1/countries/cities", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ country: "Bangladesh" })
            });
            const data = await res.json();
            return setCities(data?.data)
        }

        fetchCities()
    }, [])

    function onSubmit(values: ProfileFormValues) {
        setIsSubmitting(true)

        const formData = new FormData()
        formData.append("fullname", values.fullname)
        formData.append("mobile", values.mobile)
        formData.append("city", values.city)

        const fileInput = document.getElementById("picture") as HTMLInputElement | null
        const file = fileInput?.files?.[0]

        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                toast.error("File size must be less than 10 MB")
                setIsSubmitting(false)
                return // stop submission
            }
            formData.append("avatar", file)
        }

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/profile/update`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        })
            .then(async (res) => {
                if (!res.ok) {
                    const error = await res.json()
                    toast.error(error?.message || "Profile update failed")
                    throw new Error(error?.message)
                }
                toast.success("Profile updated successfully")
                queryClient.invalidateQueries({ queryKey: ["userProfile"] })
            })
            .catch((error) => {
                toast.error(error.message)
            })
            .finally(() => {
                setIsSubmitting(false)
            })
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

    if (error) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <h2>Error fetching user profile</h2>
            </div>
        )
    }


    return (
        <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-1 border-primary shadow-[0px_4px_48px_-11px_rgba(34,_197,_94,_0.5)]">
                    <CardContent className="flex items-center justify-center h-full">
                        <div className="flex flex-col items-center space-y-4">
                            <Avatar className="h-32 w-32 border border-primary">
                                <AvatarImage src={profileImage || userProfile?.avatar} className="object-cover h-full w-full" />
                                <AvatarFallback className="bg-green-100 text-green-600 text-xl">
                                    {(userProfile?.fullname ?? "User")
                                        .split(" ")
                                        .map((n: string) => n[0])
                                        .join("")
                                        .toUpperCase()}
                                </AvatarFallback>
                            </Avatar>

                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <label htmlFor="picture" className="cursor-pointer">
                                    <div className="flex items-center gap-2 rounded-md justify-center bg-green-50 px-4 py-2 text-green-600 hover:bg-green-100 dark:bg-green-950 dark:hover:bg-green-900">
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

                <Card className="border-1 border-primary shadow-[0px_4px_48px_-11px_rgba(34,_197,_94,_0.5)]">
                    <CardContent className="pt-6">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="fullname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="John Doe" {...field} />
                                            </FormControl>
                                            <FormMessage className="text-red-500" />
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
                                            <FormMessage className="text-red-500" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="mobile"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Mobile Number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="1234567890" {...field} />
                                            </FormControl>
                                            <FormMessage className="text-red-500" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem className="col-span-2 md:col-span-1">
                                            <FormLabel>City</FormLabel>
                                            <Select
                                                onValueChange={(value) => {
                                                    field.onChange(value)
                                                    form.trigger("city")
                                                }}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="bg-white">
                                                        <SelectValue placeholder="Dhaka" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="bg-white">
                                                    {
                                                        cities.map((city: string, index: number) => (
                                                            <SelectItem key={index} value={city}>{city}</SelectItem>
                                                        ))
                                                    }
                                                </SelectContent>
                                            </Select>
                                            <FormMessage className="text-red-500" />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    className="bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                                    disabled={isSubmitting}
                                >
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
