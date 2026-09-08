import { Twitter, Instagram, Linkedin, Facebook } from 'lucide-react';

export function Footer() {
  const sections = [
    {
      title: 'Shop',
      links: ['Smartphones', 'Laptops', 'Audio', 'Wearables', 'Tablets', 'Accessories'],
    },
    {
      title: 'Company',
      links: ['About 1Fi', 'Careers', 'Press', 'Blog', 'Contact Us'],
    },
    {
      title: 'Support',
      links: ['Help Center', 'EMI Plans', 'Track Order', 'Returns', 'Warranty'],
    },
    {
      title: 'Legal',
      links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GST Info'],
    },
  ];

  return (
    <footer className="bg-navy-900 pt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-lime-400 font-display text-lg font-extrabold text-navy-900">
                1
              </div>
              <span className="font-display text-xl font-extrabold tracking-tight text-white">1Fi</span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-navy-300">
              Premium technology, flexible EMI, transparent pricing. Upgrade today, pay comfortably.
            </p>
            <div className="mt-4 flex gap-2">
              {[Twitter, Instagram, Linkedin, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-navy-700 text-navy-300 transition-all hover:border-lime-400/40 hover:text-lime-400"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="font-display text-sm font-bold text-white">{section.title}</h4>
              <ul className="mt-3 space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-navy-300 transition-colors hover:text-lime-400"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-navy-700 py-6 sm:flex-row">
          <p className="text-xs text-navy-400">© 2026 1Fi. All rights reserved.</p>
          <p className="text-xs text-navy-400">
            EMI plans are indicative. Actual rates may vary based on eligibility.
          </p>
        </div>
      </div>
    </footer>
  );
}
