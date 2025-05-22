"use client"

import { useState } from "react"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Eye, Loader2, Package } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock API call
const fetchOrders = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return [
        {
            id: "1001",
            date: "2023-05-15",
            status: "Delivered",
            total: 125.99,
            items: 3,
        },
        {
            id: "1002",
            date: "2023-06-22",
            status: "Shipped",
            total: 89.5,
            items: 2,
        },
        {
            id: "1003",
            date: "2023-07-10",
            status: "Processing",
            total: 210.75,
            items: 4,
        },
        {
            id: "1004",
            date: "2023-08-05",
            status: "Delivered",
            total: 45.99,
            items: 1,
        },
        {
            id: "1005",
            date: "2023-09-18",
            status: "Cancelled",
            total: 150.25,
            items: 3,
        },
        {
            id: "1006",
            date: "2023-10-30",
            status: "Delivered",
            total: 78.5,
            items: 2,
        },
        {
            id: "1007",
            date: "2023-11-12",
            status: "Processing",
            total: 199.99,
            items: 5,
        },
    ]
}

export function OrdersList() {
    const [filter, setFilter] = useState("all")
    const [search, setSearch] = useState("")

    const { data: orders, isLoading } = useQuery({
        queryKey: ["orders"],
        queryFn: fetchOrders,
    })

    const filteredOrders = orders?.filter((order) => {
        const matchesFilter = filter === "all" || order.status.toLowerCase() === filter.toLowerCase()
        const matchesSearch =
            order.id.includes(search) ||
            order.date.includes(search) ||
            order.status.toLowerCase().includes(search.toLowerCase())
        return matchesFilter && matchesSearch
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

    return (
        <Card>
            <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>You have placed {orders?.length} orders</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1">
                        <Input
                            placeholder="Search orders..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full"
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
                        </SelectContent>
                    </Select>
                </div>

                {filteredOrders && filteredOrders.length > 0 ? (
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
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">{order.id}</TableCell>
                                    <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={getStatusColor(order.status)}>
                                            {order.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-950"
                                            asChild
                                        >
                                            <Link href={`/orders/${order.id}`}>
                                                <Eye className="mr-2 h-4 w-4" />
                                                View Details
                                            </Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                        <Package className="h-10 w-10 text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-semibold">No orders found</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            {search || filter !== "all"
                                ? "Try adjusting your search or filter"
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
