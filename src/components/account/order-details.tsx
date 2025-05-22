"use client"

import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Download, Loader2, Printer } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock API call
const fetchOrderDetails = async (orderId: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return {
        id: orderId,
        date: "2023-07-10",
        status: "Processing",
        total: 210.75,
        subtotal: 195.75,
        shipping: 15.0,
        tax: 0.0,
        address: {
            name: "John Doe",
            street: "123 Main St",
            city: "New York",
            state: "NY",
            zip: "10001",
            country: "USA",
        },
        items: [
            {
                id: "p1",
                name: "Wireless Headphones",
                price: 89.99,
                quantity: 1,
                image: "/placeholder.svg?height=80&width=80",
            },
            {
                id: "p2",
                name: "Smart Watch",
                price: 129.99,
                quantity: 1,
                image: "/placeholder.svg?height=80&width=80",
            },
            {
                id: "p3",
                name: "USB-C Cable",
                price: 12.99,
                quantity: 2,
                image: "/placeholder.svg?height=80&width=80",
            },
        ],
    }
}

export function OrderDetails({ orderId }: { orderId: string }) {
    const { data: order, isLoading } = useQuery({
        queryKey: ["order", orderId],
        queryFn: () => fetchOrderDetails(orderId),
    })

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "delivered":
                return "bg-green-100 text-green-600 hover:bg-green-100 dark:bg-green-950"
            case "shipped":
                return "bg-blue-100 text-blue-600 hover:bg-blue-100 dark:bg-blue-950"
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

    if (!order) {
        return <div>Order not found</div>
    }

    return (
        <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Order Information</CardTitle>
                        <CardDescription>Details about your order</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between">
                            <div className="text-sm text-muted-foreground">Order Date</div>
                            <div>{new Date(order.date).toLocaleDateString()}</div>
                        </div>
                        <div className="flex justify-between">
                            <div className="text-sm text-muted-foreground">Order Status</div>
                            <div>
                                <Badge variant="outline" className={getStatusColor(order.status)}>
                                    {order.status}
                                </Badge>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className="text-sm text-muted-foreground">Order ID</div>
                            <div>#{order.id}</div>
                        </div>
                        <Separator />
                        <div className="space-y-1">
                            <div className="font-medium">Shipping Address</div>
                            <div className="text-sm">
                                {order.address.name}
                                <br />
                                {order.address.street}
                                <br />
                                {order.address.city}, {order.address.state} {order.address.zip}
                                <br />
                                {order.address.country}
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
                            <div>${order.subtotal.toFixed(2)}</div>
                        </div>
                        <div className="flex justify-between">
                            <div className="text-sm text-muted-foreground">Shipping</div>
                            <div>${order.shipping.toFixed(2)}</div>
                        </div>
                        <div className="flex justify-between">
                            <div className="text-sm text-muted-foreground">Tax</div>
                            <div>${order.tax.toFixed(2)}</div>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-medium">
                            <div>Total</div>
                            <div>${order.total.toFixed(2)}</div>
                        </div>
                        <div className="flex gap-2 pt-4">
                            <Button variant="outline" size="sm" className="flex-1">
                                <Printer className="mr-2 h-4 w-4" />
                                Print Receipt
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1">
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
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">Image</TableHead>
                                <TableHead>Product</TableHead>
                                <TableHead className="text-right">Price</TableHead>
                                <TableHead className="text-right">Quantity</TableHead>
                                <TableHead className="text-right">Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {order.items.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <div className="w-[50px] h-[50px] relative">
                                            <Image
                                                src={item.image || "/placeholder.svg"}
                                                alt={item.name}
                                                width={50}
                                                height={50}
                                                className="object-cover rounded-md"
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                                    <TableCell className="text-right">{item.quantity}</TableCell>
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
