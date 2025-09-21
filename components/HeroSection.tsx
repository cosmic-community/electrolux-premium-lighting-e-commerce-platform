'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Zap, Shield, Award, Lightbulb } from 'lucide-react'

const heroSlides = [
  {
    id: 1,
    title: 'Illuminate Your World',
    subtitle: 'Premium LED Solutions',
    description: 'Transform any space with our cutting-edge lighting technology. Energy-efficient, long-lasting, and beautifully designed.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=2000&auto=format,compress',
    cta: 'Shop Now',
    ctaLink: '/products',
    features: ['Energy Efficient', '50,000+ Hour Lifespan', 'Smart Controls']
  },
  {
    id: 2,
    title: 'Commercial Excellence',
    subtitle: 'Professional Lighting Systems',
    description: 'Enhance productivity and create impressive environments with our commercial-grade lighting solutions.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=2000&auto=format,compress',
    cta: 'Explore Commercial',
    ctaLink: '/categories/commercial-led-systems',
    features: ['DLC Certified', '0-10V Dimming', 'Easy Installation']
  },
  {
    id: 3,
    title: 'Residential Elegance',
    subtitle: 'Home Lighting Collection',
    description: 'Create the perfect ambiance in your home with our stylish and functional residential lighting fixtures.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=2000&auto=format,compress',
    cta: 'View Collection',
    ctaLink: '/categories/residential-ceiling-lights',
    features: ['Designer Styles', 'Warm Lighting', 'Easy Dimming']
  }
]

const stats = [
  { icon: Zap, value: '50,000+', label: 'Hour Lifespan', color: 'text-yellow-500' },
  { icon: Shield, value: '5 Year', label: 'Warranty', color: 'text-green-500' },
  { icon: Award, value: 'DLC', label: 'Certified', color: 'text-blue-500' },
  { icon: Lightbulb, value: '90%', label: 'Energy Savings', color: 'text-purple-500' },
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const currentHeroSlide = heroSlides[currentSlide]

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-900">
      {/* Background Images with smooth transitions */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 container-custom text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Subtitle */}
          {currentHeroSlide?.subtitle && (
            <p className="text-secondary-400 font-semibold text-lg md:text-xl mb-4 animate-fade-in">
              {currentHeroSlide.subtitle}
            </p>
          )}

          {/* Main Title */}
          {currentHeroSlide?.title && (
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight animate-slide-up">
              {currentHeroSlide.title}
            </h1>
          )}

          {/* Description */}
          {currentHeroSlide?.description && (
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto animate-fade-in-delay">
              {currentHeroSlide.description}
            </p>
          )}

          {/* Features */}
          {currentHeroSlide?.features && currentHeroSlide.features.length > 0 && (
            <div className="flex flex-wrap justify-center gap-6 mb-12 animate-fade-in-delay-2">
              {currentHeroSlide.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20"
                >
                  <div className="w-2 h-2 bg-secondary-400 rounded-full mr-3"></div>
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-slide-up-delay">
            {currentHeroSlide?.cta && currentHeroSlide?.ctaLink && (
              <Link
                href={currentHeroSlide.ctaLink}
                className="inline-flex items-center bg-secondary-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-secondary-700 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <span>{currentHeroSlide.cta}</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            )}
            
            <Link
              href="/categories"
              className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              Browse Categories
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in-delay-3">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <IconComponent className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-gray-300 text-sm md:text-base">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Slide Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-secondary-500 w-8'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Slide Navigation Arrows (Hidden on mobile) */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300"
      >
        <ArrowRight className="w-6 h-6 rotate-180" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300"
      >
        <ArrowRight className="w-6 h-6" />
      </button>
    </section>
  )
}