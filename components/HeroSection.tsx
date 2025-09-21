'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const heroSlides = [
    {
      title: "Illuminate Your World",
      subtitle: "Premium Lighting Solutions",
      description: "Discover our comprehensive range of residential, commercial, and industrial lighting fixtures designed to transform any space.",
      image: "https://imgix.cosmicjs.com/f449d2b0-96d3-11f0-bba7-d56988718db7-photo-1524634126442-357e0eac3c14-1758449748934.jpg?w=1920&h=1080&fit=crop&auto=format,compress",
      cta: "Explore Products",
      ctaLink: "/products"
    },
    {
      title: "Modern LED Technology",
      subtitle: "Energy Efficient Solutions",
      description: "Experience the future of lighting with our advanced LED systems that combine stunning design with exceptional energy efficiency.",
      image: "https://imgix.cosmicjs.com/f48b4880-96d3-11f0-bba7-d56988718db7-photo-1497366216548-37526070297c-1758449749140.jpg?w=1920&h=1080&fit=crop&auto=format,compress",
      cta: "Shop LED Systems",
      ctaLink: "/categories/commercial-led-systems"
    },
    {
      title: "Elegant Chandeliers",
      subtitle: "Luxury for Your Home",
      description: "Transform your living spaces with our exquisite collection of crystal chandeliers and pendant lights that make a statement.",
      image: "https://imgix.cosmicjs.com/f4405cd0-96d3-11f0-bba7-d56988718db7-photo-1558618666-fcd25c85cd64-1758449748762.jpg?w=1920&h=1080&fit=crop&auto=format,compress",
      cta: "Browse Chandeliers",
      ctaLink: "/categories/residential-ceiling-lights"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    
    return () => clearInterval(timer)
  }, [heroSlides.length])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <div className="animate-fade-in">
          <p className="text-secondary-400 font-medium text-lg mb-4 tracking-wide">
            {heroSlides[currentSlide].subtitle}
          </p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-shadow-lg">
            {heroSlides[currentSlide].title}
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-gray-200 leading-relaxed max-w-3xl mx-auto">
            {heroSlides[currentSlide].description}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href={heroSlides[currentSlide].ctaLink}
              className="inline-flex items-center px-8 py-4 bg-secondary-500 text-white font-semibold rounded-lg hover:bg-secondary-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              {heroSlides[currentSlide].cta}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            
            <button className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/30 transition-all duration-200 border border-white/30">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </button>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide 
                ? 'bg-secondary-500 scale-110' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 text-white/70 animate-bounce">
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2">Scroll</span>
          <div className="w-px h-8 bg-white/70"></div>
        </div>
      </div>
    </section>
  )
}