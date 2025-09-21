import { Metadata } from 'next'
import { getProducts, getCategories } from '@/lib/cosmic'
import ProductsPageClient from '@/components/ProductsPageClient'

export const metadata: Metadata = {
  title: 'Products - ElectroLux Lighting Solutions',
  description: 'Browse our complete collection of premium lighting solutions including chandeliers, LED systems, and specialty lighting for residential and commercial spaces.',
  keywords: 'lighting products, LED lights, chandeliers, commercial lighting, residential lighting',
}

export default async function ProductsPage() {
  // Fetch data in parallel
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Lighting Products
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our comprehensive collection of premium lighting solutions designed 
              to illuminate and enhance every space.
            </p>
          </div>
        </div>
      </div>
      
      <ProductsPageClient products={products} categories={categories} />
    </div>
  )
}