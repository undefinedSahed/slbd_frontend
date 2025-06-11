"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { toast } from "sonner"

interface OrderDetails {
    _id: string
    user: string
    items: Array<{
        product: {
            _id: string
            title: string
            price: number
            thumbnail: string
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
    orderStatus: string
    paymentStatus: string
    createdAt: string
    updatedAt: string
}

interface Order {
    _id: string
}

interface OrderDetailsDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    order: Order | null
}

export function OrderDetailsDialog({ open, onOpenChange, order }: OrderDetailsDialogProps) {
    const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchOrderDetails = async () => {
            if (!order || !open) return

            setLoading(true)
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/orders/${order._id}`)
                const data = await response.json()

                if (data.success) {
                    setOrderDetails(data.data.order)
                } else {
                    toast.error(data.message || "Failed to fetch order details")
                }
                // eslint-disable-next-line
            } catch (error: any) {
                toast.error(`Error: ${error.message}`)
            } finally {
                setLoading(false)
            }
        }

        fetchOrderDetails()
    }, [order, open])

    if (!orderDetails && !loading) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto bg-white">
                <DialogHeader>
                    <DialogTitle className="text-green-700">Order Details</DialogTitle>
                </DialogHeader>

                {loading ? (
                    <div className="space-y-4">
                        <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                        <div className="h-20 bg-muted animate-pulse rounded" />
                        <div className="h-32 bg-muted animate-pulse rounded" />
                    </div>
                ) : orderDetails ? (
                    <div className="space-y-6">
                        {/* Order Info */}
                        <div>
                            <h3 className="font-semibold mb-2 text-green-700">Order Information</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="font-medium">Order ID:</span> #{orderDetails._id.slice(-8)}
                                </div>
                                <div>
                                    <span className="font-medium">Date:</span> {new Date(orderDetails.createdAt).toLocaleDateString()}
                                </div>
                                <div>
                                    <span className="font-medium">Status:</span>
                                    <Badge className="ml-2 bg-green-600">{orderDetails.orderStatus}</Badge>
                                </div>
                                <div>
                                    <span className="font-medium">Payment:</span>
                                    <Badge variant="outline" className="ml-2">
                                        {orderDetails.paymentStatus}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        <Separator />

                        {/* Shipping Address */}
                        <div>
                            <h3 className="font-semibold mb-2 text-green-700">Shipping Address</h3>
                            <div className="text-sm space-y-1">
                                <p>
                                    <span className="font-medium">Name:</span> {orderDetails.shippingAddress.name}
                                </p>
                                <p>
                                    <span className="font-medium">Phone:</span> {orderDetails.shippingAddress.phone}
                                </p>
                                <p>
                                    <span className="font-medium">City:</span> {orderDetails.shippingAddress.city}
                                </p>
                                <p>
                                    <span className="font-medium">Address:</span> {orderDetails.shippingAddress.address}
                                </p>
                            </div>
                        </div>

                        <Separator />

                        {/* Order Items */}
                        <div>
                            <h3 className="font-semibold mb-2 text-green-700">Order Items</h3>
                            <div className="space-y-3">
                                {orderDetails.items.map((item) => (
                                    <div
                                        key={item._id}
                                        className="flex items-center justify-between p-3 border rounded-lg border-green-200"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <Image
                                                src={item.product.thumbnail}
                                                alt={item.product.title}
                                                width={100}
                                                height={100}
                                                className="w-12 h-12 object-cover rounded"
                                            />
                                            <div>
                                                <p className="font-medium text-sm">{item.product.title}</p>
                                                <p className="text-xs text-muted-foreground">Quantity: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium">${item.price}</p>
                                            <p className="text-xs text-muted-foreground">Total: ${item.price * item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Separator />

                        {/* Order Summary */}
                        <div>
                            <h3 className="font-semibold mb-2 text-green-700">Order Summary</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Subtotal:</span>
                                    <span>${orderDetails.totalAmount}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Delivery Charge:</span>
                                    <span>${orderDetails.deliveryCharge}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-semibold text-green-700">
                                    <span>Total:</span>
                                    <span>${orderDetails.totalPayable}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </DialogContent>
        </Dialog>
    )
}
