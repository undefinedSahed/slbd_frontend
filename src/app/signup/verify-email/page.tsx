import VerifyEmailPage from '@/components/auth/verify-email-page'
import React, { Suspense } from 'react'

export default function page() {
    return (
        <main>
            <Suspense fallback={<div>Loading...</div>}>
                <VerifyEmailPage />
            </Suspense>
        </main>
    )
}
