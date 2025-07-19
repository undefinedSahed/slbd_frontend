"use client";

import Image from "next/image";
import { useState } from "react";
import ProductImageGallery from "./image-gallery";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Minus, Plus, Star, Truck } from "lucide-react";
import FeaturesTable from "./features-table";
import RelatedProducts from "./related-products";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

interface ProductDetails {
  productName: string;
}

export default function ProductDetails({ productName }: ProductDetails) {
  const [quantity, setQuantity] = useState(1);
  const [selectedRating, setSelectedRating] = useState(0);
  const [comment, setComment] = useState("");

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const session = useSession();

  const token = session?.data?.user?.accessToken;
  const router = useRouter();
  const queryclient = useQueryClient();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const {
    data: productData,
    isLoading: isLoadingProductData,
    error: errorProduct,
  } = useQuery({
    queryKey: ["review", productName],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products/${productName}`
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch product details");
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 5,
  });

  const product = productData?.data;

  const submitReviewMutation = useMutation({
    mutationFn: async ({
      productId,
      rating,
      comment,
    }: { productId: string, rating: number, comment: string }) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/reviews/${productId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ rating, comment }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit review");
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success("Review submitted successfully!");
      setComment("");
      setSelectedRating(0);
      queryclient.invalidateQueries({ queryKey: ["product", productName] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });

  if (isLoadingProductData) {
    return (
      <div className="flex justify-center items-center h-[90vh]">
        Loading product details...
      </div>
    );
  }

  if (errorProduct) {
    return <div>Error loading product details: {errorProduct.message}</div>;
  }

  const handleAddToCart = async () => {
    if (!token) {
      toast.error("Please login to continue");
      const fullPath = `${pathname}?${searchParams.toString()}`;
      router.push(`/login?callbackUrl=${encodeURIComponent(fullPath)}`);
      return;
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/cart/addtocart`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: product._id,
          quantity: quantity,
        }),
      }
    );
    if (!res.ok) return toast.error("Something went wrong");
    const data = await res.json();
    toast.success(data.message);
    queryclient.invalidateQueries({ queryKey: ["cartData", token] });
  };

  return (
    <section className="py-4 sm:py-5 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 lg:gap-8">
          <div className="space-y-2 sm:space-y-4">
            <div className="rounded-md bg-muted">
              <Image
                src={product?.images[selectedImageIndex] || "/placeholder.svg"}
                alt={product?.title}
                width={1000}
                height={1000}
                className="w-full aspect-video rounded-md object-cover"
              />
            </div>
            <ProductImageGallery
              images={product?.images}
              selectedIndex={selectedImageIndex}
              onSelect={setSelectedImageIndex}
            />
          </div>

          <div className="mt-3 md:mt-0">
            <div className="border-l border-[#727272] pl-3 sm:pl-5">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                {product.title}
              </h1>

              <div className="flex flex-wrap items-center mt-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <span className="ml-2 text-primary text-sm sm:text-base">
                  45 Reviews
                </span>
                <div className="mx-2 sm:mx-4 h-4 border-l border-primary"></div>
                <span className="text-primary text-sm sm:text-base">
                  Sold: {product.sold}+
                </span>
              </div>

              <div className="flex items-center mt-2">
                <Truck className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-gray-700" />
                <span className="text-sm sm:text-base text-gray-700">
                  Free delivery from ৳ 2000
                </span>
              </div>

              <div className="mt-3 sm:mt-4 flex items-baseline">
                <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                  ৳{" "}
                  {product.discount && product.discount > 0
                    ? (product.price * (1 - product.discount / 100)).toFixed(2)
                    : product.price}
                </span>
                <span className="ml-2 text-lg sm:text-xl text-gray-500 line-through">
                  ৳ {product.price}
                </span>
              </div>

              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600">
                {product.description}
              </p>

              <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
                <div className="flex items-center border border-primary rounded-md">
                  <button
                    className="p-1.5 sm:p-2 text-primary cursor-pointer disabled:opacity-50"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    onChange={(e) => {
                      const value = Number.parseInt(e.target.value);
                      if (!isNaN(value) && value >= 1) {
                        setQuantity(value);
                      }
                    }}
                    className="w-10 sm:w-12 text-center border-x border-primary text-sm sm:text-base"
                  />
                  <button
                    className="p-1.5 sm:p-2 text-primary cursor-pointer"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-3 sm:gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="px-4 sm:px-6 py-1.5 sm:py-2 border border-primary rounded-md text-gray-800 text-sm sm:text-base font-medium hover:bg-gray-50 cursor-pointer"
                  >
                    ADD TO CART
                  </button>

                  <Link
                    href={`/checkout?productName=${product.title}&quantity=${quantity}`}
                  >
                    <button className="px-4 sm:px-6 py-1.5 sm:py-2 bg-primary text-white rounded-md text-sm sm:text-base font-medium hover:bg-primary/90 cursor-pointer">
                      BUY NOW
                    </button>
                  </Link>

                  {/* Review Dialog */}
                  <Dialog>
                    <form>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="bg-primary h-10 text-base cursor-pointer text-white"
                        >
                          Add a Review
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="sm:max-w-lg bg-white">
                        <DialogHeader>
                          <DialogTitle>Leave a Review</DialogTitle>
                          <DialogDescription>
                            Share your experience with this product. Your
                            feedback helps us improve.
                          </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="rating">Rating</Label>
                            <div className="flex items-center gap-1" id="rating">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  className={`text-2xl ${star <= selectedRating
                                    ? "text-yellow-500"
                                    : "text-gray-300"
                                    }`}
                                  onClick={() => setSelectedRating(star)}
                                >
                                  <Star className="h-8 w-8" />
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="grid gap-2">
                            <Label htmlFor="comment">Your Comment</Label>
                            <Textarea
                              id="comment"
                              name="comment"
                              placeholder="Write your review here..."
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              className="min-h-24"
                            />
                          </div>
                        </div>

                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button
                            type="submit"
                            className="text-white"
                            onClick={(e) => {
                              e.preventDefault();
                              if (!token) {
                                toast.error("You need to login to submit a review");
                                return;
                              }
                              if (!selectedRating || !comment.trim()) {
                                toast.error("Rating and comment are required.");
                                return;
                              }
                              submitReviewMutation.mutate({
                                productId: product._id,
                                rating: selectedRating,
                                comment: comment,
                              });
                            }}
                          >
                            Submit Review
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </form>
                  </Dialog>
                </div>
              </div>

              <div className="mt-4 sm:mt-6 border-t border-primary pt-3 sm:pt-4">
                <div className="flex">
                  <span className="text-primary w-20 sm:w-28 text-sm sm:text-base">
                    Sku:
                  </span>
                  <span className="text-gray-800 text-sm sm:text-base">
                    0124
                  </span>
                </div>
                <div className="flex mt-1">
                  <span className="text-primary w-20 sm:w-28 text-sm sm:text-base">
                    Category:
                  </span>
                  <span className="text-gray-800 text-sm sm:text-base">
                    {product.category.title}
                  </span>
                </div>
                <div className="flex mt-1">
                  <span className="text-primary w-20 sm:w-28 text-sm sm:text-base">
                    Tag:
                  </span>
                  <span className="text-gray-800 text-sm sm:text-base">Sofa</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <FeaturesTable specs={product.specs} isLoading={isLoadingProductData} />
        </div>

        <div className="mt-20">
          <RelatedProducts
            category={product.category.title}
            productId={product._id}
          />
        </div>
      </div>
    </section>
  );
}
