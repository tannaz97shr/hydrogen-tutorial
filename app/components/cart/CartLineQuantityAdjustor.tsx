import {OptimisticCartLine} from '@shopify/hydrogen';
import {Minus} from 'lucide-react';
import {CartApiQueryFragment} from 'storefrontapi.generated';
import CartLineRemoveButton from './CartLineRemoveButton';
import CartLineUpdateButton from './CartLineUpdateButton';

type CartLine = OptimisticCartLine<CartApiQueryFragment>;

type CartLineQuantityAdjustorProps = {
  line: CartLine;
};

const CartLineQuantityAdjustor = ({line}: CartLineQuantityAdjustorProps) => {
  if (!line || typeof line.quantity === 'undefined') {
    return null;
  }

  const {id: lineId, quantity, isOptimistic} = line;
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number(Math.round(quantity) + 1);

  return (
    <div>
      <CartLineUpdateButton lines={[{id: lineId, quantity: prevQuantity}]}>
        <button
          disabled={quantity <= 1}
          className={`w-8 h-8 flex items-center justify-center rounded border transition-colors ${quantity <= 1 ? ' border-gray-200 text-green-300' : 'border-gray-200 hover:border-gray-400 text-gray-500'}`}
        >
          <Minus className="w-4 h-4" />
        </button>
      </CartLineUpdateButton>
      <span className="font-source w-8 text-center">{quantity}</span>
      <CartLineUpdateButton lines={[{id: lineId, quantity: nextQuantity}]}>
        <button
          className={`w-8 h-8 flex items-center justify-center rounded border transition-colors `}
        >
          <Minus className="w-4 h-4" />
        </button>
      </CartLineUpdateButton>

      <CartLineRemoveButton
        lineIds={[lineId]}
        disabled={isOptimistic === true}
      />
    </div>
  );
};

export default CartLineQuantityAdjustor;
