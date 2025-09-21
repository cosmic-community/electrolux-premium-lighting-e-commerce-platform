import { Metadata } from 'next'
import { getCategories, getProducts } from '@/lib/cosmic'
import CategoryGrid from '@/components/CategoryGrid'
import { Category } from '@/types'

export const metadata: Metadata = {
  title: 'Categories - ElectroLux Lighting Solutions',
  description: 'Browse lighting categories including residential, commercial, industrial, and specialty lighting solutions.',
  keywords: 'lighting categories, residential lighting, commercial lighting, industrial lighting',
}

export default async function CategoriesPage() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ])

  // Count products per category
  const categoriesWithCounts = categories.map(category => {
    const productCount = products.filter(product => 
      product.metadata.category?.slug === category.slug
    ).length

    return {
      ...category,
      productCount
    }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Lighting Categories
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our comprehensive range of lighting solutions organized by type and application. 
              From residential elegance to commercial efficiency.
            </p>
          </div>
        </div>
      </div>
      
      <section className="section-padding">
        <div className="container-custom">
          <CategoryGrid categories={categoriesWithCounts} />
        </div>
      </section>
    </div>
  )
}