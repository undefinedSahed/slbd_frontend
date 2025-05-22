import type { Metadata } from "next"
import { OrderDetails } from "@/components/account/order-details"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
    title: "Order Details",
    description: "View details of your order",
}

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    return (
        <div className="space-y-6">
            <div>
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/orders">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Orders
                        </Link>
                    </Button>
                    <div>
                        <h3 className="text-xl font-bold">Order #{resolvedParams.id}</h3>
                        <p className="text-sm text-muted-foreground">View the details of your order</p>
                    </div>
                </div>
            </div>
            <Separator />
            <OrderDetails orderId={resolvedParams.id} />
        </div>
    )
}
