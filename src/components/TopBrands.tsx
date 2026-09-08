import type { Brand } from '@/types';

interface TopBrandsProps {
  brands: Brand[];
  activeBrand: string;
  onBrandSelect: (brand: string) => void;
}

const brandColors: Record<string, string> = {
  Apple: '#555555',
  Samsung: '#1428a0',
  Sony: '#000000',
  Dell: '#007db8',
  Bose: '#1a1a1a',
  Lenovo: '#e2231a',
  OnePlus: '#eb0028',
  HP: '#0096d6',
  Google: '#4285f4',
  JBL: '#ff5722',
};

export function TopBrands({ brands, activeBrand, onBrandSelect }: TopBrandsProps) {
  return (
    <section id="brands" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-5">
        <h2 className="font-display text-xl font-bold text-navy-900 sm:text-2xl">Top Brands</h2>
        <p className="mt-1 text-sm text-navy-400">Shop your favourite brands — tap to filter</p>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide sm:grid sm:grid-cols-5 sm:gap-3 sm:overflow-visible lg:grid-cols-10">
        {brands.map((brand, i) => {
          const isActive = activeBrand === brand.name;
          const color = brandColors[brand.name] ?? '#1f2d55';
          return (
            <button
              key={brand.id}
              onClick={() => onBrandSelect(isActive ? 'All' : brand.name)}
              className={`group flex shrink-0 flex-col items-center gap-2 rounded-2xl border p-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover sm:shrink-0 animate-fade-in-up ${
                isActive
                  ? 'border-lime-400 bg-lime-50 shadow-card'
                  : 'border-navy-100 bg-white hover:border-navy-200'
              }`}
              style={{ animationDelay: `${i * 40}ms`, animationFillMode: 'both' }}
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white shadow-sm transition-transform group-hover:scale-110 sm:h-14 sm:w-14"
                style={{ backgroundColor: color }}
              >
                {brand.name.substring(0, 2).toUpperCase()}
              </div>
              <span
                className={`text-[11px] font-semibold sm:text-xs ${
                  isActive ? 'text-navy-900' : 'text-navy-600'
                }`}
              >
                {brand.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
