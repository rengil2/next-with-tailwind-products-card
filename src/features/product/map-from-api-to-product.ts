import produce from "immer";
import { Product } from "./interface";

export const mapFromApiToProduct = (product: Product): Product => {
  return produce<Product>(product, (draftState) => {
    if (!product.gtin) {
      draftState.error = "This product is invalid";
    } else {
      draftState.id = product.gtin;
    }
  });
};
