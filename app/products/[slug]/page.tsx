// app/products/[slug]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProduct, getProducts } from '@/lib/cosmic'
import ProductDetailPage from '@/components/ProductDetailPage'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const products = await getProducts()
  
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)
  
  if (!product) {
    return {
      title: 'Product Not Found - ElectroLux',
    }
  }

  return {
    title: `${product.metadata.name} - ElectroLux`,
    description: product.metadata.short_description,
    keywords: product.metadata.seo_keywords || 'lighting, LED, electrical fixtures',
    openGraph: {
      title: product.metadata.name,
      description: product.metadata.short_description,
      images: [
        {
          url: `${product.metadata.main_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`,
          width: 1200,
          height: 630,
          alt: product.metadata.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.metadata.name,
      description: product.metadata.short_description,
      images: [`${product.metadata.main_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProduct(slug)
  
  if (!product) {
    notFound()
  }

  // Get related products from same category
  const allProducts = await getProducts()
  const relatedProducts = allProducts
    .filter(p => 
      p.id !== product.id && 
      p.metadata.category?.slug === product.metadata.category?.slug
    )
    .slice(0, 4)

  return (
    <ProductDetailPage 
      product={product} 
      relatedProducts={relatedProducts}
    />
  )
}