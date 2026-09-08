import { ShieldCheck, CreditCard, BadgeIndianRupee, ShoppingCart } from 'lucide-react';

const reasons = [
  {
    icon: ShieldCheck,
    title: 'Trusted Products',
    description: 'Only genuine, warranty-backed products from authorised brands and sellers.',
  },
  {
    icon: CreditCard,
    title: 'Flexible EMI Options',
    description: 'Choose from 3, 6, 9, 12, 18, or 24-month plans that fit your budget.',
  },
  {
    icon: BadgeIndianRupee,
    title: 'Transparent Pricing',
    description: 'What you see is what you pay. No hidden charges, no surprises at checkout.',
  },
  {
    icon: ShoppingCart,
    title: 'Easy Online Shopping',
    description: 'Browse, compare, select your plan, and proceed — all in a few taps.',
  },
];

export function Why1Fi() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 text-center">
        <h2 className="font-display text-2xl font-bold text-navy-900 sm:text-3xl">Why 1Fi?</h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-navy-400">
          We make upgrading to premium technology simple, transparent, and affordable.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map((reason, i) => {
          const Icon = reason.icon;
          return (
            <div
              key={reason.title}
              className="group rounded-2xl border border-navy-100 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover animate-fade-in-up"
              style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-lime-400 transition-transform group-hover:scale-110">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-base font-bold text-navy-900">{reason.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-navy-400">{reason.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
