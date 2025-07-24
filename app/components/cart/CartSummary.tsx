import {Money, type OptimisticCart} from '@shopify/hydrogen';
import {CreditCard, Gift} from 'lucide-react';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import CartDiscounts from './CardDiscounts';
import CartGiftCard from './CartGiftCard';
import {CartLayout} from './CartMain';

type CartSummaryProps = {
  cart: OptimisticCart<CartApiQueryFragment | null>;
  layout: CartLayout;
};

export function CartSummary({cart, layout}: CartSummaryProps) {
  const className =
    layout === 'page' ? 'cart-summary-page' : 'cart-summary-aside';

  return (
    <div className="bg-white px-6 py-8">
      {/* Subtotal */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-source text-gray-600">Subtotal</span>
        <span className="font-source font-medium">
          {cart.cost?.subtotalAmount?.amount ? (
            <Money data={cart.cost.subtotalAmount} />
          ) : (
            '-'
          )}
        </span>
      </div>

      {/* Discounts */}
      <CartDiscounts />

      {/* Gift Cards */}
      <CartGiftCard giftCardCodes={cart.appliedGiftCards} />

      {/* Extra Information */}
      <div className="mt-8 space-y-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Gift className="w-4 h-4" />
          <span>Complimentary gift wrapping available</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <CreditCard className="w-4 h-4" />
          <span>Secure checkout powered by Shopify</span>
        </div>
      </div>
    </div>
  );
}
function CartCheckoutActions({checkoutUrl}: {checkoutUrl?: string}) {
  if (!checkoutUrl) return null;

  return (
    <div>
      <a href={checkoutUrl} target="_self">
        <p>Continue to Checkout &rarr;</p>
      </a>
      <br />
    </div>
  );
}
