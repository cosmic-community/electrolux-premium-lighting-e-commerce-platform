'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Product } from '@/types'
import { Star, Eye, ShoppingCart } from 'lucide-react'

interface FeaturedProductsProps {
  products: Product[]
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No featured products available</p>
      </div>
    )
  }

  const formatPrice = (price: number, comparePrice?: number) => {
    const formattedPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)

    const formattedComparePrice = comparePrice && comparePrice > price 
      ? new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(comparePrice)
      : null

    return { formattedPrice, formattedComparePrice }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => {
        const { formattedPrice, formattedComparePrice } = formatPrice(
          product.metadata.price, 
          product.metadata.compare_price
        )
        
        const isHovered = hoveredProduct === product.id
        const mainImage = product.metadata.main_image
        const category = product.metadata.category
        const stockStatus = product.metadata.stock_status

        return (
          <div
            key={product.id}
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            {/* Featured Badge */}
            {product.metadata.featured && (
              <div className="absolute top-4 left-4 z-10">
                <div className="bg-secondary-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  Featured
                </div>
              </div>
            )}

            {/* Stock Status Badge */}
            {stockStatus && stockStatus.value !== 'In Stock' && (
              <div className="absolute top-4 right-4 z-10">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  stockStatus.value === 'Low Stock' 
                    ? 'bg-yellow-100 text-yellow-800'
                    : stockStatus.value === 'Out of Stock'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {stockStatus.value}
                </div>
              </div>
            )}

            {/* Product Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
              {mainImage && (
                <img
                  src={`${mainImage.imgix_url}?w=600&h=450&fit=crop&auto=format,compress`}
                  alt={product.metadata.name}
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    isHovered ? 'scale-110' : 'scale-100'
                  }`}
                />
              )}
              
              {/* Overlay Actions */}
              <div className={`absolute inset-0 bg-black/60 flex items-center justify-center space-x-4 transition-opacity duration-300 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}>
                <Link
                  href={`/products/${product.slug}`}
                  className="p-3 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors duration-200"
                >
                  <Eye className="w-5 h-5" />
                </Link>
                <button className="p-3 bg-secondary-500 text-white rounded-full hover:bg-secondary-600 transition-colors duration-200">
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-6">
              {/* Category */}
              {category && (
                <Link
                  href={`/categories/${category.slug}`}
                  className="inline-block text-secondary-600 text-sm font-medium mb-2 hover:text-secondary-700 transition-colors duration-200"
                >
                  {category.metadata.name}
                </Link>
              )}

              {/* Product Name */}
              <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                <Link 
                  href={`/products/${product.slug}`}
                  className="hover:text-primary transition-colors duration-200"
                >
                  {product.metadata.name}
                </Link>
              </h3>

              {/* Short Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {product.metadata.short_description}
              </p>

              {/* Technical Specs */}
              <div className="flex items-center space-x-4 text-xs text-gray-500 mb-4">
                {product.metadata.wattage && (
                  <span>{product.metadata.wattage}W</span>
                )}
                {product.metadata.lumens && (
                  <span>{product.metadata.lumens} Lumens</span>
                )}
                {product.metadata.dimmable && (
                  <span>Dimmable</span>
                )}
              </div>

              {/* Price */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {formattedPrice}
                  </span>
                  {formattedComparePrice && (
                    <span className="text-lg text-gray-500 line-through">
                      {formattedComparePrice}
                    </span>
                  )}
                </div>
                
                {/* Add to Cart Button */}
                <button className="btn-primary">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}