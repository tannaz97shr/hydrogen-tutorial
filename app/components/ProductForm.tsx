import {
  RichText,
  VariantSelector,
  type MappedProductOptions,
} from '@shopify/hydrogen';
import type {
  Maybe,
  ProductOptionValueSwatch,
} from '@shopify/hydrogen/storefront-api-types';
import {useNavigate} from 'react-router';
import type {ProductFragment} from 'storefrontapi.generated';
import {AddToCartButton} from './AddToCartButton';
import {useAside} from './Aside';

export function ProductForm({
  productOptions,
  selectedVariant,
  className,
}: {
  productOptions: MappedProductOptions[];
  selectedVariant: ProductFragment['selectedOrFirstAvailableVariant'];
  className?: string;
}) {
  const navigate = useNavigate();
  const {open} = useAside();
  return (
    <div className={`flex flex-col ${className ?? ''}`}>
      <div className="space-y-8">
        {/* Variant Options */}
        <VariantSelector
          handle={product.handle}
          options={product.options.filter(
            (option) => option.optionValues.length > 1,
          )}
          variants={variants}
        >
          {(option) => <ProductOptions key={option.name} option={option} />}
        </VariantSelector>

        {/* Add to Cart Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-source text-brand-navy/60">
              {selectedVariant?.availableForSale
                ? 'Ready to ship'
                : 'Currently unavailable'}
            </div>
            {selectedVariant?.sku && (
              <div className="text-sm font-source text-brand-navy/60">
                SKU: {selectedVariant.sku}
              </div>
            )}
          </div>

          <AddToCartButton
            disabled={!selectedVariant || !selectedVariant.availableForSale}
            afterAddToCart={() => {
              open('cart');
            }}
            lines={
              selectedVariant
                ? [
                    {
                      merchandiseId: selectedVariant.id,
                      quantity: 1,
                      selectedVariant,
                    },
                  ]
                : []
            }
          >
            {selectedVariant?.availableForSale ? 'Add to Cart' : 'Sold out'}
          </AddToCartButton>
        </div>

        {/* Product Details Accordion */}
        <div className="mt-12 border-t border-brand-navy/10">
          <div className="grid grid-cols-1 divide-y divide-brand-navy/10"></div>
          {product.materials?.value && (
            <details className="group py-6">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <h3 className="font-playfair text-lg text-brand-navy">
                  Materials & Construction
                </h3>
                <span className="relative flex-shrink-0 ml-4 w-4 h-4">
                  <svg
                    className="absolute inset-0 w-4 h-4 transition duration-300 group-open:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </summary>

              <div className="pt-4 prose font-source text-brand-navy/80">
                <RichText data={product.materials.value} />

                {product.construction?.value && (
                  <div className="pt-4">
                    <RichText data={product.construction.value} />
                  </div>
                )}
              </div>
            </details>
          )}
          {/* Size & Fit Section */}
          {product.constructions?.value && (
            <details className="group py-6">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <h3 className="font-playfair text-lg text-brand-navy">
                  Size & Fit
                </h3>
                <span className="relative flex-shrink-0 ml-4 w-4 h-4">
                  <svg
                    className="absolute inset-0 w-4 h-4 transition duration-300 group-open:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </summary>

              <div className="pt-4 prose font-source text-brand-navy/80">
                <p>{product.construction.value}</p>
              </div>
            </details>
          )}

          {/* Care */}
          {product.careInstructions?.value && (
            <details className="group py-6">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <h3 className="font-playfair text-lg text-brand-navy">
                  Size & Fit
                </h3>
                <span className="relative flex-shrink-0 ml-4 w-4 h-4">
                  <svg
                    className="absolute inset-0 w-4 h-4 transition duration-300 group-open:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </summary>

              <div className="pt-4 prose font-source text-brand-navy/80">
                <RichText data={productOptions.careInstructions?.value} />
              </div>
            </details>
          )}
        </div>
      </div>
    </div>
  );
}

function ProductOptionSwatch({
  swatch,
  name,
}: {
  swatch?: Maybe<ProductOptionValueSwatch> | undefined;
  name: string;
}) {
  const image = swatch?.image?.previewImage?.url;
  const color = swatch?.color;

  if (!image && !color) return name;

  return (
    <div
      aria-label={name}
      className="product-option-label-swatch"
      style={{
        backgroundColor: color || 'transparent',
      }}
    >
      {!!image && <img src={image} alt={name} />}
    </div>
  );
}
