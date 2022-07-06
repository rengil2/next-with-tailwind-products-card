import { Product } from "./interface";

export const getProductForId = (
  id: string,
  products: Product[]
): Product | null => {
  const product = products?.find((p) => p.id === id);
  if (product) return product;
  return null;
};
