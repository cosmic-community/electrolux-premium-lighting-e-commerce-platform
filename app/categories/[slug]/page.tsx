// app/categories/[slug]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCategory, getCategories, getProductsByCategory } from '@/lib/cosmic'
import CategoryDetailPage from '@/components/CategoryDetailPage'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const categories = await getCategories()
  
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategory(slug)
  
  if (!category) {
    return {
      title: 'Category Not Found - ElectroLux',
    }
  }

  return {
    title: `${category.metadata.name} - ElectroLux`,
    description: category.metadata.description || `Explore our ${category.metadata.name.toLowerCase()} lighting solutions.`,
    keywords: `${category.metadata.name.toLowerCase()}, lighting, LED, electrical fixtures`,
    openGraph: {
      title: category.metadata.name,
      description: category.metadata.description || `Explore our ${category.metadata.name.toLowerCase()} lighting solutions.`,
      images: category.metadata.image ? [
        {
          url: `${category.metadata.image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`,
          width: 1200,
          height: 630,
          alt: category.metadata.name,
        },
      ] : [],
    },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const [category, products] = await Promise.all([
    getCategory(slug),
    getProductsByCategory(slug),
  ])
  
  if (!category) {
    notFound()
  }

  return (
    <CategoryDetailPage 
      category={category} 
      products={products}
    />
  )
}