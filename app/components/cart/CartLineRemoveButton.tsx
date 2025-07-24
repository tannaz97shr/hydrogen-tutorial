import {CartForm} from '@shopify/hydrogen';
import {X} from 'lucide-react';

type CartLineRemoveButtonProps = {
  lineIds: string[];
  disabled: boolean;
};

const CartLineRemoveButton = ({
  lineIds,
  disabled,
}: CartLineRemoveButtonProps) => {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{lineIds}}
    >
      <button
        className={`ml-3 text-gray-400 hover:text-gray-500 transition-colors ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={disabled}
      >
        <X className="w-4 h-4" />
      </button>
    </CartForm>
  );
};

export default CartLineRemoveButton;
