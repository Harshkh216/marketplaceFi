import { Smartphone, Laptop, Headphones, Watch, Tablet, Plug } from 'lucide-react';
import type { Category } from '@/types';

interface CategoriesProps {
  active: Category | 'All';
  onSelect: (category: Category | 'All') => void;
}

const categories: { label: Category; icon: typeof Smartphone }[] = [
  { label: 'Smartphones', icon: Smartphone },
  { label: 'Laptops', icon: Laptop },
  { label: 'Audio', icon: Headphones },
  { label: 'Wearables', icon: Watch },
  { label: 'Tablets', icon: Tablet },
  { label: 'Accessories', icon: Plug },
];

export function Categories({ active, onSelect }: CategoriesProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-5">
        <h2 className="font-display text-xl font-bold text-navy-900 sm:text-2xl">Shop by Category</h2>
        <p className="mt-1 text-sm text-navy-400">Find exactly what you're looking for</p>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide sm:grid sm:grid-cols-3 sm:overflow-visible lg:grid-cols-6">
        {categories.map(({ label, icon: Icon }) => {
          const isActive = active === label;
          return (
            <button
              key={label}
              onClick={() => onSelect(isActive ? 'All' : label)}
              className={`group flex shrink-0 flex-col items-center gap-2 rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover sm:shrink-0 ${
                isActive
                  ? 'border-lime-400 bg-lime-50 shadow-card'
                  : 'border-navy-100 bg-white hover:border-navy-200'
              }`}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${
                  isActive
                    ? 'bg-lime-400 text-navy-900'
                    : 'bg-navy-50 text-navy-600 group-hover:bg-navy-100'
                }`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <span
                className={`text-xs font-semibold sm:text-sm ${
                  isActive ? 'text-navy-900' : 'text-navy-600'
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
