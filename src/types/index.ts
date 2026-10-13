export type ProductCategory = 
  | 'Sarees'
  | 'Women\'s Clothing'
  | 'Girls\' Dresses'
  | 'Bangles'
  | '1-Gram Gold';

export interface ProductVariant {
  id: string;
  name: string;
  type: 'size' | 'color';
  inStock: boolean;
  stockCount: number;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: ProductCategory;
  subCategory: string;
  price: number;
  originalPrice: number;
  discountPercent?: number;
  description: string;
  fabric: string;
  zariType?: string;
  careInstructions: string;
  occasion: string;
  images: string[];
  inStock: boolean;
  stockCount: number;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  isFeatured?: boolean;
  rating: number;
  reviewsCount: number;
  availableSizes?: string[];
  availableColors?: { name: string; hex: string }[];
}

export interface CartItem {
  id: string; // unique item cart key (productId + size + color)
  product: Product;
  selectedSize?: string;
  selectedColor?: string;
  quantity: number;
  unitPrice: number;
}

export type PaymentMethod = 'upi' | 'cod';

export interface CustomerDetails {
  fullName: string;
  phoneNumber: string;
  altPhone?: string;
  email?: string;
  addressLine: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customer: CustomerDetails;
  items: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  couponCode?: string;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'verified';
  orderStatus: 'confirmed' | 'processing' | 'dispatched' | 'delivered';
  customerNotes?: string;
}

export interface StoreSettings {
  boutiqueName: string;
  tagline: string;
  whatsappNumber: string; // e.g. 919876543210
  displayPhone: string;  // e.g. +91 98765 43210
  email: string;
  storeAddress: string;
  city: string;
  state: string;
  pincode: string;
  businessHours: string;
  upiId: string;
  freeShippingThreshold: number;
  standardShippingFee: number;
  codFee: number;
  announcementText: string;
  showAnnouncement: boolean;
  aboutStory: string;
  instagramHandle: string;
}
