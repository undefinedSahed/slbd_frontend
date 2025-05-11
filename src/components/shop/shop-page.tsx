"use client";

import type React from "react";
import { useState, useEffect, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "../shared/product-card";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Pagination } from "./pagination";
import { CategoryType, ProductType } from "@/lib/types";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";


interface PriceRanges {
    id: number;
    range: string;
    text: string;
}

// Main component with Suspense boundary
export default function Products() {
    return (
        <Suspense fallback={<div className="py-12">Loading products...</div>}>
            <AllProducts />
        </Suspense>
    );
}

// Content component that contains the actual logic
function AllProducts() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const initialPage = parseInt(searchParams.get("page") || "1", 10);
    const limit = 9; // or whatever page size you want

    const [currentPage, setCurrentPage] = useState(initialPage);
    const [totalPages, setTotalPages] = useState(1);

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        params.set("page", currentPage.toString());

        router.replace(`?${params.toString()}`, { scroll: false });
    }, [currentPage, router]);



    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };


    const [selectedSortBy, setSelectedSortBy] = useState(
        searchParams.get("sortBy") || "default"
    );

    // Initialize state from URL params
    const [searchQuery, setSearchQuery] = useState(
        searchParams.get("search") || ""
    );
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(
        searchParams.get("search") || ""
    );
    const [selectedCategory, setSelectedCategory] = useState(
        searchParams.get("category") || ""
    );

    const [selectedPriceRange, setSelectedPriceRange] = useState(
        searchParams.get("price") || ""
    );

    // Update URL when filters change
    useEffect(() => {
        const params = new URLSearchParams();

        if (debouncedSearchQuery) params.set("searchTerm", debouncedSearchQuery);
        if (selectedCategory) params.set("category", selectedCategory);
        if (selectedPriceRange) params.set("price", selectedPriceRange);
        if (selectedSortBy && selectedSortBy !== "default")
            params.set("sortBy", selectedSortBy);

        router.replace(`?${params.toString()}`, { scroll: false });
    }, [
        debouncedSearchQuery,
        selectedCategory,
        selectedSortBy,
        selectedPriceRange,
        router
    ]);

    // Debounce search input
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 1500);

        return () => {
            clearTimeout(timerId);
        };
    }, [searchQuery]);

    // Close drawer when any filter is applied
    useEffect(() => {
        if (isDrawerOpen) {
            setIsDrawerOpen(true);
        }
    }, [
        debouncedSearchQuery,
        selectedCategory,
        selectedSortBy,
        selectedPriceRange,
        isDrawerOpen
    ]);

    // Fetch categories
    const {
        data: categories,
        isLoading: isCategoriesLoading,
        isError: isCategoriesError,
        error: categoriesError,
    } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
            const res = await fetch(`${baseUrl}/categories`);
            if (!res.ok)
                throw new Error(`Failed to fetch categories: ${res.statusText}`);
            return res.json();
        },
        select: (responseData) => responseData.data,
    });

    // Fetch auctions with all filters including time range

    const {
        data: filteredProductsResponse,
        isLoading: isProductsLoading,
        isError: isProductsError,
        error: productsError,
    } = useQuery({
        queryKey: [
            "products",
            debouncedSearchQuery,
            selectedCategory,
            currentPage,
            selectedSortBy,
            selectedPriceRange,
            limit
        ],
        queryFn: async () => {
            const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
            const queryParams = new URLSearchParams();

            // Add all filter parameters
            if (debouncedSearchQuery) queryParams.set("search", debouncedSearchQuery);
            if (selectedCategory) queryParams.set("category", selectedCategory);
            if (selectedPriceRange) queryParams.set("price", selectedPriceRange);
            if (selectedSortBy !== "default") {
                queryParams.set("sortBy", selectedSortBy);
            }

            // Always include pagination parameters
            queryParams.set("page", currentPage.toString());
            queryParams.set("limit", limit.toString());

            // Use the combined endpoint
            const url = `${baseUrl}/products?${queryParams.toString()}`;
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Failed to fetch auctions: ${res.statusText}`);
            return res.json();
        },
        staleTime: 1000 * 60 * 5
    });

    const filteredProducts = filteredProductsResponse?.data?.data ?? filteredProductsResponse?.data?.data ?? [];
    const totalCount = filteredProductsResponse?.data?.total ?? 0;

    useEffect(() => {
        if (filteredProductsResponse?.data?.totalPages) {
            setTotalPages(filteredProductsResponse?.data?.totalPages);
        }
    }, [filteredProductsResponse]);

    console.log("Filtered Products", filteredProducts)


    // Handlers
    const handleCategoryChange = (categoryName: string, isChecked: boolean) => {
        setSelectedCategory(isChecked ? categoryName : "");
        setIsDrawerOpen(false);
    };


    const handlePriceRangeChange = (priceRange: string, isChecked: boolean) => {
        setSelectedPriceRange(isChecked ? priceRange : "");
        setIsDrawerOpen(false);
    };



    const handleSortByChange = (value: string) => {
        setSelectedSortBy(value);
        setIsDrawerOpen(false);
    };


    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const clearFilters = () => {
        setSearchQuery("");
        setDebouncedSearchQuery("");
        setSelectedCategory("");
        setSelectedSortBy("default");
        setIsDrawerOpen(false);
        setSelectedPriceRange("");
        router.replace("", { scroll: false });
    };


    // useEffect(() => {
    //     setSelectedCategory("")
    //     setSelectedSortBy("default")
    // }, [router.refresh])

    const prices = [
        { id: 1, range: "0-500", text: "Up to 500" },
        { id: 2, range: "501-1000", text: "501 - 1000" },
        { id: 3, range: "1001-2000", text: "1001 - 2000" },
        { id: 4, range: "2001-3000", text: "2001 - 3000" },
        { id: 5, range: "3001-5000", text: "3001 - 5000" },
        { id: 6, range: "5001-10000", text: "5001 - 10000" },
        { id: 7, range: "10001-10000000", text: "Above 10000" },
    ]

    // Filter sidebar component
    const FilterSidebar = () => (
        <div className="flex flex-col gap-5 p-5 rounded-md bg-primary/20 overflow-y-auto h-screen lg:h-fit">
            {/* Sort By Filter */}
            <div>
                <h4 className="text-xl font-medium text-[#000000] pb-2">Sort By</h4>
                <Select value={selectedSortBy} onValueChange={handleSortByChange}>
                    <SelectTrigger className="w-full border-primary">
                        <SelectValue placeholder="Default" />
                    </SelectTrigger>
                    <SelectContent className="bg-primary text-white">
                        <SelectGroup>
                            <SelectItem value="default">Default</SelectItem>
                            <SelectItem value="shuffle">Shuffle</SelectItem>
                            <SelectItem value="popular">Popular</SelectItem>
                            <SelectItem value="price-low-to-high">Price: Low to High</SelectItem>
                            <SelectItem value="price-high-to-low">Price: High to Low</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            {/* Category List */}
            <div>
                <h4 className="text-xl font-medium text-[#000000] pb-4">Category</h4>
                {isCategoriesLoading ? (
                    <p className="text-primary">Loading categories...</p>
                ) : (
                    <ul className="space-y-3">
                        {categories?.map((category: CategoryType) => (
                            <li key={category._id} className="flex items-center gap-1">
                                <Checkbox
                                    id={`category-${category._id}`}
                                    checked={selectedCategory === category.title}
                                    onCheckedChange={(checked) =>
                                        handleCategoryChange(category.title, !!checked)
                                    }
                                />
                                <label
                                    htmlFor={`category-${category._id}`}
                                    className="text-base text-primary font-medium capitalize cursor-pointer"
                                >
                                    {category.title}
                                </label>
                            </li>
                        ))}
                    </ul>
                )}
            </div>


            {/* Pricing List */}
            <div>
                <h4 className="text-xl font-medium text-[#000000] pb-4">Price Range</h4>

                <ul className="space-y-3">
                    {prices?.map((priceRanges: PriceRanges) => (
                        <li key={priceRanges.id} className="flex items-center gap-1">
                            <Checkbox
                                id={`price-${priceRanges.id}`}
                                checked={selectedPriceRange === priceRanges.range}
                                onCheckedChange={(checked) =>
                                    handlePriceRangeChange(priceRanges.range, !!checked)
                                }
                            />
                            <label
                                htmlFor={`category-${priceRanges.id}`}
                                className="text-base text-primary font-medium capitalize cursor-pointer"
                            >
                                {priceRanges.text}
                            </label>
                        </li>
                    ))}
                </ul>

            </div>


            {/* Clear Filters Button */}
            <button
                onClick={clearFilters}
                className="w-full py-2 bg-primary text-white rounded-md cursor-pointer transition-colors"
            >
                Clear All Filters
            </button>
        </div>
    );

    // Loading state for auctions only (no skeleton for filters)
    if (isProductsLoading) {
        return (
            <section className="lg:py-28 py-20">
                <div className="text-center lg:pb-10 !pb-2">
                    <h2 className="text-[32px] md:text-[40px] text-primary font-bold">
                        All Products
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-10 gap-6 md:gap-10">
                    <div className="col-span-1 md:col-span-7">
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                            {[...Array(6)].map((_, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-200 animate-pulse h-64 rounded-md"
                                ></div>
                            ))}
                        </div>
                    </div>
                    <div className="hidden md:block md:col-span-3">
                        <FilterSidebar />
                    </div>
                </div>
            </section>
        );
    }

    // Error state
    if (isProductsError || isCategoriesError) {
        return (
            <section className="lg:py-28 py-20">
                <div className="text-center pb-10">
                    <h2 className="text-[32px] md:text-[40px] text-primary font-bold">
                        All Products
                    </h2>
                </div>
                <p className="text-red-500 text-center">
                    {isProductsError && isCategoriesError
                        ? `Error fetching auctions and categories: ${productsError?.message} / ${categoriesError?.message}`
                        : isProductsError
                            ? `Error fetching auctions: ${productsError?.message}`
                            : `Error fetching categories: ${categoriesError?.message}`}
                </p>
            </section>
        );
    }

    console.log("filteredProductsResponse", filteredProductsResponse);


    const hasActiveFilters =
        searchQuery !== "" ||
        selectedSortBy !== "default" ||
        selectedCategory !== "" ||
        selectedPriceRange !== "";

    return (
        <section className="lg:py-16 py-10">

            <div className="text-center lg:pb-0 pb-8 relative ">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 lg:hidden">
                    <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-primary relative"
                            >
                                <p className="py-1 mt-4 ml-6 px-4 rounded-md bg-primary text-white text-xs">
                                    Filter
                                </p>
                                {hasActiveFilters && (
                                    <span className="absolute top-2 -right-7 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                                        •
                                    </span>
                                )}
                                <span className="sr-only">Toggle filter menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="left"
                            className="w-[60%] sm:w-[350px] p-0 bg-transparent border-none"
                            onInteractOutside={() => setIsDrawerOpen(false)}
                            onEscapeKeyDown={() => setIsDrawerOpen(false)}
                        >
                            <div className="h-full">
                                <FilterSidebar />
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
                <h2 className="text-[32px] md:text-[40px] text-primary font-bold">
                    All Products
                </h2>
            </div>

            {/* Search bar */}
            <div className="lg:flex justify-end">
                <div className="">
                    <div className="relative mb-6 lg:w-[380px]">
                        <Input
                            onChange={handleSearchChange}
                            value={searchQuery}
                            className="text-primary border-primary pl-3 pr-10"
                            placeholder="Search by title, description..."
                        />
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 text-primary" />
                    </div>
                </div>
            </div>

            {/* Products */}
            <div className="grid grid-cols-1 lg:grid-cols-11 gap-6 lg:translate-y-[-20px]">
                <div className="col-span-1 lg:col-span-8">
                    {filteredProducts?.length === 0 ? (
                        <div className="text-center py-10">
                            <p className="text-lg text-primary">
                                No products found matching your criteria.
                            </p>
                            <button
                                onClick={clearFilters}
                                className="mt-4 px-4 py-2 bg-primary text-white rounded-md cursor-pointer transition-colors"
                            >
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        <div className="">
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                                {filteredProducts?.map((product: ProductType) => (
                                    <ProductCard
                                        key={product._id}
                                        thumbnail={product.thumbnail}
                                        title={product.title}
                                        price={product.price}
                                        discount={product.discount}
                                        sold={product.sold}
                                    />
                                ))}
                            </div>

                            <Pagination
                                limit={limit}
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                                totalCount={totalCount}
                            />
                        </div>
                    )}
                </div>

                <div className="hidden lg:block lg:col-span-3">
                    <FilterSidebar />
                </div>
            </div>
        </section>
    );
}