"use client"

import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Download, Loader2, Printer, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import jsPDF from "jspdf"

// PDF generation utility
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const generatePDF = (order: any) => {
    const items = order.items || []
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const subtotal = items.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0)
    const address = order.shippingAddress || {}

    // Create new PDF document
    const pdf = new jsPDF()

    // Set font
    pdf.setFont("helvetica")

    // Header
    pdf.setFontSize(20)
    pdf.setTextColor(22, 163, 74) // Green color
    pdf.text("Super Lighting BD", 105, 20, { align: "center" })

    pdf.setFontSize(16)
    pdf.setTextColor(0, 0, 0)
    pdf.text("INVOICE", 105, 30, { align: "center" })

    pdf.setFontSize(12)
    pdf.text(`Order #${order._id}`, 105, 40, { align: "center" })

    // Order Information
    let yPos = 60
    pdf.setFontSize(14)
    pdf.setFont("helvetica", "bold")
    pdf.text("Order Information", 20, yPos)

    pdf.setFontSize(10)
    pdf.setFont("helvetica", "normal")
    yPos += 10
    pdf.text(`Order Date: ${new Date(order.createdAt).toLocaleDateString()}`, 20, yPos)
    yPos += 8
    pdf.text(`Order ID: #${order._id}`, 20, yPos)
    yPos += 8
    pdf.text(`Status: ${order.orderStatus}`, 20, yPos)

    // Shipping Address
    yPos += 15
    pdf.setFontSize(14)
    pdf.setFont("helvetica", "bold")
    pdf.text("Shipping Address", 20, yPos)

    pdf.setFontSize(10)
    pdf.setFont("helvetica", "normal")
    yPos += 10
    pdf.text(`Name: ${address.name || "N/A"}`, 20, yPos)
    yPos += 8
    pdf.text(`Address: ${address.address || "N/A"}`, 20, yPos)
    yPos += 8
    pdf.text(`City: ${address.city || "N/A"}`, 20, yPos)

    // Items Table
    yPos += 20
    pdf.setFontSize(14)
    pdf.setFont("helvetica", "bold")
    pdf.text("Order Items", 20, yPos)

    // Table headers
    yPos += 15
    pdf.setFontSize(10)
    pdf.setFont("helvetica", "bold")
    pdf.text("Product", 20, yPos)
    pdf.text("Price", 100, yPos)
    pdf.text("Qty", 130, yPos)
    pdf.text("Total", 160, yPos)

    // Table line
    yPos += 5
    pdf.line(20, yPos, 190, yPos)

    // Table items
    pdf.setFont("helvetica", "normal")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    items.forEach((item: any) => {
        yPos += 10
        const productName = item.product?.title || "Unknown"
        // Truncate long product names
        const truncatedName = productName.length > 35 ? productName.substring(0, 35) + "..." : productName

        pdf.text(truncatedName, 20, yPos)
        pdf.text(`$${item.price.toFixed(2)}`, 100, yPos)
        pdf.text(item.quantity.toString(), 130, yPos)
        pdf.text(`$${(item.price * item.quantity).toFixed(2)}`, 160, yPos)
    })

    // Total section
    yPos += 20
    pdf.line(130, yPos, 190, yPos)
    yPos += 10

    pdf.text("Subtotal:", 130, yPos)
    pdf.text(`$${subtotal.toFixed(2)}`, 160, yPos)
    yPos += 8

    pdf.text("Shipping:", 130, yPos)
    pdf.text(`$${(order.deliveryCharge ?? 0).toFixed(2)}`, 160, yPos)
    yPos += 8

    // Final total
    pdf.setFont("helvetica", "bold")
    pdf.setFontSize(12)
    pdf.text("Total:", 130, yPos)
    pdf.text(`$${(order.totalPayable ?? 0).toFixed(2)}`, 160, yPos)

    // Download the PDF
    pdf.save(`invoice-${order._id}.pdf`)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const printReceipt = (order: any) => {
    // Create a new window for printing
    const printWindow = window.open("", "_blank")
    if (!printWindow) return

    const items = order.items || []
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const subtotal = items.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0)
    const address = order.shippingAddress || {}

    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Receipt - Order #${order._id}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
                .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #eee; padding-bottom: 20px; }
                .company-name { font-size: 24px; font-weight: bold; color: #16a34a; }
                .receipt-title { font-size: 20px; margin: 10px 0; }
                .order-info { display: flex; justify-content: space-between; margin: 20px 0; }
                .order-details, .shipping-details { width: 48%; }
                .section-title { font-weight: bold; margin-bottom: 10px; border-bottom: 1px solid #ddd; padding-bottom: 5px; }
                .items-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                .items-table th, .items-table td { border: 1px solid #ddd; padding: 10px; text-align: left; }
                .items-table th { background-color: #f5f5f5; font-weight: bold; }
                .total-section { margin-top: 20px; text-align: right; }
                .total-row { display: flex; justify-content: space-between; margin: 5px 0; }
                .total-final { font-weight: bold; font-size: 18px; border-top: 2px solid #333; padding-top: 10px; }
                .status-badge { padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; }
                .status-delivered { background-color: #dcfce7; color: #166534; }
                .status-shipped { background-color: #dbeafe; color: #1e40af; }
                .status-processing { background-color: #fef3c7; color: #92400e; }
                .status-pending { background-color: #fef3c7; color: #92400e; }
                .status-cancelled { background-color: #fee2e2; color: #991b1b; }
                @media print {
                    body { margin: 0; }
                    .no-print { display: none; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="company-name">Super Lighting BD</div>
                <div class="receipt-title">RECEIPT</div>
                <div>Order #${order._id}</div>
            </div>
            
            <div class="order-info">
                <div class="order-details">
                    <div class="section-title">Order Information</div>
                    <div><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</div>
                    <div><strong>Order ID:</strong> #${order._id}</div>
                    <div><strong>Status:</strong> <span class="status-badge status-${order.orderStatus?.toLowerCase()}">${order.orderStatus}</span></div>
                </div>
                
                <div class="shipping-details">
                    <div class="section-title">Shipping Address</div>
                    <div><strong>Name:</strong> ${address.name || "N/A"}</div>
                    <div><strong>Address:</strong> ${address.address || "N/A"}</div>
                    <div><strong>City:</strong> ${address.city || "N/A"}</div>
                </div>
            </div>
            
            <table class="items-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${items
            .map(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (item: any) => `
                        <tr>
                            <td>${item.product?.title || "Unknown"}</td>
                            <td>$${item.price.toFixed(2)}</td>
                            <td>${item.quantity}</td>
                            <td>$${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                    `,
            )
            .join("")}
                </tbody>
            </table>
            
            <div class="total-section">
                <div class="total-row">
                    <span>Subtotal:</span>
                    <span>$${subtotal.toFixed(2)}</span>
                </div>
                <div class="total-row">
                    <span>Shipping:</span>
                    <span>$${(order.deliveryCharge ?? 0).toFixed(2)}</span>
                </div>
                <div class="total-row total-final">
                    <span>Total:</span>
                    <span>$${(order.totalPayable ?? 0).toFixed(2)}</span>
                </div>
            </div>
        </body>
        </html>
    `

    printWindow.document.write(htmlContent)
    printWindow.document.close()

    // Trigger print dialog
    setTimeout(() => {
        printWindow.print()
        printWindow.close()
    }, 500)
}

export function OrderDetails({ orderId }: { orderId: string }) {
    const { data: session } = useSession()
    const router = useRouter()
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

    const {
        data: order,
        isLoading,
        error,
    } = useQuery({
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
        return (
            <div className="text-center py-8">
                <div className="text-red-600 mb-4">Failed to load order details</div>
                <Button onClick={() => router.back()} variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Go Back
                </Button>
            </div>
        )
    }

    if (!order) {
        return (
            <div className="text-center py-8">
                <div className="mb-4">Order not found</div>
                <Button onClick={() => router.back()} variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Go Back
                </Button>
            </div>
        )
    }

    // Fallbacks for optional fields
    const address = order.shippingAddress || {}
    const items = order.items || []

    // Calculate subtotal from items if needed
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const subtotal = items.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0)

    return (
        <div className="space-y-4 sm:space-y-6 max-w-full px-4 sm:px-0">
            {/* Header with Back Button */}
            <div className="flex items-center gap-4 mb-6">
                <Button onClick={() => router.back()} variant="outline" size="sm" className="shrink-0">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                </Button>
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold">Order Details</h1>
                    <p className="text-sm text-muted-foreground">Order #{order._id.slice(-8)}</p>
                </div>
            </div>

            {/* Order Information and Payment Summary */}
            <div className="grid gap-4 lg:gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg">Order Information</CardTitle>
                        <CardDescription>Details about your order</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-3">
                            <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                                <div className="text-sm text-muted-foreground">Order Date</div>
                                <div className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</div>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                                <div className="text-sm text-muted-foreground">Order Status</div>
                                <div>
                                    <Badge variant="outline" className={getStatusColor(order.orderStatus || "")}>
                                        {order.orderStatus}
                                    </Badge>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                                <div className="text-sm text-muted-foreground">Order ID</div>
                                <div className="font-mono text-sm">#{order._id}</div>
                            </div>
                        </div>
                        <Separator />
                        <div className="space-y-2">
                            <div className="font-medium">Shipping Address</div>
                            <div className="text-sm space-y-1">
                                <div>
                                    <span className="text-muted-foreground">Name:</span> {address.name || "N/A"}
                                </div>
                                <div>
                                    <span className="text-muted-foreground">Address:</span> {address.address || "N/A"}
                                </div>
                                <div>
                                    <span className="text-muted-foreground">City:</span> {address.city || "N/A"}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg">Payment Summary</CardTitle>
                        <CardDescription>Payment details for your order</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <div className="text-sm text-muted-foreground">Subtotal</div>
                                <div className="font-medium">${subtotal.toFixed(2)}</div>
                            </div>
                            <div className="flex justify-between">
                                <div className="text-sm text-muted-foreground">Shipping</div>
                                <div className="font-medium">${(order.deliveryCharge ?? 0).toFixed(2)}</div>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-medium text-lg">
                                <div>Total</div>
                                <div>${(order.totalPayable ?? 0).toFixed(2)}</div>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 pt-4">
                            <Button variant="outline" size="sm" className="flex-1 cursor-pointer" onClick={() => printReceipt(order)}>
                                <Printer className="mr-2 h-4 w-4" />
                                Print Receipt
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1 cursor-pointer" onClick={() => generatePDF(order)}>
                                <Download className="mr-2 h-4 w-4" />
                                Download Invoice
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Order Items */}
            <Card>
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg">Order Items</CardTitle>
                    <CardDescription>Items included in your order</CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Desktop Table View */}
                    <div className="hidden md:block overflow-x-auto">
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
                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                {items.map((item: any) => (
                                    <TableRow key={item._id}>
                                        <TableCell>
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
                                        <TableCell className="text-right font-medium">${(item.price * item.quantity).toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden space-y-4">
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {items.map((item: any) => (
                            <Card key={item._id} className="p-4">
                                <div className="flex gap-4">
                                    <div className="w-16 h-16 relative shrink-0">
                                        <Image
                                            src={item.product?.thumbnail || "/placeholder.svg"}
                                            alt={item.product?.title || "Product image"}
                                            width={64}
                                            height={64}
                                            className="object-cover rounded-md w-full h-full"
                                        />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <h4 className="font-medium text-sm">{item.product?.title || "Unknown"}</h4>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Price:</span>
                                            <span>${item.price.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Quantity:</span>
                                            <span>{item.quantity}</span>
                                        </div>
                                        <div className="flex justify-between text-sm font-medium">
                                            <span>Total:</span>
                                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
