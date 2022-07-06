import { getProductForId } from "../product/get-product-for-id";
import { Product } from "../product/interface";

export const removeNotFoundProducts = (
  productIds: string[],
  products: Product[]
) =>
  productIds
    .map((id) => getProductForId(id, products))
    .filter((p) => !!p?.id) as Product[];
