'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { writeFile } from 'fs/promises';
import { join } from 'path';

async function saveImages(formData: FormData): Promise<string[]> {
    const files = formData.getAll('images') as File[];
    const imageUrls: string[] = [];

    for (const file of files) {
        if (file && file.size > 0 && file.name !== 'undefined') {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // Save to public/products
            const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
            const path = join(process.cwd(), 'public', 'products', fileName);

            await writeFile(path, buffer);
            imageUrls.push(`/products/${fileName}`);
        }
    }

    // Backward compatibility
    const singleFile = formData.get('image') as File;
    if (singleFile && singleFile.size > 0 && singleFile.name !== 'undefined') {
        const bytes = await singleFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const fileName = `${Date.now()}-${singleFile.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
        const path = join(process.cwd(), 'public', 'products', fileName);
        await writeFile(path, buffer);
        imageUrls.push(`/products/${fileName}`);
    }

    return imageUrls;
}

const parseNullableFloat = (val: string | null) => {
    if (!val) return null;
    const f = parseFloat(val);
    return isNaN(f) ? null : f;
}

const emptyToNull = (val: string | null) => {
    return (!val || val.trim() === '') ? null : val;
}

export async function createProduct(formData: FormData) {
    const title = formData.get('title') as string;
    const description = emptyToNull(formData.get('description') as string);
    const price = parseFloat(formData.get('price') as string);
    const compareAtPrice = parseNullableFloat(formData.get('compareAtPrice') as string);
    const stock = parseInt(formData.get('stock') as string) || 0;
    const status = formData.get('status') as string || 'DRAFT';
    const brand = emptyToNull(formData.get('brand') as string);
    const model = emptyToNull(formData.get('model') as string);
    const slug = emptyToNull(formData.get('slug') as string);
    const metaTitle = emptyToNull(formData.get('metaTitle') as string);
    const metaDescription = emptyToNull(formData.get('metaDescription') as string);

    const newImages = await saveImages(formData);
    // If no images uploaded, use placeholder
    if (newImages.length === 0) {
        newImages.push("/placeholder-product.jpg");
    }

    await prisma.product.create({
        data: {
            title,
            description,
            price,
            // @ts-ignore
            compareAtPrice,
            stock,
            status,
            // @ts-ignore
            brand,
            // @ts-ignore
            model,
            // @ts-ignore
            slug: slug || undefined,
            // @ts-ignore
            metaTitle,
            // @ts-ignore
            metaDescription,
            images: JSON.stringify(newImages),
        },
    });

    revalidatePath('/admin/products');
    redirect('/admin/products');
}

export async function updateProduct(id: string, formData: FormData) {
    const title = formData.get('title') as string;
    const description = emptyToNull(formData.get('description') as string);
    const price = parseFloat(formData.get('price') as string);
    const compareAtPrice = parseNullableFloat(formData.get('compareAtPrice') as string);
    const stock = parseInt(formData.get('stock') as string) || 0;
    const status = formData.get('status') as string || 'DRAFT';
    const brand = emptyToNull(formData.get('brand') as string);
    const model = emptyToNull(formData.get('model') as string);
    const slug = emptyToNull(formData.get('slug') as string);
    const metaTitle = emptyToNull(formData.get('metaTitle') as string);
    const metaDescription = emptyToNull(formData.get('metaDescription') as string);

    // Get new images
    const newImages = await saveImages(formData);

    // Get existing product to merge images if needed, or replace. 
    // Ideally we should have a way to keep existing images.
    // For now, let's just FETCH the current product images and Append the new ones.
    const existingProduct = await prisma.product.findUnique({ where: { id } });
    let currentImages: string[] = [];
    if (existingProduct?.images) {
        try {
            currentImages = JSON.parse(existingProduct.images);
        } catch (e) { }
    }

    // Merge: existing + new
    const finalImages = [...currentImages, ...newImages];

    await prisma.product.update({
        where: { id },
        data: {
            title,
            description,
            price,
            // @ts-ignore
            compareAtPrice,
            stock,
            status,
            // @ts-ignore
            brand,
            // @ts-ignore
            model,
            // @ts-ignore
            slug: slug || null,
            // @ts-ignore
            metaTitle,
            // @ts-ignore
            metaDescription,
            images: JSON.stringify(finalImages),
        },
    });

    revalidatePath('/admin/products');
    revalidatePath(`/admin/products/${id}`);
    redirect('/admin/products');
}
