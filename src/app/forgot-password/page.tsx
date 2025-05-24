import ForgotPasswordPage from '@/components/auth/forgot-password'
import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata = {
    title: "Forgot Password - SLBD",
    description: "Forgot Password - Super Lighting BD",
}


export default function page() {
    return (
        <main>
            <ForgotPasswordPage />
        </main>
    )
}
