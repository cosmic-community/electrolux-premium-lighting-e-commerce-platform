import { getProducts, getCategories, getFeaturedProducts } from '@/lib/cosmic'
import HeroSection from '@/components/HeroSection'
import FeaturedProducts from '@/components/FeaturedProducts'
import CategoryShowcase from '@/components/CategoryShowcase'
import ProductGrid from '@/components/ProductGrid'
import CallToAction from '@/components/CallToAction'

export default async function HomePage() {
  // Fetch data in parallel
  const [featuredProducts, categories, allProducts] = await Promise.all([
    getFeaturedProducts(6),
    getCategories(),
    getProducts(),
  ])

  return (
    <div className="min-h-screen">
      <HeroSection />
      
      {featuredProducts.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="section-header">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Featured Lighting Solutions
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover our handpicked selection of premium lighting fixtures that combine 
                style, functionality, and energy efficiency.
              </p>
            </div>
            <FeaturedProducts products={featuredProducts} />
          </div>
        </section>
      )}

      {categories.length > 0 && (
        <section className="section-padding">
          <div className="container-custom">
            <div className="section-header">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Shop by Category
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explore our comprehensive range of lighting solutions designed for every space and application.
              </p>
            </div>
            <CategoryShowcase categories={categories} />
          </div>
        </section>
      )}

      {allProducts.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="section-header">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Latest Products
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Browse our newest lighting fixtures and discover innovative designs 
                that will transform your space.
              </p>
            </div>
            <ProductGrid products={allProducts.slice(0, 8)} />
          </div>
        </section>
      )}

      <CallToAction />
    </div>
  )
}