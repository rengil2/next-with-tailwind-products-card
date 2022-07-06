import { Product } from "./interface";

export const getProductPrice = (product: Product): number => {
  return product.recommendedRetailPrice;
};
