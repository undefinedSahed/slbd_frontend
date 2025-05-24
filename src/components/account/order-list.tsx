"use client"

import { useState } from "react"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Eye, Loader2, Package, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useSession } from "next-auth/react"

export interface Order {
    _id: string
    shippingInfo: {
        address: string
        city: string
        country: string
        phoneNo: string
        postalCode: string
        state: string
    }
    user: string
    orderItems: {
        _id: string
        product: string
        name: string
        price: number
        quantity: number
        image: string
    }[]
    paymentMethod: string
    paymentInfo: {
        id: string
        status: string
    }
    paidAt: string
    itemsPrice: number
    shippingPrice: number
    taxPrice: number
    totalPrice: number
    orderStatus: string
    deliveredAt?: string
    createdAt: string
    updatedAt: string
    totalPayable: number
}

export function OrdersList() {
    const [filter, setFilter] = useState("all")
    const [search, setSearch] = useState("")

    const session = useSession()
    const token = session?.data?.user?.accessToken

    const fetchOrders = async (): Promise<Order[]> => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/orders/user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })

        const data = await res.json()
        return data.data.orders
    }

    const { data: orders, isLoading } = useQuery({
        queryKey: ["orders"],
        queryFn: fetchOrders,
        enabled: !!token,
    })

    const filteredOrders = orders?.filter((order) => {
        const matchesFilter = filter === "all" || order.orderStatus.toLowerCase() === filter.toLowerCase()
        const matchesSearch =
            order._id.includes(search) ||
            order.createdAt.includes(search) ||
            order.orderStatus.toLowerCase().includes(search.toLowerCase())
        return matchesFilter && matchesSearch
    })

    const getStatusColor = (orderStatus: string) => {
        switch (orderStatus.toLowerCase()) {
            case "delivered":
                return "bg-green-100 text-green-600 hover:bg-green-100 dark:bg-green-950"
            case "shipped":
                return "bg-blue-100 text-blue-600 hover:bg-blue-100 dark:bg-blue-950"
            case "processing":
                return "bg-amber-100 text-amber-600 hover:bg-amber-100 dark:bg-amber-950"
            case "cancelled":
                return "bg-red-100 text-red-600 hover:bg-red-100 dark:bg-red-950"
            case "pending":
                return "bg-yellow-100 text-yellow-600 hover:bg-yellow-100 dark:bg-yellow-950"
            default:
                return "bg-gray-100 text-gray-600 hover:bg-gray-100 dark:bg-gray-800"
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
        <div className="w-full">
            <Card>
                <CardHeader className="pb-4">
                    <CardTitle className="text-xl sm:text-2xl">Order History</CardTitle>
                    <CardDescription>You have placed {orders?.length || 0} orders</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    {/* Search and Filter Controls */}
                    <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search orders..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Select value={filter} onValueChange={setFilter}>
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Orders</SelectItem>
                                <SelectItem value="delivered">Delivered</SelectItem>
                                <SelectItem value="shipped">Shipped</SelectItem>
                                <SelectItem value="processing">Processing</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {filteredOrders && filteredOrders.length > 0 ? (
                        <>
                            {/* Desktop Table View */}
                            <div className="hidden md:block overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="min-w-[120px]">Order #</TableHead>
                                            <TableHead className="min-w-[100px]">Date</TableHead>
                                            <TableHead className="min-w-[100px]">Status</TableHead>
                                            <TableHead className="text-right min-w-[80px]">Total</TableHead>
                                            <TableHead className="text-right min-w-[80px]">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredOrders.map((order) => (
                                            <TableRow key={order._id}>
                                                <TableCell className="font-medium">
                                                    <span className="text-sm">#{order._id.slice(-8)}</span>
                                                </TableCell>
                                                <TableCell>
                                                    <span className="text-sm">{new Date(order.createdAt).toLocaleDateString()}</span>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline" className={getStatusColor(order.orderStatus)}>
                                                        {order.orderStatus}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right font-medium">${order.totalPayable.toFixed(2)}</TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-950"
                                                        asChild
                                                    >
                                                        <Link href={`/account/orders/${order._id}`}>
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            View
                                                        </Link>
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Mobile Card View */}
                            <div className="md:hidden space-y-4">
                                {filteredOrders.map((order) => (
                                    <Card key={order._id} className="p-4">
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-medium">Order #{order._id.slice(-8)}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {new Date(order.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <Badge variant="outline" className={getStatusColor(order.orderStatus)}>
                                                    {order.orderStatus}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-lg font-semibold">${order.totalPayable.toFixed(2)}</span>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-950"
                                                    asChild
                                                >
                                                    <Link href={`/account/orders/${order._id}`}>
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        View Details
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center min-h-[300px]">
                            <Package className="h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No orders found</h3>
                            <p className="text-sm text-muted-foreground max-w-sm">
                                {search || filter !== "all"
                                    ? "Try adjusting your search or filter to find what you're looking for."
                                    : "When you place orders, they will appear here."}
                            </p>
                        </div>
                    )}
                </CardContent>

                {filteredOrders && filteredOrders.length > 0 && (
                    <CardFooter className="pt-4 border-t">
                        <div className="text-sm text-muted-foreground">
                            Showing {filteredOrders.length} of {orders?.length || 0} orders
                        </div>
                    </CardFooter>
                )}
            </Card>
        </div>
    )
}
