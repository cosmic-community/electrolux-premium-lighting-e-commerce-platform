// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  status?: string;
  published_at?: string;
  thumbnail?: string;
}

// Product interface
export interface Product extends CosmicObject {
  type: 'products';
  metadata: {
    name: string;
    short_description: string;
    description?: string;
    price: number;
    compare_price?: number;
    sku: string;
    main_image: {
      url: string;
      imgix_url: string;
    };
    gallery?: Array<{
      url: string;
      imgix_url: string;
    }>;
    model_3d?: {
      url: string;
    } | null;
    category: Category;
    applications?: Application[];
    wattage?: number;
    lumens?: number;
    color_temp?: {
      key: string;
      value: string;
    };
    light_type?: {
      key: string;
      value: string;
    };
    dimmable?: boolean;
    ip_rating?: string;
    dimensions?: string;
    material?: string;
    finish_color?: string;
    stock_status: {
      key: string;
      value: string;
    };
    featured?: boolean;
    seo_keywords?: string;
  };
}

// Category interface
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name: string;
    description?: string;
    image?: {
      url: string;
      imgix_url: string;
    };
    category_type: {
      key: string;
      value: string;
    };
    sort_order?: number;
  };
}

// Application interface
export interface Application extends CosmicObject {
  type: 'applications';
  metadata: {
    name: string;
    description?: string;
    image?: {
      url: string;
      imgix_url: string;
    };
    environment: {
      key: string;
      value: string;
    };
  };
}

// API Response interfaces
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Type literals for select-dropdown values
export type CategoryType = 'Residential' | 'Commercial' | 'Industrial' | 'Outdoor' | 'Specialty';
export type EnvironmentType = 'Indoor' | 'Outdoor' | 'Indoor/Outdoor';
export type ColorTemperature = 'Warm White (2700K-3000K)' | 'Neutral White (3500K-4000K)' | 'Cool White (5000K-6500K)' | 'Daylight (6500K+)';
export type LightType = 'LED' | 'Incandescent' | 'Fluorescent' | 'Halogen';
export type StockStatus = 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Pre-Order';

// Type guards
export function isProduct(obj: CosmicObject): obj is Product {
  return obj.type === 'products';
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories';
}

export function isApplication(obj: CosmicObject): obj is Application {
  return obj.type === 'applications';
}

// Utility types
export type CreateProductData = Omit<Product, 'id' | 'created_at' | 'modified_at'>;
export type UpdateProductData = Partial<CreateProductData>;

// Component prop interfaces
export interface ProductCardProps {
  product: Product;
  className?: string;
  showQuickView?: boolean;
  onQuickView?: (product: Product) => void;
}

export interface CategoryCardProps {
  category: Category;
  productCount?: number;
  className?: string;
}

export interface ApplicationCardProps {
  application: Application;
  className?: string;
}

// Filter interfaces
export interface ProductFilters {
  category?: string;
  categoryType?: CategoryType;
  priceRange?: {
    min: number;
    max: number;
  };
  featured?: boolean;
  inStock?: boolean;
  lightType?: LightType;
  colorTemp?: ColorTemperature;
  dimmable?: boolean;
}

// Search interfaces
export interface SearchFilters extends ProductFilters {
  query?: string;
  sortBy?: 'name' | 'price' | 'created_at';
  sortOrder?: 'asc' | 'desc';
}