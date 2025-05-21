
import CartPage from '@/components/cart/cart-page'
import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata = {
    title: "Shopping Cart - Super Lighting BD",
    description: "Contact with Super Lighting BD",
}


export default function page() {
    return (
        <main>
            <CartPage />
        </main>
    )
}
