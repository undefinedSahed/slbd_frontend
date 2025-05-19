'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function VerifyEmailPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const router = useRouter();

    if (!token) {
        router.push('/login')
    }

    const verifyEmail = async () => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/register/verifyemail`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`,
                },
            }
        );

        const data = await response.json();

        if (data.success) {
            toast.success('Email verified successfully');
        } else {
            toast.error('Email verification failed');
        }
    };


    useEffect(() => {
        verifyEmail()
        setTimeout(() => {
            router.push('/login')
        }, 2000)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="container mx-auto">
            <div className="max-w-lg mx-auto text-center h-screen flex flex-col justify-center items-center">
                <h4 className='px-16 py-5 rounded-md bg-green-400 text-white'>Your Email has been Verified Successfully.</h4>
            </div>
        </div>
    );
}
