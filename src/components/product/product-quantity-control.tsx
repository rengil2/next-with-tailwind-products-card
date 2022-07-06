import {
  useCartStore,
  useCartStoreTypes,
} from "../../features/cart/use-cart-store";
import {
  PrimaryButton,
  PrimaryButtonWithAlertOption,
} from "../button/primary-button";
import { ProductId, ProductQuantity } from "../../features/product/interface";

export const ProductQuantityControl: React.FC<{
  quantity: ProductQuantity;
  productId: ProductId;
}> = ({ quantity, productId }) => {
  const dispatch = useCartStore((state) => state.dispatch);

  const hasOneElement = Number(quantity) <= 1;

  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <strong>Quantity:</strong>
        <p>{quantity}</p>
      </div>
      <div className="flex flex-1 flex-row gap-2 my-2">
        <PrimaryButtonWithAlertOption
          isAlert={hasOneElement}
          onClick={() =>
            dispatch({
              type: useCartStoreTypes.decrement,
              payload: { productId },
            })
          }
        >
          {hasOneElement ? "Remove" : "-"}
        </PrimaryButtonWithAlertOption>

        <PrimaryButton
          className="bg-purple-500 text-white py-3 rounded-md flex flex-1 justify-center"
          onClick={() =>
            dispatch({
              type: useCartStoreTypes.increment,
              payload: { productId },
            })
          }
        >
          +
        </PrimaryButton>
      </div>
    </div>
  );
};
