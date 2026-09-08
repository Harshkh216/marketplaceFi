import { Wallet, Eye, Zap } from 'lucide-react';
import { ProductImage } from '@/components/ui/ProductImage';

const benefits = [
  {
    icon: Wallet,
    title: 'Low Monthly EMIs',
    description: 'Split your purchase into affordable monthly payments with plans starting from 3 months.',
    image: 'https://images.pexels.com/photos/36812953/pexels-photo-36812953.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    stat: 'from ₹999/mo',
  },
  {
    icon: Eye,
    title: 'Transparent Pricing',
    description: 'No hidden charges. See your interest, processing fees, and total payable upfront before you commit.',
    image: 'https://images.pexels.com/photos/36715578/pexels-photo-36715578.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    stat: '0 hidden fees',
  },
  {
    icon: Zap,
    title: 'Fast Digital Approval',
    description: 'Get instant approval online. No paperwork, no branch visits — just quick, seamless financing.',
    image: 'https://images.pexels.com/photos/36765989/pexels-photo-36765989.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    stat: 'instant approval',
  },
];

export function EMIBenefits() {
  return (
    <section id="emi-benefits" className="scroll-mt-20 bg-navy-900 py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
            Upgrade today. <span className="text-lime-400">Pay comfortably.</span>
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-navy-200">
            1Fi makes premium technology accessible with flexible EMI plans designed for you.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="group relative overflow-hidden rounded-2xl border border-navy-700 bg-navy-800 p-5 transition-all duration-300 hover:border-lime-400/30 hover:bg-navy-800/80 animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}
              >
                <div className="relative z-10">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-lime-400 text-navy-900">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-white">{benefit.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-navy-200">{benefit.description}</p>
                  <p className="mt-3 text-sm font-bold text-lime-400">{benefit.stat}</p>
                </div>
                <div className="absolute -bottom-8 -right-8 h-32 w-32 overflow-hidden rounded-2xl opacity-20 transition-opacity duration-300 group-hover:opacity-30">
                  <ProductImage src={benefit.image} alt={benefit.title} className="h-full w-full" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
