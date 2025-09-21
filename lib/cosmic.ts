import { createBucketClient } from '@cosmicjs/sdk'
import { Product, Category, Application, CosmicResponse } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Helper function for error handling
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Get all products with related data
export async function getProducts(): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'products' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    const products = (response.objects as Product[]).sort((a, b) => {
      // Sort featured products first, then by creation date
      if (a.metadata.featured && !b.metadata.featured) return -1;
      if (!a.metadata.featured && b.metadata.featured) return 1;
      
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return dateB - dateA; // Newest first
    });
    
    return products;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch products');
  }
}

// Get single product by slug
export async function getProduct(slug: string): Promise<Product | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'products',
        slug
      })
      .depth(1);
    
    const product = response.object as Product;
    
    if (!product || !product.metadata) {
      return null;
    }
    
    return product;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch product: ${slug}`);
  }
}

// Get featured products
export async function getFeaturedProducts(limit: number = 6): Promise<Product[]> {
  try {
    const products = await getProducts();
    return products
      .filter(product => product.metadata.featured === true)
      .slice(0, limit);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}

// Get products by category
export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  try {
    const products = await getProducts();
    return products.filter(product => 
      product.metadata.category?.slug === categorySlug
    );
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
}

// Get all categories
export async function getCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    const categories = (response.objects as Category[]).sort((a, b) => {
      const orderA = a.metadata.sort_order || 999;
      const orderB = b.metadata.sort_order || 999;
      return orderA - orderB;
    });
    
    return categories;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch categories');
  }
}

// Get single category by slug
export async function getCategory(slug: string): Promise<Category | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'categories',
        slug
      })
      .depth(1);
    
    const category = response.object as Category;
    
    if (!category || !category.metadata) {
      return null;
    }
    
    return category;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch category: ${slug}`);
  }
}

// Get all applications
export async function getApplications(): Promise<Application[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'applications' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Application[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch applications');
  }
}

// Get single application by slug
export async function getApplication(slug: string): Promise<Application | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'applications',
        slug
      })
      .depth(1);
    
    const application = response.object as Application;
    
    if (!application || !application.metadata) {
      return null;
    }
    
    return application;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch application: ${slug}`);
  }
}

// Search products
export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const products = await getProducts();
    
    if (!query.trim()) {
      return products;
    }
    
    const searchTerm = query.toLowerCase();
    
    return products.filter(product => {
      const searchableText = [
        product.title,
        product.metadata.name,
        product.metadata.short_description,
        product.metadata.description || '',
        product.metadata.category?.title || '',
        product.metadata.seo_keywords || '',
        ...(product.metadata.applications?.map(app => app.title) || [])
      ].join(' ').toLowerCase();
      
      return searchableText.includes(searchTerm);
    });
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
}

// Get products by price range
export async function getProductsByPriceRange(min: number, max: number): Promise<Product[]> {
  try {
    const products = await getProducts();
    return products.filter(product => {
      const price = product.metadata.price;
      return price >= min && price <= max;
    });
  } catch (error) {
    console.error('Error fetching products by price range:', error);
    return [];
  }
}