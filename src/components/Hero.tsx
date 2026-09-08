import { Search, ArrowRight, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { ProductImage } from '@/components/ui/ProductImage';

interface HeroProps {
  onSearch: (query: string) => void;
  onExplore: () => void;
  onEMIPlans: () => void;
}

const popularSearches = ['iPhone 16 Pro', 'MacBook Air', 'Sony WH-1000XM5', 'Apple Watch', 'Galaxy S25'];

export function Hero({ onSearch, onExplore, onEMIPlans }: HeroProps) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch(query);
  };

  return (
    <section className="relative overflow-hidden bg-navy-900 bg-hero-pattern">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-900 to-navy-800" />
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-lime-400/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-lime-400/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="animate-fade-in-up text-center lg:text-left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-lime-400/20 bg-lime-400/10 px-3 py-1 text-xs font-semibold text-lime-300">
              <Sparkles className="h-3.5 w-3.5" />
              Premium Tech, Flexible EMI
            </div>

            <h1 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Pick your next{' '}
              <span className="text-lime-400">upgrade.</span>
            </h1>

            <p className="mx-auto mt-4 max-w-lg text-sm text-navy-200 sm:text-base lg:mx-0">
              Premium tech + flexible EMI + transparent pricing. Browse the latest
              smartphones, laptops, audio, and more — all with easy monthly plans.
            </p>

            <form
              onSubmit={handleSubmit}
              className={`mx-auto mt-6 flex max-w-lg items-center gap-2 rounded-2xl bg-white p-2 shadow-premium transition-all duration-300 lg:mx-0 ${
                focused ? 'ring-2 ring-lime-400' : ''
              }`}
            >
              <Search
                className={`ml-2 h-5 w-5 shrink-0 transition-colors ${
                  focused ? 'text-lime-500' : 'text-navy-300'
                }`}
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Search for iPhone, MacBook, headphones..."
                className="min-w-0 flex-1 bg-transparent text-sm text-navy-900 placeholder:text-navy-300 focus:outline-none"
              />
              <button
                type="submit"
                className="flex shrink-0 items-center gap-1.5 rounded-xl bg-lime-400 px-5 py-2.5 text-sm font-bold text-navy-900 transition-all hover:bg-lime-300 hover:shadow-md active:scale-[0.98]"
              >
                Search
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
              <span className="text-xs text-navy-300">Popular:</span>
              {popularSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setQuery(term);
                    onSearch(term);
                  }}
                  className="rounded-full border border-lime-400/30 bg-lime-400/10 px-3 py-1 text-xs font-medium text-lime-300 transition-all hover:border-lime-400 hover:bg-lime-400/20 hover:text-lime-200"
                >
                  {term}
                </button>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <button
                onClick={onExplore}
                className="group flex items-center justify-center gap-2 rounded-xl bg-lime-400 px-6 py-3 text-sm font-bold text-navy-900 transition-all hover:bg-lime-300 hover:shadow-lg hover:shadow-lime-400/20"
              >
                Explore Products
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={onEMIPlans}
                className="flex items-center justify-center rounded-xl bg-white/10 px-6 py-3 text-sm font-bold text-white ring-2 ring-lime-400/50 transition-all hover:bg-white/20 hover:ring-lime-400"
              >
                View EMI Plans
              </button>
            </div>
          </div>

          <div className="relative hidden h-[420px] lg:block">
            <div className="absolute right-8 top-0 z-20 animate-float">
              <div className="rounded-2xl bg-white p-3 shadow-premium">
                <ProductImage
                  src="https://images.pexels.com/photos/30639091/pexels-photo-30639091.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                  alt="iPhone 16"
                  className="h-44 w-36"
                />
              </div>
            </div>
            <div className="absolute left-0 top-32 z-10 animate-float-slow">
              <div className="rounded-2xl bg-white p-3 shadow-premium">
                <ProductImage
                  src="https://images.pexels.com/photos/9635251/pexels-photo-9635251.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                  alt="MacBook Air M4"
                  className="h-40 w-52"
                />
              </div>
            </div>
            <div className="absolute bottom-0 right-20 z-30 animate-float" style={{ animationDelay: '1s' }}>
              <div className="rounded-2xl bg-white p-3 shadow-premium">
                <ProductImage
                  src="https://images.pexels.com/photos/33481395/pexels-photo-33481395.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                  alt="Sony WH-1000XM5"
                  className="h-36 w-36"
                />
              </div>
            </div>
            <div className="absolute left-12 bottom-8 z-0 rounded-2xl border border-lime-400/20 bg-navy-800/40 p-4 backdrop-blur-sm animate-fade-in-up" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
              <p className="text-2xl font-bold text-lime-400">₹3,332</p>
              <p className="text-xs text-navy-200">EMI / month*</p>
              <p className="mt-1 text-[10px] text-navy-400">on iPhone 16, 24-mo plan</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
