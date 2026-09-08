import { Heart, Search, Menu, X, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
  wishlistCount: number;
  onLogoClick: () => void;
  onNavClick: (section: string) => void;
}

export function Navbar({
  search,
  onSearchChange,
  onSearchSubmit,
  wishlistCount,
  onLogoClick,
  onNavClick,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const navItems = [
    { label: 'Shop', section: 'products' },
    { label: 'EMI Plans', section: 'emi-benefits' },
    { label: 'Deals', section: 'deals' },
    { label: 'Brands', section: 'brands' },
    { label: 'Stores', section: 'stores' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit();
    setMobileOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-navy-100 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          <button onClick={onLogoClick} className="flex shrink-0 items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-900 font-display text-lg font-extrabold text-lime-400">
              1
            </div>
            <span className="font-display text-xl font-extrabold tracking-tight text-navy-900">
              1Fi
            </span>
          </button>

          <form
            onSubmit={handleSubmit}
            className={`relative hidden flex-1 max-w-md transition-all duration-300 md:block ${
              searchFocused ? 'scale-[1.02]' : ''
            }`}
          >
            <Search
              className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors ${
                searchFocused ? 'text-lime-500' : 'text-navy-300'
              }`}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="Search products, brands, categories..."
              className={`w-full rounded-xl border bg-navy-50 py-2 pl-10 pr-4 text-sm text-navy-900 placeholder:text-navy-300 transition-all focus:bg-white focus:outline-none focus:ring-2 ${
                searchFocused
                  ? 'border-lime-400 ring-lime-400/20'
                  : 'border-navy-100 hover:border-navy-200'
              }`}
            />
          </form>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => onNavClick(item.section)}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-navy-600 transition-all hover:bg-lime-50 hover:text-navy-900"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1">
            <button
              onClick={() => onNavClick('wishlist')}
              className="relative flex h-10 w-10 items-center justify-center rounded-lg text-navy-600 transition-all hover:bg-navy-50 hover:text-rose-500"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-lg text-navy-600 transition-all hover:bg-navy-50 hover:text-lime-600"
              aria-label="Cart"
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-navy-600 transition-all hover:bg-navy-50 lg:hidden"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-navy-100 bg-white px-4 py-3 lg:hidden">
            <form onSubmit={handleSubmit} className="relative mb-3">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300" />
              <input
                type="text"
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search products..."
                className="w-full rounded-xl border border-navy-100 bg-navy-50 py-2.5 pl-10 pr-4 text-sm focus:border-lime-400 focus:bg-white focus:outline-none"
              />
            </form>
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.section}
                  onClick={() => {
                    onNavClick(item.section);
                    setMobileOpen(false);
                  }}
                  className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-navy-600 transition-colors hover:bg-navy-50"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
