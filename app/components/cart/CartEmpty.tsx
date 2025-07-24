import {ArrowRight, ShoppingBag} from 'lucide-react';
import {Link} from 'react-router-dom';
import {useAside} from '../Aside';
import {CartMainProps} from './CartMain';

export default function CartEmpty({
  hidden = false,
}: {
  hidden: boolean;
  layout?: CartMainProps['layout'];
}) {
  const {close} = useAside();
  if (hidden) return null;

  return (
    <div
      className={`flex flex-col items-center justify-center text-center h-full p-6`}
    >
      {/* icon */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-brand-cream rounded-full scale-[1.8] blur-xl opacity-50" />
        <div className="relative w-20 h-20 bg-brand-cream rounded-full flex items-center justify-center">
          <ShoppingBag className="w-8 h-8 text-brand-navy" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md space-y-4">
        <h2 className="font-playfair text-2xl text-brand-navy">
          Your Shopping Cart is Empty
        </h2>
        <p className="font-source text-gray-500 leading-relaxed">
          Discover our collection of handcrafted footwear, where traditional
          artisanship meets contemporary elegance.
        </p>
        {/* Primary CTA */}
        <Link
          to="/collections/all"
          onClick={close}
          prefetch="intent"
          className="inline-flex items-center justify-center px-8 py-4 mt-6 bg-brand-navy text-white font-source font-medium hover:bg-brand-navyLight transition-all duration-300"
        >
          Explore Our Products
          <ArrowRight className="w-5 h-5 ml-2" />
        </Link>

        {/* Collections/all CTA */}
        <div className="pt-8 space-y-3 border-t border-gray-100 mt-8">
          <p className="font-source text-sm text-gray-400 uppercase tracking-wide">
            Featured Products
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              to="/collections/all"
              onClick={close}
              prefetch="intent"
              className="text-brand-gold hover:text-brand-goldDark transition-colors duration-300"
            >
              View All
            </Link>
          </div>
        </div>

        {/* contact information */}
        <div className=" text-sm text-gray-500 pt-6">
          <p className=" font-source">Need assistance? Contact our atelier</p>
          <a
            href="mailto:atelier@cadence.com"
            className=" text-brand-gold hover:text-brand-goldDark transition-colors duration-300"
          >
            atelier@cadence.com
          </a>
        </div>
      </div>
    </div>
  );
}
