import { Flame, ArrowRight } from 'lucide-react';
import type { Product } from '@/types';
import { formatINR, calculateDiscount } from '@/utils/emi';
import { ProductImage } from '@/components/ui/ProductImage';
import { Rating } from '@/components/ui/Rating';

interface FeaturedTrendingProps {
  id: string;
  title: string;
  subtitle: string;
  icon: typeof Flame;
  products: Product[];
  onView: (product: Product) => void;
}

export function FeaturedTrending({
  id,
  title,
  subtitle,
  icon: Icon,
  products,
  onView,
}: FeaturedTrendingProps) {
  if (products.length === 0) return null;

  return (
    <section id={id} className="scroll-mt-20 bg-navy-50/50 py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-end justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-900 text-lime-400">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-navy-900 sm:text-2xl">{title}</h2>
              <p className="mt-0.5 text-sm text-navy-400">{subtitle}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible lg:grid-cols-4">
          {products.map((product, i) => {
            const discount = calculateDiscount(product.price, product.mrp);
            const minEMI = Math.round(product.price / 12);
            return (
              <button
                key={product.id}
                onClick={() => onView(product)}
                className="group flex shrink-0 flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white text-left shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover sm:shrink-0 animate-fade-in-up w-64 sm:w-auto"
                style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
              >
                <div className="relative aspect-square w-full overflow-hidden bg-navy-50">
                  <ProductImage
                    src={product.images[0].url}
                    alt={product.images[0].alt}
                    className="h-full w-full"
                    imgClassName="group-hover:scale-110"
                  />
                  {discount > 0 && (
                    <div className="absolute left-2 top-2 rounded-full bg-lime-400 px-2 py-0.5 text-xs font-bold text-navy-900">
                      {discount}% OFF
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-navy-400">{product.brand}</p>
                  <h3 className="mt-0.5 line-clamp-1 text-sm font-bold text-navy-900">{product.name}</h3>
                  <p className="mt-1 line-clamp-1 text-xs text-navy-400">{product.shortSpecs}</p>
                  <div className="mt-1.5">
                    <Rating rating={product.rating} />
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-base font-bold text-navy-900">₹{formatINR(product.price)}</span>
                    {product.mrp > product.price && (
                      <span className="text-xs text-navy-300 line-through">₹{formatINR(product.mrp)}</span>
                    )}
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-lime-600">EMI ₹{formatINR(minEMI)}/mo</span>
                    <span className="flex items-center gap-1 text-xs font-semibold text-navy-600 transition-colors group-hover:text-lime-600">
                      View
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
