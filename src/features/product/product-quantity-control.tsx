import {
  ProductId,
  ProductQuantity,
  useCartStore,
  useCartStoreTypes,
} from "../cart/use-cart-store";
import clsx from "clsx";

export const ProductQuantityControl: React.FC<{
  quantity: ProductQuantity;
  productId: ProductId;
}> = ({ quantity, productId }) => {
  const dispatch = useCartStore((state) => state.dispatch);

  const isDelete = Number(quantity) <= 1;
  const isDecrement = !isDelete;

  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <strong>Quantity:</strong>
        <p>{quantity}</p>
      </div>
      <div className="flex flex-1 flex-row gap-2 my-2">
        <button
          className={clsx(
            "text-white py-3 rounded-md flex flex-1 justify-center",
            {
              "bg-purple-500": isDecrement,
              "bg-red-500": isDelete,
            }
          )}
          onClick={() =>
            dispatch({
              type: useCartStoreTypes.decrement,
              payload: { productId: productId },
            })
          }
        >
          {Number(quantity) <= 1 ? "Remove" : "-"}
        </button>

        <button
          className="bg-purple-500 text-white py-3 rounded-md flex flex-1 justify-center"
          onClick={() =>
            dispatch({
              type: useCartStoreTypes.increment,
              payload: { productId: productId },
            })
          }
        >
          +
        </button>
      </div>
    </div>
  );
};
