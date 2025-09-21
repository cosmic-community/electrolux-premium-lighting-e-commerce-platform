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
    description: product.metadata.short_description || product.metadata.description?.replace(/<[^>]*>/g, '').substring(0, 160),
    keywords: product.metadata.seo_keywords || `${product.metadata.name}, lighting, LED, electrical fixtures`,
    openGraph: {
      title: product.metadata.name,
      description: product.metadata.short_description || 'Premium lighting solution from ElectroLux',
      images: [
        {
          url: `${product.metadata.main_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`,
          width: 1200,
          height: 630,
          alt: product.metadata.name,
        },
      ],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProduct(slug)
  
  if (!product) {
    notFound()
  }

  return <ProductDetailPage product={product} />
}