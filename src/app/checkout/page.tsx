import CheckoutPage from '@/components/checkout/checkout-page'
import React, { Suspense } from 'react'

export default function page() {
    return (
        <main>
            <Suspense fallback={<div>Loading...</div>}>
                <CheckoutPage />
            </Suspense>
        </main>
    )
}
