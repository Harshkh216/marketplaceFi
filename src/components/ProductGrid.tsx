import { Search, SlidersHorizontal, X, AlertCircle, RefreshCw, PackageSearch } from 'lucide-react';
import { useState } from 'react';
import type { Product, Filters, Category } from '@/types';
import { ProductCard } from '@/components/ProductCard';
import { ProductGridSkeleton } from '@/components/ui/Skeletons';

interface ProductGridProps {
  products: Product[];
  filters: Filters;
  categories: (Category | 'All')[];
  availableBrands: string[];
  onFilterChange: (filters: Partial<Filters>) => void;
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;
  onRetry: () => void;
  isWishlisted: (id: string) => boolean;
  onWishlist: (id: string) => void;
  onView: (product: Product) => void;
  onProceed: (product: Product) => void;
}

export function ProductGrid({
  products,
  filters,
  categories,
  availableBrands,
  onFilterChange,
  status,
  error,
  onRetry,
  isWishlisted,
  onWishlist,
  onView,
  onProceed,
}: ProductGridProps) {
  const [showFilters, setShowFilters] = useState(false);

  const hasActiveFilters =
    filters.category !== 'All' || filters.brand !== 'All' || filters.search !== '';

  const clearFilters = () => {
    onFilterChange({ category: 'All', brand: 'All', search: '' });
  };

  return (
    <section id="products" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-navy-900 sm:text-2xl">
            {filters.category === 'All' ? 'All Products' : filters.category}
          </h2>
          <p className="mt-1 text-sm text-navy-400">
            {status === 'success' && `${products.length} product${products.length !== 1 ? 's' : ''} found`}
          </p>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 rounded-xl border border-navy-100 bg-white px-3 py-2 text-sm font-medium text-navy-600 transition-colors hover:border-navy-200 lg:hidden"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </button>
      </div>

      <div className="mb-5 hidden items-center gap-2 lg:flex">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onFilterChange({ category: cat })}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                filters.category === cat
                  ? 'bg-navy-900 text-white shadow-md'
                  : 'border-2 border-navy-100 bg-white text-navy-600 hover:border-lime-300 hover:text-navy-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <select
            value={filters.brand}
            onChange={(e) => onFilterChange({ brand: e.target.value })}
            className="rounded-xl border-2 border-navy-100 bg-white px-3 py-2 text-sm font-semibold text-navy-700 focus:border-lime-400 focus:outline-none"
          >
            {availableBrands.map((b) => (
              <option key={b} value={b}>
                {b === 'All' ? 'All Brands' : b}
              </option>
            ))}
          </select>
        </div>
      </div>

      {showFilters && (
        <div className="mb-4 space-y-3 rounded-2xl border border-navy-100 bg-white p-4 lg:hidden">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onFilterChange({ category: cat })}
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                  filters.category === cat
                    ? 'bg-navy-900 text-white'
                    : 'border border-navy-100 bg-white text-navy-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <select
            value={filters.brand}
            onChange={(e) => onFilterChange({ brand: e.target.value })}
            className="w-full rounded-xl border-2 border-navy-100 bg-white px-3 py-2 text-sm font-semibold text-navy-700 focus:border-lime-400 focus:outline-none"
          >
            {availableBrands.map((b) => (
              <option key={b} value={b}>
                {b === 'All' ? 'All Brands' : b}
              </option>
            ))}
          </select>
        </div>
      )}

      {hasActiveFilters && status === 'success' && (
        <div className="mb-4 flex items-center gap-2">
          <span className="text-xs text-navy-400">Active filters:</span>
          {filters.category !== 'All' && (
            <button
              onClick={() => onFilterChange({ category: 'All' })}
              className="flex items-center gap-1 rounded-full bg-navy-100 px-2.5 py-1 text-xs font-medium text-navy-700"
            >
              {filters.category}
              <X className="h-3 w-3" />
            </button>
          )}
          {filters.brand !== 'All' && (
            <button
              onClick={() => onFilterChange({ brand: 'All' })}
              className="flex items-center gap-1 rounded-full bg-navy-100 px-2.5 py-1 text-xs font-medium text-navy-700"
            >
              {filters.brand}
              <X className="h-3 w-3" />
            </button>
          )}
          {filters.search && (
            <button
              onClick={() => onFilterChange({ search: '' })}
              className="flex items-center gap-1 rounded-full bg-navy-100 px-2.5 py-1 text-xs font-medium text-navy-700"
            >
              "{filters.search}"
              <X className="h-3 w-3" />
            </button>
          )}
          <button
            onClick={clearFilters}
            className="text-xs font-semibold text-lime-600 hover:text-lime-700"
          >
            Clear all
          </button>
        </div>
      )}

      {status === 'loading' && <ProductGridSkeleton count={8} />}

      {status === 'error' && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-navy-100 bg-white py-16 text-center">
          <AlertCircle className="h-10 w-10 text-rose-400" />
          <p className="mt-3 text-sm font-semibold text-navy-800">Something went wrong</p>
          <p className="mt-1 max-w-xs text-xs text-navy-400">{error}</p>
          <button
            onClick={onRetry}
            className="mt-4 flex items-center gap-2 rounded-xl bg-lime-400 px-5 py-2.5 text-sm font-bold text-navy-900 shadow-md transition-all hover:bg-lime-300 hover:shadow-lg"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
        </div>
      )}

      {status === 'success' && products.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-navy-100 bg-white py-16 text-center">
          <PackageSearch className="h-10 w-10 text-navy-300" />
          <p className="mt-3 text-sm font-semibold text-navy-800">No products found</p>
          <p className="mt-1 max-w-xs text-xs text-navy-400">
            Try adjusting your filters or search terms to find what you're looking for.
          </p>
          <button
            onClick={clearFilters}
            className="mt-4 flex items-center gap-2 rounded-xl bg-lime-400 px-5 py-2.5 text-sm font-bold text-navy-900 shadow-md transition-all hover:bg-lime-300 hover:shadow-lg"
          >
            <Search className="h-4 w-4" />
            Browse All Products
          </button>
        </div>
      )}

      {status === 'success' && products.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {products.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              isWishlisted={isWishlisted(product.id)}
              onWishlist={onWishlist}
              onView={onView}
              onProceed={onProceed}
            />
          ))}
        </div>
      )}
    </section>
  );
}
