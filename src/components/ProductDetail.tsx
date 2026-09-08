import { useState, useEffect, useMemo } from 'react';
import {
  X, Heart, ArrowRight, Shield, Truck, RotateCcw,
} from 'lucide-react';
import type { Product, EMIPlan } from '@/types';
import { formatINR, calculateDiscount, calculateEMIPlans } from '@/utils/emi';
import { ProductImage } from '@/components/ui/ProductImage';
import { Rating } from '@/components/ui/Rating';

interface ProductDetailProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  onWishlist: (id: string) => void;
  onProceed: (product: Product, selectedEMI: EMIPlan | null, variantPrice: number) => void;
}

const TENURES = [3, 6, 9, 12, 18, 24];

export function ProductDetail({
  product,
  isOpen,
  onClose,
  isWishlisted,
  onWishlist,
  onProceed,
}: ProductDetailProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [selectedTenure, setSelectedTenure] = useState<number | null>(null);
  const [popping, setPopping] = useState(false);

  useEffect(() => {
    if (product) {
      setActiveImage(0);
      setSelectedTenure(null);
      const initialVariants: Record<string, string> = {};
      product.variants.forEach((v) => {
        if (v.options.length > 0) {
          initialVariants[v.type] = v.options[0].value;
        }
      });
      setSelectedVariants(initialVariants);
    }
  }, [product]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const variantPriceModifier = useMemo(() => {
    if (!product) return 0;
    return product.variants.reduce((total, variant) => {
      const selected = selectedVariants[variant.type];
      const option = variant.options.find((o) => o.value === selected);
      return total + (option?.priceModifier ?? 0);
    }, 0);
  }, [product, selectedVariants]);

  const finalPrice = product ? product.price + variantPriceModifier : 0;
  const finalMRP = product ? product.mrp + variantPriceModifier : 0;
  const discount = calculateDiscount(finalPrice, finalMRP);

  const emiPlans: EMIPlan[] = useMemo(() => {
    if (!product) return [];
    return calculateEMIPlans(finalPrice);
  }, [product, finalPrice]);

  const selectedEMI = useMemo(() => {
    if (selectedTenure === null) return null;
    return emiPlans.find((p) => p.tenure === selectedTenure) ?? null;
  }, [emiPlans, selectedTenure]);

  const allVariantsSelected = product
    ? product.variants.every((v) => selectedVariants[v.type] !== undefined)
    : false;

  const canProceed = allVariantsSelected && selectedTenure !== null && product?.inStock;

  const handleVariantChange = (type: string, value: string) => {
    setSelectedVariants((prev) => ({ ...prev, [type]: value }));
  };

  const handleWishlist = () => {
    if (!product) return;
    setPopping(true);
    onWishlist(product.id);
    setTimeout(() => setPopping(false), 400);
  };

  const handleProceed = () => {
    if (!product || !canProceed) return;
    onProceed(product, selectedEMI, finalPrice);
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center">
      <div
        className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      <div className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-premium sm:rounded-3xl animate-slide-up sm:animate-scale-in">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition-all hover:scale-110"
          aria-label="Close"
        >
          <X className="h-5 w-5 text-navy-700" />
        </button>

        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="grid gap-0 md:grid-cols-2">
            {/* Gallery */}
            <div className="border-b border-navy-100 bg-navy-50 p-4 md:border-b-0 md:border-r sm:p-6">
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-white shadow-sm">
                <ProductImage
                  src={product.images[activeImage].url}
                  alt={product.images[activeImage].alt}
                  className="h-full w-full"
                  imgClassName="hover:scale-105"
                />
                {discount > 0 && (
                  <div className="absolute left-3 top-3 rounded-full bg-lime-400 px-3 py-1 text-xs font-bold text-navy-900">
                    {discount}% OFF
                  </div>
                )}
              </div>
              {product.images.length > 1 && (
                <div className="mt-3 flex gap-2">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`relative h-16 w-16 overflow-hidden rounded-xl border-2 bg-white transition-all ${
                        activeImage === i
                          ? 'border-lime-400 shadow-md ring-2 ring-lime-400/20'
                          : 'border-navy-100 hover:border-lime-300'
                      }`}
                    >
                      <ProductImage src={img.url} alt={img.alt} className="h-full w-full" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="p-4 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-navy-400">{product.brand}</p>
              <h2 className="mt-1 font-display text-xl font-bold text-navy-900 sm:text-2xl">{product.name}</h2>
              <p className="mt-1 text-sm text-navy-400">{product.shortSpecs}</p>

              <div className="mt-2">
                <Rating rating={product.rating} reviewCount={product.reviewCount} size="md" />
              </div>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-navy-900">₹{formatINR(finalPrice)}</span>
                {finalMRP > finalPrice && (
                  <span className="text-sm text-navy-300 line-through">₹{formatINR(finalMRP)}</span>
                )}
                {discount > 0 && (
                  <span className="text-sm font-semibold text-lime-600">{discount}% off</span>
                )}
              </div>

              <p className="mt-3 text-sm leading-relaxed text-navy-600">{product.description}</p>

              {/* Variants */}
              {product.variants.length > 0 && (
                <div className="mt-5 space-y-4">
                  {product.variants.map((variant) => (
                    <div key={variant.type}>
                      <p className="mb-2 text-sm font-semibold text-navy-800">
                        {variant.label}
                        <span className="ml-2 font-normal text-navy-400">
                          {selectedVariants[variant.type]
                            ? variant.options.find((o) => o.value === selectedVariants[variant.type])?.label
                            : 'Select'}
                        </span>
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {variant.options.map((option) => {
                          const isSelected = selectedVariants[variant.type] === option.value;
                          return (
                            <button
                              key={option.value}
                              onClick={() => handleVariantChange(variant.type, option.value)}
                              className={`rounded-xl border-2 px-3 py-2 text-sm font-medium transition-all ${
                                isSelected
                                  ? 'border-lime-400 bg-lime-50 text-navy-900 ring-2 ring-lime-400/30'
                                  : 'border-navy-100 bg-white text-navy-600 hover:border-lime-300 hover:bg-lime-50/30'
                              }`}
                            >
                              {option.label}
                              {option.priceModifier > 0 && (
                                <span className="ml-1 text-xs text-navy-400">
                                  +₹{formatINR(option.priceModifier)}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* EMI Plans */}
              <div className="mt-6">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-semibold text-navy-800">Select EMI Plan</p>
                  {selectedEMI && (
                    <span className="rounded-full bg-lime-100 px-2.5 py-1 text-xs font-bold text-lime-700">
                      {selectedEMI.tenure} months selected
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                  {TENURES.map((tenure) => {
                    const plan = emiPlans.find((p) => p.tenure === tenure);
                    if (!plan) return null;
                    const isSelected = selectedTenure === tenure;
                    return (
                      <button
                        key={tenure}
                        onClick={() => setSelectedTenure(tenure)}
                        className={`flex flex-col items-center rounded-xl border-2 p-2.5 transition-all ${
                          isSelected
                            ? 'border-lime-400 bg-lime-50 ring-2 ring-lime-400/30'
                            : 'border-navy-100 bg-white hover:border-lime-300 hover:bg-lime-50/30'
                        }`}
                      >
                        <span className={`text-xs font-bold ${isSelected ? 'text-navy-900' : 'text-navy-600'}`}>
                          {tenure}mo
                        </span>
                        <span className={`mt-1 text-[11px] font-semibold ${isSelected ? 'text-lime-700' : 'text-navy-400'}`}>
                          ₹{formatINR(plan.monthlyEMI)}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {selectedEMI && (
                  <div className="mt-3 space-y-1.5 rounded-xl border border-lime-200 bg-lime-50/50 p-3 text-xs animate-fade-in">
                    <div className="flex justify-between">
                      <span className="text-navy-500">Monthly EMI</span>
                      <span className="font-bold text-navy-900">₹{formatINR(selectedEMI.monthlyEMI)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-navy-500">Tenure</span>
                      <span className="font-semibold text-navy-700">{selectedEMI.tenure} months</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-navy-500">Interest & fees</span>
                      <span className="font-semibold text-navy-700">
                        ₹{formatINR(selectedEMI.interestAmount + selectedEMI.processingFee)}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-lime-200 pt-1.5">
                      <span className="font-semibold text-navy-700">Total Payable</span>
                      <span className="font-bold text-navy-900">₹{formatINR(selectedEMI.totalPayable)}</span>
                    </div>
                  </div>
                )}

                {!selectedEMI && (
                  <p className="mt-2 text-xs text-navy-400">Select a tenure to see your monthly EMI and total payable</p>
                )}
              </div>

              {/* Specifications */}
              <div className="mt-6">
                <p className="mb-2 text-sm font-semibold text-navy-800">Specifications</p>
                <div className="divide-y divide-navy-50 rounded-xl border border-navy-100">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="flex justify-between px-3 py-2 text-xs">
                      <span className="text-navy-400">{spec.label}</span>
                      <span className="font-medium text-navy-700">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust badges */}
              <div className="mt-5 flex flex-wrap gap-3 text-xs text-navy-500">
                <div className="flex items-center gap-1.5">
                  <Shield className="h-4 w-4 text-lime-500" />
                  Warranty included
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="h-4 w-4 text-lime-500" />
                  Free delivery
                </div>
                <div className="flex items-center gap-1.5">
                  <RotateCcw className="h-4 w-4 text-lime-500" />
                  7-day returns
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky bottom bar */}
        <div className="flex items-center gap-3 border-t border-navy-100 bg-white p-3 sm:p-4">
          <button
            onClick={handleWishlist}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-2 border-navy-200 transition-all hover:scale-105 hover:border-rose-300"
            aria-label="Toggle wishlist"
          >
            <Heart
              className={`h-5 w-5 ${popping ? 'animate-wishlist-pop' : ''} ${
                isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-navy-400'
              }`}
            />
          </button>

          <div className="flex-1">
            {selectedEMI ? (
              <p className="text-xs text-navy-400">
                <span className="text-sm font-bold text-navy-900">₹{formatINR(selectedEMI.monthlyEMI)}/mo</span>
                {' '}for {selectedEMI.tenure} months
              </p>
            ) : (
              <p className="text-xs font-medium text-navy-400">
                {product.inStock
                  ? 'Select EMI plan to proceed'
                  : 'Currently out of stock'}
              </p>
            )}
          </div>

          <button
            onClick={handleProceed}
            disabled={!canProceed}
            className="group flex items-center gap-2 rounded-xl bg-lime-400 px-6 py-3.5 text-sm font-bold text-navy-900 shadow-md transition-all hover:bg-lime-300 hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-navy-100 disabled:text-navy-300 disabled:shadow-none sm:px-8"
          >
            Proceed
            <ArrowRight className={`h-4 w-4 transition-transform ${canProceed ? 'group-hover:translate-x-1' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
}
