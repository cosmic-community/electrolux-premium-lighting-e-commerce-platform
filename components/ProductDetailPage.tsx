'use client'

import { Product } from '@/types'
import { ArrowLeft, Check, Minus, Plus, ShoppingCart, Star, Truck } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface ProductDetailPageProps {
  product: Product
}

export default function ProductDetailPage({ product }: ProductDetailPageProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const images = [
    product.metadata.main_image,
    ...(product.metadata.gallery || [])
  ]

  const isInStock = product.metadata.stock_status.key === 'in_stock'
  const hasDiscount = product.metadata.compare_price && product.metadata.compare_price > product.metadata.price
  const discountPercentage = hasDiscount 
    ? Math.round(((product.metadata.compare_price! - product.metadata.price) / product.metadata.compare_price!) * 100)
    : 0

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-secondary-600">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-secondary-600">Products</Link>
          {product.metadata.category && (
            <>
              <span>/</span>
              <Link 
                href={`/categories/${product.metadata.category.slug}`}
                className="hover:text-secondary-600"
              >
                {product.metadata.category.metadata.name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-gray-900">{product.metadata.name}</span>
        </nav>

        {/* Back Button */}
        <Link
          href="/products"
          className="inline-flex items-center text-gray-600 hover:text-secondary-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
              <img
                src={`${images[selectedImage]?.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
                alt={product.metadata.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-secondary-500 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={`${image?.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                      alt={`${product.metadata.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category & Featured Badge */}
            <div className="flex items-center gap-3">
              {product.metadata.category && (
                <Link
                  href={`/categories/${product.metadata.category.slug}`}
                  className="text-sm text-secondary-600 hover:text-secondary-700 font-medium"
                >
                  {product.metadata.category.metadata.name}
                </Link>
              )}
              {product.metadata.featured && (
                <span className="bg-secondary-100 text-secondary-800 text-xs font-medium px-2 py-1 rounded-full">
                  Featured
                </span>
              )}
            </div>

            {/* Title & Description */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {product.metadata.name}
              </h1>
              <p className="text-lg text-gray-600">
                {product.metadata.short_description}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-gray-900">
                ${product.metadata.price.toFixed(2)}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    ${product.metadata.compare_price!.toFixed(2)}
                  </span>
                  <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded">
                    -{discountPercentage}%
                  </span>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${
                isInStock ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
              <span className={`font-medium ${
                isInStock ? 'text-green-700' : 'text-red-700'
              }`}>
                {product.metadata.stock_status.value}
              </span>
            </div>

            {/* Key Features */}
            <div className="bg-gray-100 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {product.metadata.wattage && (
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>{product.metadata.wattage}W Power</span>
                  </div>
                )}
                {product.metadata.lumens && (
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>{product.metadata.lumens} Lumens</span>
                  </div>
                )}
                {product.metadata.color_temp && (
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>{product.metadata.color_temp.value}</span>
                  </div>
                )}
                {product.metadata.dimmable && (
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Dimmable</span>
                  </div>
                )}
                {product.metadata.ip_rating && (
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>{product.metadata.ip_rating} Rated</span>
                  </div>
                )}
                {product.metadata.dimensions && (
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>{product.metadata.dimensions}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            {isInStock && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="font-medium text-gray-700">Quantity:</label>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 min-w-[3rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <button className="w-full bg-secondary-600 text-white py-3 px-6 rounded-xl font-medium hover:bg-secondary-700 transition-colors flex items-center justify-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart - ${(product.metadata.price * quantity).toFixed(2)}
                </button>
              </div>
            )}

            {/* Shipping Info */}
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
              <Truck className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-900">Free shipping on orders over $500</p>
                <p className="text-blue-700">Standard delivery: 5-7 business days</p>
              </div>
            </div>

            {/* SKU */}
            <div className="text-sm text-gray-500">
              <span className="font-medium">SKU:</span> {product.metadata.sku}
            </div>
          </div>
        </div>

        {/* Product Description */}
        {product.metadata.description && (
          <div className="mt-16">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Product Details
              </h2>
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: product.metadata.description }}
              />
            </div>
          </div>
        )}

        {/* Technical Specifications */}
        <div className="mt-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Specifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.metadata.wattage && (
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-700">Wattage</span>
                  <span className="text-gray-900">{product.metadata.wattage}W</span>
                </div>
              )}
              {product.metadata.lumens && (
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-700">Luminous Output</span>
                  <span className="text-gray-900">{product.metadata.lumens} lumens</span>
                </div>
              )}
              {product.metadata.color_temp && (
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-700">Color Temperature</span>
                  <span className="text-gray-900">{product.metadata.color_temp.value}</span>
                </div>
              )}
              {product.metadata.light_type && (
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-700">Light Type</span>
                  <span className="text-gray-900">{product.metadata.light_type.value}</span>
                </div>
              )}
              {product.metadata.ip_rating && (
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-700">IP Rating</span>
                  <span className="text-gray-900">{product.metadata.ip_rating}</span>
                </div>
              )}
              {product.metadata.dimensions && (
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-700">Dimensions</span>
                  <span className="text-gray-900">{product.metadata.dimensions}</span>
                </div>
              )}
              {product.metadata.material && (
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-700">Material</span>
                  <span className="text-gray-900">{product.metadata.material}</span>
                </div>
              )}
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium text-gray-700">Dimmable</span>
                <span className="text-gray-900">{product.metadata.dimmable ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}