import type { Metadata } from "next"
import { OrdersList } from "@/components/account/order-list";

export const metadata: Metadata = {
    title: "Order Details",
    description: "View details of your order",
}

export default async function OrderDetailsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center">
                <div>
                    <h3 className="text-xl font-bold">Orders</h3>
                </div>
            </div>
            <OrdersList />
        </div>
    )
}
