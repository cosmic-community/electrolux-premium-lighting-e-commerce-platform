# ElectroLux - Premium Lighting E-Commerce Platform

![App Preview](https://imgix.cosmicjs.com/f449d2b0-96d3-11f0-bba7-d56988718db7-photo-1524634126442-357e0eac3c14-1758449748934.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, responsive e-commerce platform for premium lighting solutions, featuring advanced product catalogs, 3D scroll effects, and seamless Cosmic CMS integration.

## ✨ Features

- **Modern Product Catalog** - Browse lighting solutions with advanced filtering and search
- **3D Scroll Animations** - Smooth parallax effects and reveal animations
- **Category Management** - Organized by Residential, Commercial, Industrial, and Specialty lighting
- **Product Detail Pages** - Rich product information with galleries and specifications
- **Application Showcase** - Dedicated sections for different lighting applications
- **Responsive Design** - Mobile-first approach for all screen sizes
- **Performance Optimized** - Fast loading with image optimization and caching
- **TypeScript Ready** - Full type safety with comprehensive interfaces
- **SEO Optimized** - Proper meta tags and structured data

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68cfce3bd7c81076a7d6c03b&clone_repository=68cfd234d7c81076a7d6c052)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Design a content model for an e-commerce store for various electrical lamps ,lights used in residentail area home,commercial area ,etc with modern Ui format and 3d strcututre UI on scroll effect"

### Code Generation Prompt

> "Based on the content model I created for "Design a content model for an e-commerce store for various electrical lamps ,lights used in residentail area home,commercial area ,etc with modern Ui format and 3d strcututre UI on scroll effect", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic CMS** - Headless content management
- **Framer Motion** - Smooth animations and transitions
- **React** - Component-based UI library

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with the provided content model

### Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd electrolux-lighting
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
# Copy the example file
cp .env.example .env.local

# Add your Cosmic credentials
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📡 Cosmic SDK Examples

### Fetching Products with Categories
```typescript
import { cosmic } from '@/lib/cosmic'

// Get all products with category information
const products = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Filter by category
const residentialProducts = await cosmic.objects
  .find({
    type: 'products',
    'metadata.category': categoryId
  })
  .depth(1)
```

### Category-based Filtering
```typescript
// Get products by category type
const commercialProducts = products.filter(product => 
  product.metadata?.category?.metadata?.category_type?.value === 'Commercial'
)

// Get featured products
const featuredProducts = products.filter(product => 
  product.metadata?.featured === true
)
```

## 🌐 Cosmic CMS Integration

This application integrates with your existing Cosmic content model:

- **Products** - Main product catalog with pricing, specifications, and images
- **Categories** - Lighting categories (Residential, Commercial, Industrial, etc.)
- **Applications** - Use cases and environments (Living Room, Office, etc.)

The app uses the Cosmic SDK to fetch content with proper relationships and depth parameters for efficient data loading.

## 📱 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Set environment variables in the Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify
1. Connect your repository to Netlify
2. Set build command: `bun run build`
3. Set environment variables in Netlify dashboard

### Environment Variables
Set these in your deployment platform:
- `COSMIC_BUCKET_SLUG` - Your Cosmic bucket slug
- `COSMIC_READ_KEY` - Your Cosmic read key
- `COSMIC_WRITE_KEY` - Your Cosmic write key (for any write operations)

<!-- README_END -->