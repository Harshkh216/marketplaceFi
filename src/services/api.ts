import type { Product, Brand, Store, Category, EMIPlan } from '@/types';
import { products, brands, stores } from '@/data/products';
import { calculateEMIPlans } from '@/utils/emi';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const api = {
  async getProducts(): Promise<Product[]> {
    await delay(600);
    return [...products];
  },

  async getProduct(id: string): Promise<Product | null> {
    await delay(300);
    return products.find((p) => p.id === id) ?? null;
  },

  async getBrands(): Promise<Brand[]> {
    await delay(200);
    return [...brands];
  },

  async getStores(): Promise<Store[]> {
    await delay(200);
    return [...stores];
  },

  async getFeaturedProducts(): Promise<Product[]> {
    await delay(500);
    return products.filter((p) => p.featured);
  },

  async getTrendingProducts(): Promise<Product[]> {
    await delay(500);
    return products.filter((p) => p.trending);
  },

  async getDeals(): Promise<Product[]> {
    await delay(400);
    return products.filter((p) => p.deal);
  },

  async getProductsByCategory(category: Category | 'All'): Promise<Product[]> {
    await delay(400);
    if (category === 'All') return [...products];
    return products.filter((p) => p.category === category);
  },

  async getProductsByBrand(brandName: string): Promise<Product[]> {
    await delay(400);
    return products.filter((p) => p.brand === brandName);
  },

  getEMIPlans(price: number): EMIPlan[] {
    return calculateEMIPlans(price);
  },

  async searchProducts(query: string): Promise<Product[]> {
    await delay(400);
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.shortSpecs.toLowerCase().includes(q),
    );
  },
};
