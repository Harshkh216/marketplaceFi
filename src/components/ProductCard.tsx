import { Heart, Eye, ArrowRight } from 'lucide-react';
import type { Product } from '@/types';
import { formatINR, calculateDiscount } from '@/utils/emi';
import { ProductImage } from '@/components/ui/ProductImage';
import { Rating } from '@/components/ui/Rating';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onWishlist: (id: string) => void;
  onView: (product: Product) => void;
  onProceed: (product: Product) => void;
  index?: number;
}

export function ProductCard({
  product,
  isWishlisted,
  onWishlist,
  onView,
  onProceed,
  index = 0,
}: ProductCardProps) {
  const [popping, setPopping] = useState(false);
  const discount = calculateDiscount(product.price, product.mrp);
  const minEMI = Math.round(product.price / 12);

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPopping(true);
    onWishlist(product.id);
    setTimeout(() => setPopping(false), 400);
  };

  const handleView = (e: React.MouseEvent) => {
    e.stopPropagation();
    onView(product);
  };

  const handleProceed = (e: React.MouseEvent) => {
    e.stopPropagation();
    onProceed(product);
  };

  return (
    <div
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover animate-fade-in-up"
      style={{ animationDelay: `${Math.min(index * 50, 400)}ms`, animationFillMode: 'both' }}
      onClick={handleView}
    >
      {discount > 0 && (
        <div className="absolute left-2 top-2 z-10 rounded-full bg-rose-500 px-2.5 py-1 text-xs font-bold text-white shadow-md">
          {discount}% OFF
        </div>
      )}

      <button
        onClick={handleWishlist}
        aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition-all hover:scale-110 hover:bg-white"
      >
        <Heart
          className={`h-4 w-4 transition-colors ${
            popping ? 'animate-wishlist-pop' : ''
          } ${
            isWishlisted
              ? 'fill-rose-500 text-rose-500'
              : 'text-navy-400 hover:text-rose-500'
          }`}
        />
      </button>

      <div className="relative aspect-square w-full overflow-hidden bg-navy-50">
        <ProductImage
          src={product.images[0].url}
          alt={product.images[0].alt}
          className="h-full w-full"
          imgClassName="group-hover:scale-110"
        />
        <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-2 bg-gradient-to-t from-navy-900/80 to-transparent p-3 transition-transform duration-300 group-hover:translate-y-0">
          <button
            onClick={handleView}
            className="flex items-center gap-1.5 rounded-xl bg-lime-400 px-4 py-2 text-xs font-bold text-navy-900 shadow-lg transition-all hover:bg-lime-300 hover:scale-105"
          >
            <Eye className="h-3.5 w-3.5" />
            View Details
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-navy-400">{product.brand}</p>
        <h3 className="mt-0.5 line-clamp-1 text-sm font-bold text-navy-900">{product.name}</h3>
        <p className="mt-1 line-clamp-1 text-xs text-navy-400">{product.shortSpecs}</p>

        <div className="mt-2">
          <Rating rating={product.rating} reviewCount={product.reviewCount} />
        </div>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-bold text-navy-900">₹{formatINR(product.price)}</span>
          {product.mrp > product.price && (
            <span className="text-xs text-navy-300 line-through">₹{formatINR(product.mrp)}</span>
          )}
        </div>

        <p className="mt-0.5 text-xs font-medium text-lime-600">
          EMI from ₹{formatINR(minEMI)}/mo
        </p>

        {!product.inStock && (
          <p className="mt-1 text-xs font-semibold text-rose-500">Out of stock</p>
        )}

        <div className="mt-auto pt-3">
          <button
            onClick={handleProceed}
            disabled={!product.inStock}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-lime-400 py-2.5 text-xs font-bold text-navy-900 shadow-sm transition-all hover:bg-lime-300 hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-navy-100 disabled:text-navy-300"
          >
            Proceed
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
