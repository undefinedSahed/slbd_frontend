"use client"

import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Download, Loader2, Printer } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useSession } from "next-auth/react"

export function OrderDetails({ orderId }: { orderId: string }) {
    const { data: session } = useSession()
    const token = session?.user?.accessToken

    const fetchOrderDetails = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/orders/${orderId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        if (!res.ok) throw new Error("Failed to fetch order details")
        const data = await res.json()
        return data.data.order
    }

    const { data: order, isLoading, error } = useQuery({
        queryKey: ["order", orderId],
        queryFn: fetchOrderDetails,
        enabled: !!token && !!orderId,
        retry: false,
    })

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "delivered":
                return "bg-green-100 text-green-600 hover:bg-green-100 dark:bg-green-950"
            case "shipped":
                return "bg-blue-100 text-blue-600 hover:bg-blue-100 dark:bg-blue-950"
            case "pending":
            case "processing":
                return "bg-amber-100 text-amber-600 hover:bg-amber-100 dark:bg-amber-950"
            case "cancelled":
                return "bg-red-100 text-red-600 hover:bg-red-100 dark:bg-red-950"
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

    if (error) {
        return <div className="text-red-600">Failed to load order details</div>
    }

    if (!order) {
        return <div>Order not found</div>
    }

    // Fallbacks for optional fields
    const address = order.shippingAddress || {}
    const items = order.items || []

    // Calculate subtotal from items if needed
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const subtotal = items.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0)

    return (
        <div className="space-y-6 max-w-full">
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Order Information</CardTitle>
                        <CardDescription>Details about your order</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between">
                            <div className="text-sm text-muted-foreground">Order Date</div>
                            <div>{new Date(order.createdAt).toLocaleDateString()}</div>
                        </div>
                        <div className="flex justify-between">
                            <div className="text-sm text-muted-foreground">Order Status</div>
                            <div>
                                <Badge variant="outline" className={getStatusColor(order.orderStatus || "")}>
                                    {order.orderStatus}
                                </Badge>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className="text-sm text-muted-foreground">Order ID</div>
                            <div>#{order._id}</div>
                        </div>
                        <Separator />
                        <div className="space-y-2">
                            <div className="font-medium">Shipping Address</div>
                            <div className="text-sm">
                                Name: {address.name || "N/A"}
                                <br />
                                Address: {address.address || "N/A"}
                                <br />
                                City: {address.city || "N/A"}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Payment Summary</CardTitle>
                        <CardDescription>Payment details for your order</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between">
                            <div className="text-sm text-muted-foreground">Subtotal</div>
                            <div>${subtotal.toFixed(2)}</div>
                        </div>
                        <div className="flex justify-between">
                            <div className="text-sm text-muted-foreground">Shipping</div>
                            <div>${(order.deliveryCharge ?? 0).toFixed(2)}</div>
                        </div>
                        {/* No tax field in API */}
                        <Separator />
                        <div className="flex justify-between font-medium">
                            <div>Total</div>
                            <div>${(order.totalPayable ?? 0).toFixed(2)}</div>
                        </div>
                        <div className="flex gap-2 pt-4 flex-wrap">
                            <Button variant="outline" size="sm" className="flex-1 min-w-[150px]">
                                <Printer className="mr-2 h-4 w-4" />
                                Print Receipt
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1 min-w-[150px]">
                                <Download className="mr-2 h-4 w-4" />
                                Download Invoice
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Order Items</CardTitle>
                    <CardDescription>Items included in your order</CardDescription>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">Image</TableHead>
                                <TableHead>Product</TableHead>
                                <TableHead className="text-center">Price</TableHead>
                                <TableHead className="text-center">Quantity</TableHead>
                                <TableHead className="text-right">Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any  */}
                            {items.map((item: any) => (
                                <TableRow key={item._id}>
                                    <TableCell className="">
                                        <div className="w-[50px] h-[50px] relative flex items-center">
                                            <Image
                                                src={item.product?.thumbnail || "/placeholder.svg"}
                                                alt={item.product?.title || "Product image"}
                                                width={50}
                                                height={50}
                                                className="object-cover rounded-md"
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium">{item.product?.title || "Unknown"}</TableCell>
                                    <TableCell className="text-center">${item.price.toFixed(2)}</TableCell>
                                    <TableCell className="text-center">{item.quantity}</TableCell>
                                    <TableCell className="text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
