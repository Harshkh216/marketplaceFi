import { Tag, ArrowRight } from 'lucide-react';
import type { Product } from '@/types';
import { formatINR, calculateDiscount } from '@/utils/emi';
import { ProductImage } from '@/components/ui/ProductImage';

interface DealsProps {
  products: Product[];
  onView: (product: Product) => void;
  onProceed: (product: Product) => void;
}

export function Deals({ products, onView, onProceed }: DealsProps) {
  if (products.length === 0) return null;

  return (
    <section id="deals" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500 text-white">
          <Tag className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-navy-900 sm:text-2xl">Deals You Can't Miss</h2>
          <p className="mt-0.5 text-sm text-navy-400">Limited-time savings on premium tech</p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {products.map((product, i) => {
          const discount = calculateDiscount(product.price, product.mrp);
          const minEMI = Math.round(product.price / 12);
          return (
            <div
              key={product.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover animate-fade-in-up"
              style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
            >
              <div
                className="relative aspect-square w-full cursor-pointer overflow-hidden bg-navy-50"
                onClick={() => onView(product)}
              >
                <ProductImage
                  src={product.images[0].url}
                  alt={product.images[0].alt}
                  className="h-full w-full"
                  imgClassName="group-hover:scale-110"
                />
                <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-rose-500 px-2.5 py-1 text-xs font-bold text-white">
                  {discount}% OFF
                </div>
              </div>

              <div className="flex flex-1 flex-col p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-navy-400">{product.brand}</p>
                <h3
                  className="mt-0.5 line-clamp-1 cursor-pointer text-sm font-bold text-navy-900 hover:text-lime-600"
                  onClick={() => onView(product)}
                >
                  {product.name}
                </h3>
                <p className="mt-1 line-clamp-1 text-xs text-navy-400">{product.shortSpecs}</p>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-lg font-bold text-navy-900">₹{formatINR(product.price)}</span>
                  <span className="text-xs text-navy-300 line-through">₹{formatINR(product.mrp)}</span>
                </div>
                <p className="mt-0.5 text-xs font-medium text-lime-600">EMI from ₹{formatINR(minEMI)}/mo</p>

                <div className="mt-auto pt-3">
                  <button
                    onClick={() => onProceed(product)}
                    className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-rose-500 py-2 text-xs font-semibold text-white transition-all hover:bg-rose-600"
                  >
                    Grab Deal
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
