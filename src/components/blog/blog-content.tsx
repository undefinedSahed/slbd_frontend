"use client";

import { useState } from "react";
import Image from "next/image";
import { CalendarIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { toast } from "sonner";

// Define types for our API response
interface BlogResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    _id: string;
    title: string;
    description: string;
    main_content: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

// Function to fetch blog data
const fetchBlog = async (title: string): Promise<BlogResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/blogs/${encodeURIComponent(
      title
    )}`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    toast.error(`API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  if (!data.success || !data.data) {
    toast.error("Blog not found");
  }

  return data;
};

export default function BlogContent({ title }: { title: string }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["blog", title],
    queryFn: () => fetchBlog(title),
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: 1,
  });

  if (isError) {
    console.error("Error fetching blog:", error);
    notFound();
  }

  if (isLoading || !data) {
    return <BlogLoadingContent />;
  }

  const blog = data?.data;

  return (
    <article className="space-y-8">
      {/* Blog Header */}
      <div className="space-y-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
          {blog?.title}
        </h1>

        <div className="flex items-center text-sm text-muted-foreground">
          <CalendarIcon className="mr-1 h-4 w-4" />
          <time dateTime={blog?.createdAt}>{new Date(blog?.createdAt).toDateString()}</time>
        </div>

        <p className="text-base sm:text-lg text-muted-foreground">
          {blog?.description}
        </p>
      </div>

      {/* Blog Image with loading state */}
      <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden bg-muted">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Skeleton className="w-full h-full" />
          </div>
        )}
        <Image
          src={blog?.image || "/placeholder.svg"}
          alt={blog?.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 1200px"
          className={`object-cover transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          priority
          quality={90}
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      {/* Blog Content */}
      <div className="prose prose-lg max-w-none text-justify sm:text-start">
        {blog?.main_content.split("\n\n").map((paragraph, index) => (
          <p key={index} className="mb-4 text-base sm:text-lg leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Back Button */}
      <div className="pt-6">
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 rounded-md text-white transition-colors hover:opacity-90 active:opacity-80"
          style={{ backgroundColor: "#16a34a" }}
        >
          ← Back to Home
        </Link>
      </div>
    </article>
  );
}

function BlogLoadingContent() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Skeleton className="h-10 sm:h-12 md:h-14 w-3/4" />
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-6 w-full" />
      </div>

      <Skeleton className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] rounded-lg" />

      <div className="space-y-4">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />
      </div>
    </div>
  );
}
