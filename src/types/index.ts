export type Category =
  | 'Smartphones'
  | 'Laptops'
  | 'Audio'
  | 'Wearables'
  | 'Tablets'
  | 'Accessories';

export type VariantType = 'storage' | 'ram' | 'color' | 'size';

export interface VariantOption {
  label: string;
  value: string;
  priceModifier: number;
  image?: string;
}

export interface ProductVariant {
  type: VariantType;
  label: string;
  options: VariantOption[];
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductImage {
  url: string;
  alt: string;
}

export interface EMIPlan {
  tenure: number;
  monthlyEMI: number;
  interestRate: number;
  interestAmount: number;
  totalPayable: number;
  processingFee: number;
}

export interface Product {
  id: string;
  brand: string;
  name: string;
  category: Category;
  shortSpecs: string;
  description: string;
  images: ProductImage[];
  price: number;
  mrp: number;
  rating: number;
  reviewCount: number;
  variants: ProductVariant[];
  specs: ProductSpec[];
  tags: string[];
  featured: boolean;
  trending: boolean;
  deal: boolean;
  inStock: boolean;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  color: string;
}

export interface Store {
  id: string;
  name: string;
  category: string;
  distance: string;
  address: string;
  image: string;
  rating: number;
}

export interface Filters {
  category: Category | 'All';
  brand: string | 'All';
  search: string;
}
