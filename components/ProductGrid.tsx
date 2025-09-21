import Link from 'next/link'
import { Product } from '@/types'
import { Star, Eye } from 'lucide-react'

interface ProductGridProps {
  products: Product[]
  columns?: 2 | 3 | 4
  showQuickView?: boolean
}

export default function ProductGrid({ 
  products, 
  columns = 4, 
  showQuickView = false 
}: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No products available</p>
      </div>
    )
  }

  const gridClass = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  }[columns]

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
    <div className={`grid ${gridClass} gap-6`}>
      {products.map((product) => {
        const { formattedPrice, formattedComparePrice } = formatPrice(
          product.metadata.price, 
          product.metadata.compare_price
        )
        
        const mainImage = product.metadata.main_image
        const category = product.metadata.category
        const stockStatus = product.metadata.stock_status

        return (
          <div
            key={product.id}
            className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            {/* Product Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
              {mainImage && (
                <Link href={`/products/${product.slug}`}>
                  <img
                    src={`${mainImage.imgix_url}?w=400&h=300&fit=crop&auto=format,compress`}
                    alt={product.metadata.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
              )}
              
              {/* Product Badges */}
              <div className="absolute top-3 left-3 flex flex-col space-y-2">
                {product.metadata.featured && (
                  <div className="bg-secondary-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    Featured
                  </div>
                )}
                
                {stockStatus && stockStatus.value !== 'In Stock' && (
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    stockStatus.value === 'Low Stock' 
                      ? 'bg-yellow-100 text-yellow-800'
                      : stockStatus.value === 'Out of Stock'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {stockStatus.value}
                  </div>
                )}
              </div>

              {/* Quick View Button */}
              {showQuickView && (
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button className="p-2 bg-white/90 backdrop-blur-sm text-gray-900 rounded-full hover:bg-white transition-colors duration-200">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-4">
              {/* Category */}
              {category && (
                <Link
                  href={`/categories/${category.slug}`}
                  className="inline-block text-secondary-600 text-xs font-medium mb-2 hover:text-secondary-700 transition-colors duration-200 uppercase tracking-wide"
                >
                  {category.metadata.name}
                </Link>
              )}

              {/* Product Name */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                <Link 
                  href={`/products/${product.slug}`}
                  className="hover:text-primary transition-colors duration-200"
                >
                  {product.metadata.name}
                </Link>
              </h3>

              {/* Technical Specs */}
              <div className="flex items-center space-x-3 text-xs text-gray-500 mb-3">
                {product.metadata.wattage && (
                  <span>{product.metadata.wattage}W</span>
                )}
                {product.metadata.lumens && (
                  <span>{product.metadata.lumens} Lumens</span>
                )}
                {product.metadata.dimmable && (
                  <span className="px-2 py-1 bg-gray-100 rounded">Dimmable</span>
                )}
              </div>

              {/* Price */}
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-xl font-bold text-gray-900">
                  {formattedPrice}
                </span>
                {formattedComparePrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {formattedComparePrice}
                  </span>
                )}
              </div>

              {/* Action Button */}
              <button className="w-full btn-primary text-sm py-2">
                Add to Cart
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}