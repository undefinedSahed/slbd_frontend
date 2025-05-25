import type { Metadata } from "next"
import { OrderDetails } from "@/components/account/order-details"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
    title: "Order Details",
    description: "View details of your order",
}

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    return (
        <div className="space-y-6">
            <Separator />
            <OrderDetails orderId={resolvedParams.id} />
        </div>
    )
}
