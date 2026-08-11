export type CategoryId = 'mobile' | 'laptop' | 'tablet' | 'headphones' | 'smartwatch' | 'accessories';

export interface StorePrice {
  storeId: string;
  storeName: string;
  logo: string;
  price: number; // In Tomans
  oldPrice?: number;
  inStock: boolean;
  warranty: string;
  affiliateUrl: string;
  isLowest?: boolean;
}

export interface ProductSpec {
  title: string;
  value: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  verifiedBuy: boolean;
}

export interface Product {
  id: string;
  title: string;
  faTitle: string;
  brand: string;
  categoryId: CategoryId;
  categoryName: string;
  image: string;
  gallery?: string[];
  rating: number;
  reviewsCount: number;
  isFeatured?: boolean;
  isPriceDrop?: boolean;
  isEditorChoice?: boolean;
  priceDropPercentage?: number;
  editorsNote?: string;
  description: string;
  pros: string[];
  cons: string[];
  stores: StorePrice[];
  specs: ProductSpec[];
  reviews: Review[];
  priceHistory: { date: string; price: number }[];
  viewsCount: number;
  updatedAt: string;
}

export interface Category {
  id: CategoryId;
  name: string;
  iconName: string;
  description: string;
  productCount: number;
  bannerImage: string;
}

export interface PartnerStore {
  id: string;
  name: string;
  faName: string;
  logo: string;
  website: string;
  rating: number;
  trustBadge: string;
  offersCount: number;
}

export interface Coupon {
  id: string;
  storeId: string;
  storeName: string;
  storeLogo: string;
  code: string;
  discountTitle: string;
  discountDescription: string;
  discountAmount: string; // e.g., '۱۰۰,۰۰۰ تومان' or '۱۵٪'
  expiryDate: string;
  isVerified: boolean;
  affiliateUrl: string;
  usesCount: number;
  category?: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  categoryId: CategoryId;
  categoryName: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  publishDate: string;
  readTime: string; // e.g. '۷ دقیقه'
  image: string;
  summary: string;
  content: string; // Markdown / HTML supported string
  recommendedProductIds: string[];
  viewsCount: number;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
}

export interface SiteStats {
  testedProducts: number;
  categoriesCount: number;
  partnerStoresCount: number;
  trackedPriceDrops: number;
  totalCoupons: number;
}

export interface FilterState {
  categoryId?: CategoryId | 'all';
  searchQuery: string;
  selectedStore?: string;
  selectedBrand?: string;
  minPrice: number;
  maxPrice: number;
  onlyPriceDrop: boolean;
  onlyInStock: boolean;
  sortBy: 'lowestPrice' | 'highestPrice' | 'priceDrop' | 'popularity' | 'newest' | 'rating';
}
