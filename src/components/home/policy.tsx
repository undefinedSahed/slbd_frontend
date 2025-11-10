import React from 'react'
import { BadgeDollarSign, RotateCcw, ShieldCheck, Truck } from 'lucide-react'




function Policy() {

    return (
        <section className="pt-8 pb-3 lg:pt-20">
            <div className="container mx-auto">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-5">
                    <div className="flex justify-center">
                        <div className="text-center font-medium">
                            <div className='flex justify-center pb-2'>
                                <Truck className='h-10 w-10' />
                            </div>
                            <h3 className="text-xs md:text-base">Fast Shipping</h3>
                            <h6 className="text-xs md:text-base">Safe Delivery</h6>
                        </div>
                    </div>


                    <div className="flex justify-center font-medium">
                        <div className="text-center">
                            <div className='flex justify-center pb-2'>
                                <RotateCcw className='h-10 w-10' />
                            </div>
                            <h3 className="text-xs md:text-base">14-DAY RETURNS</h3>
                            <h6 className="text-xs md:text-base">Shop With Confidence</h6>
                        </div>
                    </div>

                    <div className="flex justify-center font-medium">
                        <div className="text-center">
                            <div className='flex justify-center pb-2'>
                                <BadgeDollarSign className='h-10 w-10' />
                            </div>
                            <h3 className="text-xs md:text-base">SECURETY PAYMENTS</h3>
                            <h6 className="text-xs md:text-base">Up To 2 Months Installments</h6>
                        </div>
                    </div>

                    <div className="flex justify-center font-medium">
                        <div className="text-center">
                            <div className='flex justify-center pb-2'>
                                <ShieldCheck className='h-10 w-10' />
                            </div>
                            <h3 className="text-xs md:text-base">FREE SHIPPING</h3>
                            <h6 className="text-xs md:text-base">Delivered To Your Door</h6>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Policy