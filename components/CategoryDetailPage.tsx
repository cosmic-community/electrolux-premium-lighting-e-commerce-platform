'use client'

import { Category, Product } from '@/types'
import { ArrowLeft, Filter, Grid, List } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import ProductGrid from '@/components/ProductGrid'

interface CategoryDetailPageProps {
  category: Category
  products: Product[]
}

export default function CategoryDetailPage({ category, products }: CategoryDetailPageProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('featured')

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.metadata.name.localeCompare(b.metadata.name)
      case 'price-low':
        return a.metadata.price - b.metadata.price
      case 'price-high':
        return b.metadata.price - a.metadata.price
      case 'newest':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      case 'featured':
      default:
        if (a.metadata.featured && !b.metadata.featured) return -1
        if (!a.metadata.featured && b.metadata.featured) return 1
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        {category.metadata.image && (
          <img
            src={`${category.metadata.image.imgix_url}?w=1920&h=600&fit=crop&auto=format,compress`}
            alt={category.metadata.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        
        <div className="relative container-custom h-full flex items-center">
          <div className="text-white">
            <Link
              href="/categories"
              className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Categories
            </Link>
            
            <div className="mb-4">
              {category.metadata.category_type && (
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  category.metadata.category_type.value === 'Residential' 
                    ? 'bg-green-500/20 text-green-300 border border-green-400/30'
                    : category.metadata.category_type.value === 'Commercial'
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
                    : category.metadata.category_type.value === 'Industrial'
                    ? 'bg-gray-500/20 text-gray-300 border border-gray-400/30'
                    : 'bg-purple-500/20 text-purple-300 border border-purple-400/30'
                }`}>
                  {category.metadata.category_type.value}
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {category.metadata.name}
            </h1>
            
            {category.metadata.description && (
              <p className="text-xl text-gray-200 max-w-3xl">
                {category.metadata.description}
              </p>
            )}
            
            <p className="text-gray-300 mt-4">
              {products.length} {products.length === 1 ? 'product' : 'products'} available
            </p>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Controls */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-secondary-500 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-secondary-500 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
              
              <span className="text-gray-600">
                {products.length} {products.length === 1 ? 'result' : 'results'}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <label htmlFor="sort" className="text-gray-700 font-medium">
                Sort by:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-secondary-500"
              >
                <option value="featured">Featured</option>
                <option value="name">Name A-Z</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {sortedProducts.length > 0 ? (
            <ProductGrid products={sortedProducts} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No products found in this category.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center mt-4 text-secondary-600 hover:text-secondary-700 font-medium"
              >
                Browse all products
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}