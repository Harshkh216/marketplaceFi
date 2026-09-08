import { MapPin, Star, ArrowRight } from 'lucide-react';
import type { Store } from '@/types';
import { ProductImage } from '@/components/ui/ProductImage';

interface NearbyStoresProps {
  stores: Store[];
}

export function NearbyStores({ stores }: NearbyStoresProps) {
  return (
    <section id="stores" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-900 text-lime-400">
          <MapPin className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-navy-900 sm:text-2xl">Nearby Stores</h2>
          <p className="mt-0.5 text-sm text-navy-400">Visit a 1Fi partner store near you</p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {stores.map((store, i) => (
          <div
            key={store.id}
            className="group flex flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover animate-fade-in-up"
            style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-navy-50">
              <ProductImage
                src={store.image}
                alt={store.name}
                className="h-full w-full"
                imgClassName="group-hover:scale-105"
              />
              <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-xs font-bold text-navy-800 shadow-sm backdrop-blur-sm">
                <Star className="h-3 w-3 fill-lime-400 text-lime-400" />
                {store.rating}
              </div>
            </div>

            <div className="flex flex-1 flex-col p-3">
              <h3 className="text-sm font-bold text-navy-900">{store.name}</h3>
              <p className="mt-0.5 text-xs text-navy-400">{store.category}</p>
              <p className="mt-1 text-xs text-navy-500">{store.address}</p>
              <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-lime-600">
                <MapPin className="h-3.5 w-3.5" />
                {store.distance} away
              </div>
              <button className="mt-3 flex items-center justify-center gap-1.5 rounded-lg border border-navy-200 py-2 text-xs font-semibold text-navy-700 transition-all hover:border-navy-300 hover:bg-navy-50">
                Get Directions
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
