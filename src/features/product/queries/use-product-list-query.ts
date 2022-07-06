import { useQuery } from "react-query";
import { Product, ProductFromApi } from "../../../pages";
import produce from "immer";

const mapToProduct = (product: ProductFromApi): Product => {
  return produce<Product>(product, (draftState) => {
    if (!product.gtin) {
      draftState.error = "This product is invalid";
    } else {
      draftState.id = product.gtin;
    }
  });
};

const getProductPrice = (product: Product): number => {
  return product.recommendedRetailPrice;
};

interface ProductWithError {
  id: "string";
  error: "NotFoundProduct";
}

export const getForId = (id: string, products: Product[]): Product | null => {
  const product = products.find((p) => p.id === id);
  if (product) return product;
  return null;
};

export const useProductListQuery = () => {
  return useQuery("products", async () => {
    const result = await fetch("api/products");
    const data = await result.json();
    return {
      products: data.results.map(mapToProduct),
    };
  });
};
