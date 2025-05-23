"use client"

import { useState } from "react"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card"
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Eye, Loader2, Package } from "lucide-react"
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
                return "bg-green-100 text-green-600 dark:bg-green-950"
            case "shipped":
                return "bg-blue-100 text-blue-600 dark:bg-blue-950"
            case "processing":
                return "bg-amber-100 text-amber-600 dark:bg-amber-950"
            case "cancelled":
                return "bg-red-100 text-red-600 dark:bg-red-950"
            case "pending":
                return "bg-yellow-100 text-yellow-600 dark:bg-yellow-950"
            default:
                return "bg-gray-100 text-gray-600 dark:bg-gray-800"
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
        <Card>
            <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>You have placed {orders?.length} orders</CardDescription>
            </CardHeader>

            <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <Input
                        placeholder="Search orders..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full"
                    />
                    <Select value={filter} onValueChange={setFilter}>
                        <SelectTrigger className="w-full sm:w-[200px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {filteredOrders && filteredOrders.length > 0 ? (
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Order #</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Total</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredOrders.map((order) => (
                                    <TableRow key={order._id}>
                                        <TableCell className="whitespace-nowrap font-medium">{order._id}</TableCell>
                                        <TableCell className="whitespace-nowrap">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={`${getStatusColor(order.orderStatus)} whitespace-nowrap`}>
                                                {order.orderStatus}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right whitespace-nowrap">
                                            ${order.totalPayable.toFixed(2)}
                                        </TableCell>
                                        <TableCell className="text-right whitespace-nowrap">
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
                ) : (
                    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                        <Package className="h-10 w-10 text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-semibold">No orders found</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            {search || filter !== "all"
                                ? "Try adjusting your search or filter."
                                : "When you place orders, they will appear here."}
                        </p>
                    </div>
                )}
            </CardContent>

            {filteredOrders && filteredOrders.length > 0 && (
                <CardFooter>
                    <div className="text-sm text-muted-foreground">
                        Showing {filteredOrders.length} of {orders?.length} orders
                    </div>
                </CardFooter>
            )}
        </Card>
    )
}
