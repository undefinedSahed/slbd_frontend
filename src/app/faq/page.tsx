import FAQSection from '@/components/faq/faq-section'
import React from 'react'
import { Metadata } from 'next'
import Image from 'next/image';
import CommonBanner from '@/components/shared/common-banner';

export const metadata: Metadata = {
    title: "Frequently Asked Questions | Super Lighting BD",
    description: "Frequently Asked Questions About - Super Lighting BD",
};

export default function page() {
    return (
        <main>
            <CommonBanner heading='FAQ' />
            <div className="py-8 lg:py-20 px-2 md:px-6 lg:px-36">
                <h2 className="text-xl md:text-3xl underline underline-offset-5 font-bold text-center mb-6 lg:mb-12 text-primary">Frequently Asked Questions</h2>
                <div className="flex justify-between items-center">
                    <div className="w-full md:w-2/3">
                        <FAQSection />
                    </div>
                    <div className="hidden md:block md:w-1/3 ">
                        <Image
                            src="/assets/faq.jpg"
                            alt='FAQ Question Image'
                            width={1000}
                            height={1000}
                            className='w-full aspect-5/6 object-cover shadow-[0px_0px_5px_#16a34a] rounded-lg'
                        />
                    </div>
                </div>
            </div>
        </main>
    )
}
