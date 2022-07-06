import { getProductPrice } from "../product/get-product-price";
import { Product } from "../product/interface";

export const calculateTotalValue = (
  products: Product[],
  getQuantityForProduct: (productId: string) => number
) => {
  if (!products) return 0;
  return products.reduce(
    (total, product) =>
      total +
      getProductPrice(product) * (getQuantityForProduct(product.id) || 0),
    0
  );
};
