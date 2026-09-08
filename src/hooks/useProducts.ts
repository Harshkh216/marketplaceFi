import { useState, useEffect, useMemo } from 'react';
import type { Product, Brand, Store, Filters, Category } from '@/types';
import { api } from '@/services/api';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [status, setStatus] = useState<Status>('loading');
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({
    category: 'All',
    brand: 'All',
    search: '',
  });

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setStatus('loading');
      setError(null);
      try {
        const [p, b, s] = await Promise.all([
          api.getProducts(),
          api.getBrands(),
          api.getStores(),
        ]);
        if (cancelled) return;
        setProducts(p);
        setBrands(b);
        setStores(s);
        setStatus('success');
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : 'Failed to load products');
        setStatus('error');
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const retry = () => {
    setFilters({ category: 'All', brand: 'All', search: '' });
    setStatus('loading');
    setError(null);
    setTimeout(() => {
      api.getProducts().then((p) => {
        setProducts(p);
        setStatus('success');
      });
      api.getBrands().then(setBrands);
      api.getStores().then(setStores);
    }, 600);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (filters.category !== 'All' && p.category !== filters.category) return false;
      if (filters.brand !== 'All' && p.brand !== filters.brand) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (
          !p.name.toLowerCase().includes(q) &&
          !p.brand.toLowerCase().includes(q) &&
          !p.shortSpecs.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [products, filters]);

  const categories: (Category | 'All')[] = [
    'All',
    'Smartphones',
    'Laptops',
    'Audio',
    'Wearables',
    'Tablets',
    'Accessories',
  ];

  const availableBrands = useMemo(() => {
    const used = new Set(products.map((p) => p.brand));
    return ['All', ...Array.from(used).sort()];
  }, [products]);

  return {
    products,
    filteredProducts,
    brands,
    stores,
    categories,
    availableBrands,
    filters,
    setFilters,
    status,
    error,
    retry,
  };
}
