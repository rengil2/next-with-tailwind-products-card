import { Product } from "./interface";

export const getProductCurrency = (product: Product): string => {
  return product?.recommendedRetailPriceCurrency;
};
