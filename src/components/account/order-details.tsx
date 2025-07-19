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

// Unified invoice HTML template
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createInvoiceHTML = (order: any) => {
    const items = order.items || []
    const address = order.shippingAddress || {}

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Invoice - Order #${order._id}</title>
        <style>
            * { box-sizing: border-box; }
            body { 
                font-family: Arial, sans-serif; 
                margin: 0; 
                color: #333; 
                background: white;
                font-size: 12px;
            }
            .invoice-container {
                max-width: 800px;
                margin: 0 auto;
                background: white;
            }
            .header { 
                background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
                color: white;
                padding: 20px;
                position: relative;
            }
            .header-content {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
            }
            .company-info h1 { 
                font-size: 28px; 
                font-weight: bold; 
                margin: 0;
                letter-spacing: 1px;
            }
            .company-info .tagline { 
                font-size: 12px; 
                margin: 5px 0 0 0;
                opacity: 0.9;
            }
            .contact-info { 
                text-align: right; 
                font-size: 10px;
                line-height: 1.4;
            }
            .invoice-title { 
                text-align: center; 
                margin: 30px 0;
                position: relative;
            }
            .invoice-title h2 { 
                font-size: 24px; 
                margin: 0;
                color: #333;
            }
            .invoice-title .order-id { 
                font-size: 14px; 
                color: #666;
                margin-top: 5px;
            }
            .content-area {
                position: relative;
                background: #f8f9fa;
                margin: 20px;
                padding: 30px;
                border-radius: 8px;
                min-height: 400px;
            }
            .watermark {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 120px;
                font-weight: bold;
                color: rgba(34, 197, 94, 0.1);
                z-index: 1;
                pointer-events: none;
                user-select: none;
            }
            .order-info { 
                display: flex; 
                justify-content: space-between; 
                margin-bottom: 30px;
                position: relative;
                z-index: 2;
                gap: 20px;
            }
            .order-details, .shipping-details { 
                width: 45%; 
                background: white;
                padding: 20px;
                border-radius: 6px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .section-title { 
                font-weight: bold; 
                margin-bottom: 15px; 
                color: #22c55e;
                border-bottom: 2px solid #22c55e; 
                padding-bottom: 5px; 
                font-size: 14px;
            }
            .info-row {
                margin: 8px 0;
                line-height: 1.4;
            }
            .items-table { 
                width: 100%; 
                border-collapse: collapse; 
                margin: 20px 0;
                background: white;
                border-radius: 6px;
                overflow: hidden;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                position: relative;
                z-index: 2;
            }
            .items-table th { 
                background: #22c55e;
                color: white;
                padding: 12px;
                text-align: left;
                font-weight: bold;
                font-size: 12px;
            }
            .items-table td { 
                padding: 12px;
                border-bottom: 1px solid #e5e7eb;
                font-size: 11px;
            }
            .items-table tr:nth-child(even) td {
                background-color: #f8f9fa;
            }
            .total-section { 
                margin-top: 30px; 
                text-align: right;
                position: relative;
                z-index: 2;
            }
            .total-row { 
                display: flex; 
                justify-content: space-between; 
                margin: 8px 0;
                padding: 0 20px;
                font-size: 12px;
            }
            .total-final { 
                background: #22c55e;
                color: white;
                font-weight: bold; 
                font-size: 16px; 
                padding: 15px 20px;
                border-radius: 6px;
                margin-top: 10px;
            }
            .status-badge { 
                padding: 6px 12px; 
                border-radius: 20px; 
                font-size: 11px; 
                font-weight: bold;
                display: inline-block;
            }
            .status-delivered { background-color: #dcfce7; color: #166534; }
            .status-shipped { background-color: #dbeafe; color: #1e40af; }
            .status-processing { background-color: #fef3c7; color: #92400e; }
            .status-pending { background-color: #fef3c7; color: #92400e; }
            .status-cancelled { background-color: #fee2e2; color: #991b1b; }
            .footer {
                background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
                height: 20px;
                margin-top: 40px;
            }
            @media print {
                body { margin: 0; }
                .invoice-container { max-width: none; }
                .no-print { display: none; }
                @page { margin: 0.5in; }
            }
        </style>
    </head>
    <body>
        <div class="invoice-container">
            <div class="header">
                <div class="header-content">
                    <div class="company-info">
                        <h1>SUPER LIGHTING BD</h1>
                        <div class="tagline">SUPER LIGHT SUPER BRIGHT</div>
                    </div>
                    <div class="contact-info">
                        <div>House 116, Road W-02, Block D, Bashundhara R/A</div>
                        <div>Project: Bashundhara Residential Area 1216</div>
                        <div>Phone: +880 1724-188240</div>
                        <div>Email: superlightingbd@gmail.com</div>
                        <div>Website: www.superlightingbd.com</div>
                    </div>
                </div>
            </div>
            
            <div class="invoice-title">
                <h2>INVOICE</h2>
                <div class="order-id">Order #${order._id.slice(-8)}</div>
            </div>
            
            <div class="content-area">
                <div class="watermark">SLBD</div>
                
                <div class="order-info">
                    <div class="order-details">
                        <div class="section-title">Order Information</div>
                        <div class="info-row"><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</div>
                        <div class="info-row"><strong>Order ID:</strong> #${order._id}</div>
                        <div class="info-row"><strong>Status:</strong> <span class="status-badge status-${order.orderStatus?.toLowerCase()}">${order.orderStatus}</span></div>
                    </div>
                    
                    <div class="shipping-details">
                        <div class="section-title">Shipping Address</div>
                        <div class="info-row"><strong>Name:</strong> ${address.name || "N/A"}</div>
                        <div class="info-row"><strong>Address:</strong> ${address.address || "N/A"}</div>
                        <div class="info-row"><strong>City:</strong> ${address.city || "N/A"}</div>
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
                                <td>৳${item.price.toFixed(2)}</td>
                                <td>${item.quantity}</td>
                                <td>৳${(item.price * item.quantity).toFixed(2)}</td>
                            </tr>
                        `,
            )
            .join("")}
                    </tbody>
                </table>
                
                <div class="total-section">
                    <div class="total-row">
                        <span>Subtotal:</span>
                        <span>৳${order.totalAmount.toFixed(2)}</span>
                    </div>
                    <div class="total-row">
                        <span>Shipping:</span>
                        <span>৳${(order.deliveryCharge ?? 0).toFixed(2)}</span>
                    </div>
                    <div class="total-final">
                        <div style="display: flex; justify-content: space-between;">
                            <span>Total:</span>
                            <span>৳${(order.totalPayable ?? 0).toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="footer"></div>
        </div>
    </body>
    </html>
  `
}

// Unified PDF generation using HTML to PDF conversion
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const generatePDF = async (order: any) => {
    const htmlContent = createInvoiceHTML(order)

    // Create a temporary iframe to render the HTML
    const iframe = document.createElement("iframe")
    iframe.style.position = "absolute"
    iframe.style.left = "-9999px"
    iframe.style.width = "800px"
    iframe.style.height = "1000px"
    document.body.appendChild(iframe)

    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
    if (!iframeDoc) return

    iframeDoc.open()
    iframeDoc.write(htmlContent)
    iframeDoc.close()

    // Wait for content to load
    setTimeout(() => {
        if (iframe.contentWindow) {
            iframe.contentWindow.print()
        }
        document.body.removeChild(iframe)
    }, 500)

    // Alternative: Create a blob and download
    const blob = new Blob([htmlContent], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `invoice-${order._id}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
}

// Unified print function using the same HTML template
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const printReceipt = (order: any) => {
    const htmlContent = createInvoiceHTML(order)

    // Create a new window for printing
    const printWindow = window.open("", "_blank", "width=800,height=1000")
    if (!printWindow) return

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

    console.log(order)

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

    return (
        <div className="space-y-4 sm:space-y-12 max-w-full px-4 sm:px-0">
            {/* Header with Back Button */}
            <div className="flex items-center gap-4 mb-6">
                <Button
                    onClick={() => router.back()}
                    variant="outline"
                    size="sm"
                    className="shrink-0 border-primary cursor-pointer"
                >
                    <ArrowLeft className="h-4 w-4 mr-2 text-primary" />
                    Back
                </Button>
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold">Order Details</h1>
                    <p className="text-sm text-muted-foreground">Order #{order._id.slice(-8)}</p>
                </div>
            </div>

            {/* Order Information and Payment Summary */}
            <div className="grid gap-4 lg:gap-6 lg:grid-cols-2">
                <Card className="border border-primary shadow-[0px_4px_48px_-11px_rgba(34,_197,_94,_0.5)]">
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

                <Card className="border-1 border-primary shadow-[0px_4px_48px_-11px_rgba(34,_197,_94,_0.5)]">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg">Payment Summary</CardTitle>
                        <CardDescription>Payment details for your order</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <div className="text-sm text-muted-foreground">Subtotal</div>
                                <div className="font-medium">৳{order.totalAmount.toFixed(2)}</div>
                            </div>
                            <div className="flex justify-between">
                                <div className="text-sm text-muted-foreground">Shipping</div>
                                <div className="font-medium">৳{(order.deliveryCharge ?? 0).toFixed(2)}</div>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-medium text-lg">
                                <div>Total</div>
                                <div>৳{(order.totalPayable ?? 0).toFixed(2)}</div>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 pt-4">
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 cursor-pointer border-primary text-primary"
                                onClick={() => printReceipt(order)}
                            >
                                <Printer className="mr-2 h-4 w-4" />
                                Print Receipt
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 cursor-pointer border-primary text-primary"
                                onClick={() => generatePDF(order)}
                            >
                                <Download className="mr-2 h-4 w-4" />
                                Download Invoice
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Order Items */}
            <Card className="border-1 border-primary shadow-[0px_4px_48px_-11px_rgba(34,_197,_94,_0.5)]">
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg">Order Items</CardTitle>
                    <CardDescription>Items included in your order</CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Desktop Table View */}
                    <div className="hidden md:block overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-primary">
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
                                    <TableRow key={item._id} className="border-primary">
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
                                        <TableCell className="text-center">
                                            <span className="font-medium">
                                                ৳ {item.product.discount && item.product.discount > 0 ? (item.product.price * (1 - item.product.discount / 100)).toFixed(2) : item.product.price}</span>
                                        </TableCell>
                                        <TableCell className="text-center">{item.quantity}</TableCell>
                                        <TableCell className="text-right font-medium">
                                            ৳{(
                                                (item.product.discount
                                                    ? item.product.price * (1 - item.product.discount / 100)
                                                    : item.product.price
                                                ) * item.quantity
                                            ).toFixed(2)}
                                        </TableCell>
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
                                            <span className="font-medium">
                                                ৳ {item.product.discount
                                                    ? (item.product.price * (1 - item.product.discount / 100)).toFixed(2)
                                                    : item.product.price.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Quantity:</span>
                                            <span>{item.quantity}</span>
                                        </div>
                                        <div className="flex justify-between text-sm font-medium">
                                            <span>Total:</span>
                                            <span>
                                                ৳{(
                                                    (item.product.discount
                                                        ? item.product.price * (1 - item.product.discount / 100)
                                                        : item.product.price
                                                    ) * item.quantity
                                                ).toFixed(2)}
                                            </span>
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
