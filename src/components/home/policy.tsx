import React from 'react'
import { BadgeDollarSign, RotateCcw, ShieldCheck, Truck } from 'lucide-react'




function Policy() {

    return (
        <section className="pt-8 lg:pt-20">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    <div className="flex justify-center">
                        <div className="text-center font-medium">
                            <div className='flex justify-center pb-2'>
                                <Truck className='h-10 w-10' />
                            </div>
                            <h3>Fast Shipping</h3>
                            <h6>Safe Delivery</h6>
                        </div>
                    </div>


                    <div className="flex justify-center font-medium">
                        <div className="text-center">
                            <div className='flex justify-center pb-2'>
                                <RotateCcw className='h-10 w-10' />
                            </div>
                            <h3>14-DAY RETURNS</h3>
                            <h6>Shop With Confidence</h6>
                        </div>
                    </div>

                    <div className="flex justify-center font-medium">
                        <div className="text-center">
                            <div className='flex justify-center pb-2'>
                                <BadgeDollarSign className='h-10 w-10' />
                            </div>
                            <h3>SECURETY PAYMENTS</h3>
                            <h6>Up To 12 Months Installments</h6>
                        </div>
                    </div>

                    <div className="flex justify-center font-medium">
                        <div className="text-center">
                            <div className='flex justify-center pb-2'>
                                <ShieldCheck className='h-10 w-10' />
                            </div>
                            <h3>FREE FABRIC SWATCHES</h3>
                            <h6>Delivered To Your Door</h6>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Policy