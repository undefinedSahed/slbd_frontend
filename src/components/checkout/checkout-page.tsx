"use client"

import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Loader2 } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { useSession } from "next-auth/react"

interface Product {
    _id: string
    title: string
    price: number
    thumbnail: string
    category: {
        title: string
    }
    discount: number
}

interface CartItem {
    product_id: Product
    quantity: number
    _id: string
}

interface CheckoutItem {
    product_id: {
        _id: string
        title: string
        price: number
        thumbnail: string
        category: {
            title: string
        }
        sold: number
        discount: number
    }
    quantity: number
}

// interface ProductData {
//     data: Product
// }

// Define the form schema with Zod
const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    phone: z.string().regex(/^(\+8801|01)[3-9]\d{8}$/, { message: "Please enter a valid Bangladeshi phone number" }),
    address: z.string().min(5, { message: "Address must be at least 5 characters" }),
    city: z.string().min(1, { message: "Please select a city" }),
})

type FormValues = z.infer<typeof formSchema>

export default function CheckoutPage() {
    const router = useRouter()
    const pathname = usePathname(); // replaces asPath

    const searchParams = useSearchParams()
    const productName = searchParams.get("productName")
    const quantityParam = searchParams.get("quantity")

    const [isSubmitting, setIsSubmitting] = useState(false)

    const session = useSession()
    const token = session?.data?.user?.accessToken

    const { fullname, city } = session?.data?.user || {}


    const [cities, setCities] = useState<string[]>([])

    // Initialize React Hook Form
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            phone: "",
            address: "",
            city: ""
        },
    })


    useEffect(() => {
        if (session?.data?.user) {
            form.reset({
                name: fullname,
                city: city,
                phone: "",
                address: "",
            })

        }
    }, [session?.data?.user, fullname, city, form])

    // const { watch } = form;

    // Fetch cart data if no product name in query params
    const { data: cartData, isLoading: isLoadingCart } = useQuery({
        queryKey: ["cartData", token],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/cart`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            return res.json()
        },
        enabled: !!token && !productName, // Only fetch if token exists and no productName
    })

    // Fetch single product data if productName is in query params
    const { data: productData, isLoading: isLoadingProductData } = useQuery({
        queryKey: ["product", productName],
        queryFn: async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products/${productName}`)
            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Failed to fetch product details")
            }
            return response.json()
        },
        enabled: !!productName, // Only fetch if productName exists
        staleTime: 1000 * 60 * 5, // 5 minutes
    })



    // Get cities of BD
    useEffect(() => {
        const fetchCities = async () => {
            const res = await fetch("https://countriesnow.space/api/v0.1/countries/cities", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ country: "Bangladesh" })
            });
            const data = await res.json();
            return setCities(data?.data)
        }

        fetchCities()
    }, [])



    // Determine which products to display
    const items =
        productName && productData?.data && quantityParam
            ? [{ product_id: productData.data, quantity: Number.parseInt(quantityParam, 10) }]
            : cartData?.data?.items || []

    // Calculate totals
    const calculateSubtotal = () => {
        return items.reduce((total: number, item: CartItem) => {
            const discountedPrice = item.product_id.discount
                ? item.product_id.price * (1 - item.product_id.discount / 100)
                : item.product_id.price;

            return total + discountedPrice * item.quantity;
        }, 0);
    };

    const calculateDeliveryCharge = () => {
        return form.watch("city") === "Dhaka" ? 60 : 100
    }


    const calculateTotal = () => {
        return calculateSubtotal() + calculateDeliveryCharge()
    }

    const onSubmit = async (values: FormValues) => {


        if (!token) {
            toast.error("Please login to continue")
            const fullPath = `${pathname}?${searchParams.toString()}`;
            router.push(`/login?callbackUrl=${encodeURIComponent(fullPath)}`);
            return
        }

        try {
            setIsSubmitting(true)
            // Prepare order data
            const orderData = {
                items: items.map((item: CartItem) => ({
                    product_id: item.product_id._id,
                    quantity: item.quantity,
                })),
                shippingAddress: {
                    name: values.name,
                    phone: values.phone,
                    address: values.address,
                    city: values.city,
                },
                totalAmount: calculateSubtotal(),
                deliveryCharge: calculateDeliveryCharge(),
                wasCartCheckout: !productName,
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/checkout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(orderData),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Failed to create order")
            }

            toast.success("Your order has been placed successfully!")
            // Redirect to order confirmation page
            setIsSubmitting(false)
        } catch (error) {
            toast.success("Failed to create order")
            setIsSubmitting(false)
            console.log(error)
        }
    }

    const isLoading = isLoadingCart || isLoadingProductData

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 lg:sticky lg:top-20 lg:z-30 lg:h-fit">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="bg-gray-50 rounded-lg p-6">
                                <h2 className="text-lg font-semibold mb-8 text-primary">Shipping address</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem className="col-span-2 md:col-span-1">
                                                <FormLabel>Full name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="John Doe" className="bg-white" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem className="col-span-2 md:col-span-1">
                                                <FormLabel>Phone</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="01XXXXXXXXX" className="bg-white" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="address"
                                        render={({ field }) => (
                                            <FormItem className="col-span-2">
                                                <FormLabel>Address</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="123 Main St" className="bg-white" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="city"
                                        render={({ field }) => (
                                            <FormItem className="col-span-2 md:col-span-1">
                                                <FormLabel>City</FormLabel>
                                                <Select
                                                    onValueChange={(value) => {
                                                        field.onChange(value)
                                                        form.trigger("city")
                                                    }}
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="bg-white">
                                                            <SelectValue placeholder="Dhaka" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="bg-white">
                                                        {
                                                            cities.map((city: string, index: number) => (
                                                                <SelectItem key={index} value={city}>{city}</SelectItem>
                                                            ))
                                                        }
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    "Complete Order"
                                )}
                            </Button>
                        </form>
                    </Form>
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-gray-50 rounded-lg p-6 sticky top-8">
                        <h2 className="text-lg font-semibold mb-4 text-primary">Order Summary</h2>

                        <div className="space-y-4 max-h-[400px] overflow-y-auto mb-4">
                            {items.map((item: CheckoutItem, index: number) => (
                                <div key={index} className="flex gap-4 pb-4 border-b border-primary items-center">
                                    <div className="relative w-16 h-16 flex-shrink-0 bg-white rounded-md overflow-hidden">
                                        <Image
                                            src={item.product_id.thumbnail}
                                            alt={item.product_id.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium text-sm">{item.product_id.title}</h3>
                                        <p className="text-xs text-gray-500">Category: {item.product_id.category.title}</p>
                                        <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">
                                            ৳ {item.product_id.discount
                                                ? (item.product_id.price * (1 - item.product_id.discount / 100)).toFixed(2)
                                                : item.product_id.price.toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Separator className="my-4" />

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Subtotal:</span>
                                <span>৳ {calculateSubtotal().toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping:</span>
                                <span>৳ {calculateDeliveryCharge()}</span>
                            </div>
                            <Separator className="my-2" />
                            <div className="flex justify-between font-bold">
                                <span>Total:</span>
                                <span>৳ {calculateTotal().toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-4">
                            <div className="w-2 h-2 rounded-full bg-green-600"></div>
                            <span>Shipping & taxes calculated at checkout</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
