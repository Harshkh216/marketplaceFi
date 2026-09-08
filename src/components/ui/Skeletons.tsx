export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-3 shadow-card">
      <div className="aspect-square w-full rounded-xl skeleton" />
      <div className="mt-3 space-y-2">
        <div className="h-3 w-16 rounded skeleton" />
        <div className="h-4 w-full rounded skeleton" />
        <div className="h-3 w-3/4 rounded skeleton" />
        <div className="flex items-center justify-between pt-1">
          <div className="h-5 w-20 rounded skeleton" />
          <div className="h-5 w-14 rounded skeleton" />
        </div>
        <div className="h-9 w-full rounded-lg skeleton" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
