import { prisma } from "@/lib/prisma";
import EditProductForm from "@/components/admin/EditProductForm";
import { notFound } from "next/navigation";

export default async function EditProductPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });

  if (!product) {
    notFound();
  }

  return (
    <EditProductForm
      product={{
        ...product,
        price: product.price.toNumber(),
        compareAtPrice: product.compareAtPrice
          ? product.compareAtPrice.toNumber()
          : null,
        brand: product.brand || null,
        model: product.model || null,
        slug: product.slug || null,
        metaTitle: product.metaTitle || null,
        metaDescription: product.metaDescription || null,
      }}
    />
  );
}
