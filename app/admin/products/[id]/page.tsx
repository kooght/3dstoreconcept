import { prisma } from '@/lib/prisma';
import EditProductForm from '@/components/admin/EditProductForm';
import { notFound } from 'next/navigation';

export default async function EditProductPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const product = await prisma.product.findUnique({
        where: { id: params.id },
    });

    if (!product) {
        notFound();
    }

    return <EditProductForm product={{
        ...product,
        price: product.price.toNumber(),
        // @ts-expect-error Prisma Client is outdated but schema has this field
        compareAtPrice: product.compareAtPrice ? product.compareAtPrice.toNumber() : null,
        brand: (product as any).brand || null,
        model: (product as any).model || null,
        slug: (product as any).slug || null,
        metaTitle: (product as any).metaTitle || null,
        metaDescription: (product as any).metaDescription || null,
    }} />;
}
