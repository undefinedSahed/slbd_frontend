"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Package } from "lucide-react"
import { toast } from "sonner"
import { OrderDetailsDialog } from "@/components/dashboard/order-details-dialog"
import { useSession } from "next-auth/react"

interface Order {
    _id: string
    user: {
        _id: string
        fullname: string
        email: string
    } | null
    items: Array<{
        product: {
            _id: string
            title: string
            price: number
        }
        quantity: number
        price: number
        _id: string
    }>
    shippingAddress: {
        name: string
        phone: string
        city: string
        address: string
    }
    totalAmount: number
    deliveryCharge: number
    totalPayable: number
    orderStatus: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled"
    paymentStatus: "Pending" | "Paid" | "Failed"
    createdAt: string
    updatedAt: string
}

const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800",
    Processing: "bg-blue-100 text-blue-800",
    Shipped: "bg-purple-100 text-purple-800",
    Delivered: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
}

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)
    const [statusFilter, setStatusFilter] = useState<string>("all")
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
    const [detailsDialogOpen, setDetailsDialogOpen] = useState(false)

    const session = useSession()
    const token = session?.data?.user?.accessToken

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/orders/all`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                const data = await response.json()

                if (data.success) {
                    setOrders(data.data)
                    toast.success(data.success)
                } else {
                    toast.error(data.message || "Failed to fetch orders")
                }
                // eslint-disable-next-line
            } catch (error: any) {
                toast.error(`Error: ${error.message}`)
            } finally {
                setLoading(false)
            }
        }

        fetchOrders()
    }, [token])

    const updateOrderStatus = async (orderId: string, newStatus: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/orders/update/${orderId}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ orderStatus: newStatus }),
            })

            const data = await response.json()

            if (response.ok && data.success) {
                setOrders((prev) =>
                    prev.map((order) =>
                        order._id === orderId ? { ...order, orderStatus: newStatus as Order["orderStatus"] } : order,
                    ),
                )
                toast.success(data.message || "Order status updated successfully")
            } else {
                toast.error(data.message || "Failed to update order status")
            }
            // eslint-disable-next-line
        } catch (error: any) {
            toast.error(`Error: ${error.message}`)
        }
    }

    const handleViewDetails = (order: Order) => {
        setSelectedOrder(order)
        setDetailsDialogOpen(true)
    }

    const filteredOrders = statusFilter === "all" ? orders : orders.filter((order) => order.orderStatus === statusFilter)

    if (loading) {
        return (
            <div className="p-6">
                <div className="mb-6">
                    <div className="h-8 w-32 bg-muted animate-pulse rounded mb-2" />
                    <div className="h-4 w-48 bg-muted animate-pulse rounded" />
                </div>
                <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <Card key={i}>
                            <CardContent className="p-6">
                                <div className="h-6 w-24 bg-muted animate-pulse rounded mb-4" />
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                                    <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                                    <div className="h-4 w-20 bg-muted animate-pulse rounded" />
                                    <div className="h-4 w-16 bg-muted animate-pulse rounded" />
                                </div>
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
                <h1 className="text-3xl font-bold text-green-700">Orders</h1>
                <p className="text-muted-foreground">Manage customer orders and track shipments</p>
            </div>

            <div className="mb-6">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48 focus:ring-green-500 focus:border-green-500">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Orders</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Processing">Processing</SelectItem>
                        <SelectItem value="Shipped">Shipped</SelectItem>
                        <SelectItem value="Delivered">Delivered</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-4">
                {filteredOrders.map((order) => {
                    // const StatusIcon = statusIcons[order.orderStatus]
                    return (
                        <Card key={order._id} className="border-green-200">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg text-green-700">Order #{order._id.slice(-8)}</CardTitle>
                                    <Badge className={statusColors[order.orderStatus]}>
                                        {order.orderStatus}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                                    <div>
                                        <p className="text-sm font-medium">Customer</p>
                                        <p className="text-sm text-muted-foreground">
                                            {order.user?.fullname || order.shippingAddress.name}
                                        </p>
                                        <p className="text-sm text-muted-foreground">{order.user?.email || "Guest"}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Items</p>
                                        {order.items.slice(0, 2).map((item, index) => (
                                            <p key={index} className="text-sm text-muted-foreground">
                                                {item.product.title} x{item.quantity}
                                            </p>
                                        ))}
                                        {order.items.length > 2 && (
                                            <p className="text-sm text-muted-foreground">+{order.items.length - 2} more items</p>
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Total</p>
                                        <p className="text-sm text-muted-foreground">${order.totalPayable}</p>
                                        <p className="text-xs text-muted-foreground">Payment: {order.paymentStatus}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Date</p>
                                        <p className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Select value={order.orderStatus} onValueChange={(value) => updateOrderStatus(order._id, value)}>
                                            <SelectTrigger className="w-32 focus:ring-green-500 focus:border-green-500">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Pending">Pending</SelectItem>
                                                <SelectItem value="Processing">Processing</SelectItem>
                                                <SelectItem value="Shipped">Shipped</SelectItem>
                                                <SelectItem value="Delivered">Delivered</SelectItem>
                                                <SelectItem value="Cancelled">Cancelled</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleViewDetails(order)}
                                        className="border-green-200 hover:bg-green-50"
                                    >
                                        <Eye className="h-4 w-4 mr-2" />
                                        View Details
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {filteredOrders.length === 0 && (
                <div className="text-center py-12">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No orders found</h3>
                    <p className="text-muted-foreground">
                        {statusFilter === "all" ? "No orders have been placed yet." : `No ${statusFilter} orders found.`}
                    </p>
                </div>
            )}

            <OrderDetailsDialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen} order={selectedOrder} />
        </div>
    )
}
