'use client'

import Link from 'next/link'
import { Category } from '@/types'
import { ArrowRight } from 'lucide-react'

interface CategoryShowcaseProps {
  categories: Category[]
}

export default function CategoryShowcase({ categories }: CategoryShowcaseProps) {
  if (!categories || categories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No categories available</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category, index) => {
        const image = category.metadata.image
        const categoryType = category.metadata.category_type

        return (
          <div
            key={category.id}
            className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ${
              index === 0 ? 'md:col-span-2 md:row-span-2' : ''
            }`}
            style={{
              minHeight: index === 0 ? '400px' : '300px'
            }}
          >
            {/* Background Image */}
            {image && (
              <img
                src={`${image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
                alt={category.metadata.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

            {/* Content */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              {/* Category Type Badge */}
              {categoryType && (
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    categoryType.value === 'Residential' 
                      ? 'bg-green-500/20 text-green-300 border border-green-400/30'
                      : categoryType.value === 'Commercial'
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
                      : categoryType.value === 'Industrial'
                      ? 'bg-gray-500/20 text-gray-300 border border-gray-400/30'
                      : 'bg-purple-500/20 text-purple-300 border border-purple-400/30'
                  }`}>
                    {categoryType.value}
                  </span>
                </div>
              )}

              {/* Category Name */}
              <h3 className={`font-bold text-white mb-3 ${
                index === 0 ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'
              }`}>
                {category.metadata.name}
              </h3>

              {/* Description */}
              {category.metadata.description && (
                <p className={`text-gray-200 mb-6 leading-relaxed ${
                  index === 0 ? 'text-lg line-clamp-3' : 'text-sm line-clamp-2'
                }`}>
                  {category.metadata.description}
                </p>
              )}

              {/* View Category Link */}
              <Link
                href={`/categories/${category.slug}`}
                className="inline-flex items-center text-white font-medium group-hover:text-secondary-400 transition-colors duration-200"
              >
                <span className={index === 0 ? 'text-lg' : 'text-base'}>
                  Explore Collection
                </span>
                <ArrowRight className={`ml-2 group-hover:translate-x-1 transition-transform duration-200 ${
                  index === 0 ? 'w-6 h-6' : 'w-4 h-4'
                }`} />
              </Link>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 bg-secondary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        )
      })}
    </div>
  )
}