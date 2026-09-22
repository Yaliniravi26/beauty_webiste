export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'Skincare' | 'Makeup' | 'Lip' | 'Eyes' | 'Body' | 'Fragrance';
  concern: 'Hydration' | 'Brightening' | 'Glow' | 'Calming' | 'Nourishing';
  price: number;
  rating: number;
  reviewsCount: number;
  description: string;
  benefits: string[];
  ingredients: string;
  howToUse: string;
  volume: string;
  imageUrl: string;
  hoverImageUrl: string;
  isBestseller?: boolean;
  isNew?: boolean;
  shade?: string;
  notes?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  shade?: string;
}

export interface Category {
  id: string;
  name: string;
  tagline: string;
  imageUrl: string;
  count: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  review: string;
  productUsed: string;
  rating: number;
  skinType: string;
}

export interface JournalArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  imageUrl: string;
  date: string;
  author: string;
}

export interface BeautyQuizResult {
  persona: string;
  recommendations: Product[];
  ritualSummary: string;
}
