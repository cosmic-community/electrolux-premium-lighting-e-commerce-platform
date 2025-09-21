import Link from 'next/link'
import { ArrowRight, Lightbulb, Zap, Shield } from 'lucide-react'

export default function CallToAction() {
  const features = [
    {
      icon: Lightbulb,
      title: 'Premium Quality',
      description: 'Hand-selected lighting fixtures from top manufacturers'
    },
    {
      icon: Zap,
      title: 'Energy Efficient',
      description: 'LED technology that saves up to 80% on energy costs'
    },
    {
      icon: Shield,
      title: 'Warranty Protected',
      description: 'Comprehensive warranty coverage on all products'
    }
  ]

  return (
    <section className="section-padding bg-gradient-to-br from-primary-900 via-primary-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-pattern"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover thousands of premium lighting solutions designed to illuminate 
            your world with style, efficiency, and elegance.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div key={feature.title} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary-500 rounded-full mb-6 group-hover:scale-110 transition-transform duration-200">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            )
          })}
        </div>

        {/* CTA Buttons */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/products"
              className="inline-flex items-center px-8 py-4 bg-secondary-500 text-white font-semibold rounded-lg hover:bg-secondary-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Shop All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            
            <Link
              href="/categories"
              className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-200 border border-white/20"
            >
              Browse Categories
            </Link>
          </div>

          <p className="text-gray-400 mt-8 text-lg">
            Join thousands of satisfied customers who have transformed their spaces with ElectroLux
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"></div>
    </section>
  )
}