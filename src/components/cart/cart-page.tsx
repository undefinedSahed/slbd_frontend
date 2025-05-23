"use client"

import Image from "next/image"
import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Minus, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { toast } from "sonner"

interface CartItem {
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

export default function CartPage() {

    const session = useSession()
    const token = session?.data?.user?.accessToken
    const queryClient = useQueryClient()

    const { data: cartData, isLoading } = useQuery({
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
        enabled: !!token, // Only fetch if token exists
    })

    const [quantities, setQuantities] = useState<Record<string, number>>({})

    const updateQuantity = (id: string, newQuantity: number) => {
        if (newQuantity < 1) return
        setQuantities({
            ...quantities,
            [id]: newQuantity,
        })
    }

    const getQuantity = (id: string, defaultQuantity: number) => {
        return quantities[id] !== undefined ? quantities[id] : defaultQuantity
    }

    const calculateSubtotal = () => {
        if (!cartData?.data?.items) return 0;

        return cartData.data.items.reduce((total: number, item: CartItem) => {
            const quantity = getQuantity(item.product_id._id, item.quantity);
            const price = item.product_id.discount
                ? item.product_id.price * (1 - item.product_id.discount / 100)
                : item.product_id.price;

            return total + price * quantity;
        }, 0);
    };



    const calculateTotal = () => {
        const subtotal = calculateSubtotal()
        // Add shipping or tax calculation here if needed
        return subtotal
    }

    const { mutate: clearCart, isPending: isClearing } = useMutation({
        mutationFn: async () => {
            if (!token) throw new Error("No token found")
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/cart/clear`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            if (!res.ok) {
                throw new Error("Failed to clear cart")
            }
            return res.json()
        },
        onSuccess: () => {
            if (token) {
                queryClient.invalidateQueries({ queryKey: ["cartData", token] })
                setQuantities({}) // Reset local quantities after clearing
            }
        },
    })


    const { mutate: removeItemFromCart } = useMutation({
        mutationFn: async (product_id: string) => {
            if (!token) throw new Error("No token found")
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/cart/removeitem`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ product_id })
            })
            if (!res.ok) {
                throw new Error("Failed to remove item from cart")
            }
            return res.json()
        },
        onSuccess: () => {
            if (token) {
                queryClient.invalidateQueries({ queryKey: ["cartData", token] })
            }
        },
    })


    const { mutate: updateCartItemQuantity, isPending: isUpdating } = useMutation({
        mutationFn: async (items: { product_id: string; quantity: number }[]) => {
            if (!token) throw new Error("No token found");

            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/cart/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ items }), // Send an array of items
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || "Failed to update cart");
            }

            return res.json();
        },
        onSuccess: () => {
            toast.success("Cart Updated Successfully")
            if (token) {
                queryClient.invalidateQueries({ queryKey: ["cartData", token] });
                // Optionally update the local quantities to match the server
                if (cartData?.data?.items) {
                    const updatedQuantities: Record<string, number> = {};
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    cartData.data.items.forEach((item: any) => {
                        updatedQuantities[item.product_id._id] = getQuantity(item.product_id._id, item.quantity);
                    });
                    setQuantities(updatedQuantities);
                }
            }
        },
    });


    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }


    const handleUpdateCart = () => {
        if (!cartData?.data?.items) return;

        const itemsToUpdate = cartData.data.items.map((item: CartItem) => ({
            product_id: item.product_id._id,
            quantity: getQuantity(item.product_id._id, item.quantity),
        }));

        // Filter out items where the quantity hasn't changed (optional optimization)
        const changedItems = itemsToUpdate.filter(
            (item: CartItem, index: number) => item.quantity !== cartData.data.items[index].quantity
        );

        if (changedItems.length > 0) {
            updateCartItemQuantity(changedItems);
        } else {
           toast.error("No changes to update.");
        }
    }

    const handleClearCart = () => {
        clearCart()
    }

    const handleRemoveItem = (product_id: string) => {
        removeItemFromCart(product_id)
    }




    if (!cartData?.data || cartData?.data?.items?.length === 0) {
        return (
            <div className="text-center lg:py-20 py-8">
                <h2 className='text-[34px] font-jsans font-bold text-[#101750] pb-4'>Cart is empty</h2>
                <Link href="/shop" className='font-jsans text-[16px] font-semibold text-[#FFF] py-2 px-5 rounded-sm bg-primary'>Go to Shop</Link>
            </div>
        )
    }


    return (
        <section className="lg:py-20 py-8 px-4 md:px-6 lg:px-12">
            <div className="container mx-auto px-4 py-8">
                <h1 className=" text-xl md:text-3xl underline underline-offset-5 font-bold mb-12 text-primary">Shopping Cart</h1>
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow">
                            <div className="hidden md:grid md:grid-cols-12 p-4 bg-gray-50 font-medium text-gray-700">
                                <div className="md:col-span-6">Product</div>
                                <div className="md:col-span-2 text-center">Price</div>
                                <div className="md:col-span-2 text-center">Quantity</div>
                                <div className="md:col-span-2 text-center">Total</div>
                            </div>

                            <Separator />

                            {cartData?.data?.items?.map((item: CartItem) => (
                                <div key={item.product_id._id} className="grid md:grid-cols-12 p-4 gap-4 items-center border-b border-primary">
                                    <div className="md:col-span-6 flex flex-col md:flex-row gap-4 items-center">
                                        <div className="relative w-20 h-20 flex-shrink-0">
                                            <Image
                                                src={item.product_id.thumbnail || "/placeholder.svg"}
                                                alt={item.product_id.title}
                                                fill
                                                className="object-cover rounded-md"
                                            />
                                            <button
                                                onClick={() => handleRemoveItem(item.product_id._id)}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 cursor-pointer"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                        <div>
                                            <h3 className="font-medium">{item.product_id.title}</h3>
                                            <p className="text-sm text-gray-500">Category: {item.product_id.category.title}</p>
                                            <p className="text-sm text-gray-500">Sold: {item.product_id.sold}+</p>
                                        </div>
                                    </div>

                                    <div className="md:col-span-2 text-center">
                                        <div className="md:hidden text-sm font-medium text-gray-500">Price:</div>
                                        <p className="font-medium">
                                            ৳ {item.product_id.discount
                                                ? (item.product_id.price * (1 - item.product_id.discount / 100)).toFixed(2)
                                                : item.product_id.price.toFixed(2)}
                                        </p>
                                    </div>

                                    <div className="md:col-span-2">
                                        <div className="md:hidden text-sm font-medium text-gray-500 mb-1">Quantity:</div>
                                        <div className="flex items-center justify-center border border-primary rounded-md">
                                            <button
                                                className="p-1 px-2"
                                                onClick={() =>
                                                    updateQuantity(item.product_id._id, getQuantity(item.product_id._id, item.quantity) - 1)
                                                }
                                            >
                                                <Minus size={16} className="text-primary" />
                                            </button>
                                            <input
                                                type="text"
                                                className="w-10 text-center text-primary border-none focus:ring-0"
                                                value={getQuantity(item.product_id._id, item.quantity)}
                                                readOnly
                                            />
                                            <button
                                                className="p-1 px-2"
                                                onClick={() =>
                                                    updateQuantity(item.product_id._id, getQuantity(item.product_id._id, item.quantity) + 1)
                                                }
                                            >
                                                <Plus size={16} className="text-primary" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="md:col-span-2 text-center">
                                        <div className="md:hidden text-sm font-medium text-gray-500">Total:</div>
                                        <p className="font-medium">
                                            ৳ {(
                                                (item.product_id.discount
                                                    ? item.product_id.price * (1 - item.product_id.discount / 100)
                                                    : item.product_id.price
                                                ) * getQuantity(item.product_id._id, item.quantity)
                                            ).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between mt-6">
                            <Button onClick={handleClearCart} variant="outline" className="bg-white text-primary border-primary hover:bg-primary/80 hover:text-white cursor-pointer" disabled={isClearing}>
                                {isClearing ? "Clearing cart ..." : "Clear Cart"}
                            </Button>
                            <Button variant="outline" className="bg-white text-primary border-primary hover:bg-primary/80 hover:text-white cursor-pointer" onClick={handleUpdateCart} disabled={isUpdating}>
                                {isUpdating ? "Updating ...." : "Update Cart"}
                            </Button>
                        </div>
                    </div>

                    <div className="lg:col-span-1 lg:sticky lg:top-20 lg:z-30 lg:h-fit">
                        <div className="bg-gray-50 rounded-lg p-6 shadow">
                            <h2 className="text-xl font-bold mb-4">Cart Totals</h2>

                            <div className="flex justify-between py-3">
                                <span>Subtotals:</span>
                                <span className="font-medium">৳ {calculateSubtotal().toFixed(2)}</span>
                            </div>

                            <Separator />

                            <div className="flex justify-between py-3">
                                <span>Totals:</span>
                                <span className="font-bold">৳ {calculateTotal().toFixed(2)}</span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-500 mt-2 mb-4">
                                <div className="w-2 h-2 rounded-full bg-green-600"></div>
                                <span>Shipping & taxes calculated at checkout</span>
                            </div>

                            <Link href="/checkout">
                                <Button className="w-full bg-green-600 hover:bg-green-700 text-white cursor-pointer">Proceed To Checkout</Button>
                            </Link>
                            <span className="text-[10px] text-center">Update the cart before checkout to checkout latest cart product</span>
                        </div>

                        {/* <div className="bg-gray-50 rounded-lg p-6 shadow mt-6">
                            <h2 className="text-xl font-bold mb-4">Calculate Shipping</h2>

                            <div className="space-y-4">
                                <Input placeholder="Bangladesh" className="bg-white" readOnly />
                                <Input placeholder="Mirpur, Dhaka - 1206" className="bg-white" readOnly />
                                <Input placeholder="Postal Code" className="bg-white" />
                                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Calculate Shipping</Button>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </section>
    )
}