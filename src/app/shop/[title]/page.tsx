import ProductDetails from '@/components/shop/product-details/product-details';

export default async function Page({ params }: { params: Promise<{ title: string }> }) {
    const resolvedParams = await params; // Await the params Promise
    return (
        <div>
            <ProductDetails productName={resolvedParams.title} />
        </div>
    );
}