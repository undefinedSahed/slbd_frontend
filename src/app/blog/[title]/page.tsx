import { Suspense } from "react"
import BlogContent from "@/components/blog/blog-content"
import { Loader2 } from "lucide-react"

export default async function BlogPage({ params }: { params: Promise<{ title: string }> }) {

    const resolvedParams = await params;

    return (
        <div className="container max-w-6xl mx-auto px-4 py-8">
            <Suspense fallback={<Loader2 />}>
                <BlogContent title={resolvedParams.title} />
            </Suspense>
        </div>
    )
}
