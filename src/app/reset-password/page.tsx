import ResetPasswordPage from '@/components/auth/reset-password'
import React, { Suspense } from 'react'

export default function page() {
    return (
        <main>
            <Suspense fallback={<div>Loading...</div>}>
                <ResetPasswordPage />
            </Suspense>
        </main>
    )
}
