"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Package, ShoppingCart } from "lucide-react"
import { toast } from "sonner"
import { useSession } from "next-auth/react"

interface AdminStats {
    totalUsers: number
    totalProducts: number
    totalOrders: number
    totalAmountofOrders: number
}

export default function DashboardPage() {
    const [stats, setStats] = useState<AdminStats | null>(null)
    const [loading, setLoading] = useState(true)
    const session = useSession()
    const token = session?.data?.user?.accessToken

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/admin/stats`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                const data = await response.json()

                if (data.success) {
                    setStats(data.data)
                    toast.success(data.message)
                } else {
                    toast.error(data.message || "Failed to fetch stats")
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                toast.error("Error", error.message || "Failed to fetch stats")
            } finally {
                setLoading(false)
            }
        }

        fetchStats()
    }, [token])

    if (loading) {
        return (
            <div className="p-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {[...Array(4)].map((_, i) => (
                        <Card key={i}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <div className="h-4 w-20 bg-muted animate-pulse rounded" />
                                <div className="h-4 w-4 bg-muted animate-pulse rounded" />
                            </CardHeader>
                            <CardContent>
                                <div className="h-8 w-16 bg-muted animate-pulse rounded mb-1" />
                                <div className="h-3 w-24 bg-muted animate-pulse rounded" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-green-700">Dashboard</h1>
                <p className="text-muted-foreground">Welcome to your admin dashboard</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-green-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-700">{stats?.totalUsers || 0}</div>
                        <p className="text-xs text-muted-foreground">Registered users</p>
                    </CardContent>
                </Card>

                <Card className="border-green-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                        <Package className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-700">{stats?.totalProducts || 0}</div>
                        <p className="text-xs text-muted-foreground">Products in catalog</p>
                    </CardContent>
                </Card>

                <Card className="border-green-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-700">{stats?.totalOrders || 0}</div>
                        <p className="text-xs text-muted-foreground">Orders placed</p>
                    </CardContent>
                </Card>

                <Card className="border-green-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <p className="h-4 w-4 text-green-600" >৳</p>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-700">৳{stats?.totalAmountofOrders || 0}</div>
                        <p className="text-xs text-muted-foreground">Total sales revenue</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
