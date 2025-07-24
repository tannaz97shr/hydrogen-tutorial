import {Image, type OptimisticCartLine} from '@shopify/hydrogen';
import {Link} from 'react-router';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import {useVariantUrl} from '~/lib/variants';
import {useAside} from '../Aside';
import {ProductPrice} from '../ProductPrice';
import CartLineQuantityAdjustor from './CartLineQuantityAdjustor';
import {CartLayout} from './CartMain';

type CartLine = OptimisticCartLine<CartApiQueryFragment>;

/**
 * A single line item in the cart. It displays the product image, title, price.
 * It also provides controls to update the quantity or remove the line item.
 */
export function CartLineItem({
  layout,
  line,
}: {
  layout: CartLayout;
  line: CartLine;
}) {
  const {id, merchandise} = line;
  const {product, title, image, selectedOptions} = merchandise;
  const lineItemUrl = useVariantUrl(product.handle, selectedOptions);
  const {close} = useAside();

  return (
    <div className="flex gap-4 py-6 border-b border-gray-100">
      {/* Product Image */}
      <div className="relative w-24 h-24 bg-gray-50 rounded-lg overflow-hidden">
        {image && (
          <Image
            alt={title}
            aspectRatio="1/1"
            data={image}
            className="object-cover w-full h-full"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1260px) 50vw, 33vw"
          />
        )}
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <Link
          prefetch="intent"
          to={lineItemUrl}
          onClick={close}
          className="block"
        >
          <h3 className="font-playfair text-base text-brand-navy mb-1 truncate">
            {product.title}
          </h3>
        </Link>

        {/* Product Options */}
        <div className="mt-1 space-y-1">
          {selectedOptions.map((option) => (
            <p
              key={`${product.id}-${option.name}`}
              className="font-source text-sm text-gray-500"
            >
              {option.name}: {option.value}
            </p>
          ))}
        </div>

        {/* Price & Quantity Controls */}
        <div className="mt-4 flex items-center justify-between">
          <CartLineQuantityAdjustor line={line} />
          <div className="font-source font-medium">
            <ProductPrice price={line?.cost?.totalAmount} />
          </div>
        </div>
      </div>
    </div>
  );
}
