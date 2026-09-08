import { useState, useCallback, useMemo } from 'react';
import { Star, TrendingUp, CheckCircle2, X } from 'lucide-react';
import type { Product, EMIPlan, Filters, Category } from '@/types';
import { formatINR } from '@/utils/emi';
import { useProducts } from '@/hooks/useProducts';
import { useWishlist } from '@/hooks/useWishlist';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Categories } from '@/components/Categories';
import { ProductGrid } from '@/components/ProductGrid';
import { FeaturedTrending } from '@/components/FeaturedTrending';
import { Deals } from '@/components/Deals';
import { EMIBenefits } from '@/components/EMIBenefits';
import { TopBrands } from '@/components/TopBrands';
import { Why1Fi } from '@/components/Why1Fi';
import { NearbyStores } from '@/components/NearbyStores';
import { Footer } from '@/components/Footer';
import { ProductDetail } from '@/components/ProductDetail';

interface ProceedConfirmation {
  product: Product;
  emi: EMIPlan;
  finalPrice: number;
}

function App() {
  const {
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
  } = useProducts();

  const { has, toggle, count: wishlistCount } = useWishlist();

  const [navSearch, setNavSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [confirmation, setConfirmation] = useState<ProceedConfirmation | null>(null);

  const featuredProducts = useMemo(() => products.filter((p) => p.featured), [products]);
  const trendingProducts = useMemo(() => products.filter((p) => p.trending), [products]);
  const dealsProducts = useMemo(() => products.filter((p) => p.deal), [products]);

  const handleFilterChange = useCallback((partial: Partial<Filters>) => {
    setFilters((prev) => ({ ...prev, ...partial }));
  }, [setFilters]);

  const handleSearch = useCallback(
    (query: string) => {
      setNavSearch(query);
      handleFilterChange({ search: query });
      const productsSection = document.getElementById('products');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    [handleFilterChange],
  );

  const handleNavSearchSubmit = useCallback(() => {
    handleSearch(navSearch);
  }, [navSearch, handleSearch]);

  const handleCategorySelect = useCallback(
    (category: Category | 'All') => {
      handleFilterChange({ category });
    },
    [handleFilterChange],
  );

  const handleBrandSelect = useCallback(
    (brand: string) => {
      handleFilterChange({ brand });
      const productsSection = document.getElementById('products');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    [handleFilterChange],
  );

  const handleView = useCallback((product: Product) => {
    setSelectedProduct(product);
    setDetailOpen(true);
  }, []);

  const handleProceedFromCard = useCallback(
    (product: Product) => {
      setSelectedProduct(product);
      setDetailOpen(true);
    },
    [],
  );

  const handleProceedFromDetail = useCallback(
    (product: Product, selectedEMI: EMIPlan | null, variantPrice: number) => {
      if (!selectedEMI) return;
      setDetailOpen(false);
      setConfirmation({ product, emi: selectedEMI, finalPrice: variantPrice });
    },
    [],
  );

  const handleNavClick = useCallback((section: string) => {
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleLogoClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleExplore = useCallback(() => {
    const el = document.getElementById('products');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar
        search={navSearch}
        onSearchChange={setNavSearch}
        onSearchSubmit={handleNavSearchSubmit}
        wishlistCount={wishlistCount}
        onLogoClick={handleLogoClick}
        onNavClick={handleNavClick}
      />

      <main>
        <Hero onSearch={handleSearch} onExplore={handleExplore} onEMIPlans={() => handleNavClick('emi-benefits')} />

        <Categories active={filters.category} onSelect={handleCategorySelect} />

        <FeaturedTrending
          id="featured"
          title="Featured Products"
          subtitle="Handpicked premium tech just for you"
          icon={Star}
          products={featuredProducts}
          onView={handleView}
        />

        <ProductGrid
          products={filteredProducts}
          filters={filters}
          categories={categories}
          availableBrands={availableBrands}
          onFilterChange={handleFilterChange}
          status={status}
          error={error}
          onRetry={retry}
          isWishlisted={has}
          onWishlist={toggle}
          onView={handleView}
          onProceed={handleProceedFromCard}
        />

        <FeaturedTrending
          id="trending"
          title="Trending Now"
          subtitle="What everyone's upgrading to this season"
          icon={TrendingUp}
          products={trendingProducts}
          onView={handleView}
        />

        <Deals products={dealsProducts} onView={handleView} onProceed={handleProceedFromCard} />

        <EMIBenefits />

        <TopBrands brands={brands} activeBrand={filters.brand} onBrandSelect={handleBrandSelect} />

        <Why1Fi />

        <NearbyStores stores={stores} />
      </main>

      <Footer />

      <ProductDetail
        product={selectedProduct}
        isOpen={detailOpen}
        onClose={() => setDetailOpen(false)}
        isWishlisted={selectedProduct ? has(selectedProduct.id) : false}
        onWishlist={toggle}
        onProceed={handleProceedFromDetail}
      />

      {confirmation && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center p-4 sm:items-center">
          <div
            className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setConfirmation(null)}
          />
          <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-premium animate-scale-in">
            <button
              onClick={() => setConfirmation(null)}
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-navy-400 transition-colors hover:bg-navy-50"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-lime-100">
                <CheckCircle2 className="h-8 w-8 text-lime-600" />
              </div>

              <h3 className="mt-4 font-display text-lg font-bold text-navy-900">Plan Selected!</h3>
              <p className="mt-1 text-sm text-navy-400">
                You're all set to upgrade to the {confirmation.product.brand} {confirmation.product.name}
              </p>

              <div className="mt-5 w-full space-y-2 rounded-xl border border-navy-100 bg-navy-50/50 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-navy-400">Product Price</span>
                  <span className="font-semibold text-navy-800">
                    ₹{formatINR(confirmation.finalPrice)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-navy-400">Monthly EMI</span>
                  <span className="font-bold text-navy-900">
                    ₹{formatINR(confirmation.emi.monthlyEMI)}/mo
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-navy-400">Tenure</span>
                  <span className="font-semibold text-navy-700">
                    {confirmation.emi.tenure} months
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-navy-100 pt-2 text-sm">
                  <span className="font-semibold text-navy-700">Total Payable</span>
                  <span className="font-bold text-navy-900">
                    ₹{formatINR(confirmation.emi.totalPayable)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setConfirmation(null)}
                className="mt-5 w-full rounded-xl bg-navy-900 py-3 text-sm font-bold text-white transition-colors hover:bg-navy-800"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
