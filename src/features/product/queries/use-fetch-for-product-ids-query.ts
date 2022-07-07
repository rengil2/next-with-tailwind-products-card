import { useQuery } from "react-query";
import { mapFromApiToProduct } from "../map-from-api-to-product";
import { Product } from "../interface";

const apiCall = async (productIds: string[]) => {
  const products = [] as Product[];
  const fetchAll = async () => {
    for (const productId of productIds) {
      const result = await fetch("api/products/" + productId);
      const data = await result.json();
      products.push(mapFromApiToProduct(data));
    }
  };

  await fetchAll();
  return {
    products,
  };
};

export const useFetchForProductIdsQuery = (productIds: string[]) => {
  return useQuery(
    ["useFetchForProductIdsQuery"],
    async () => await apiCall(productIds),
    {
      refetchOnWindowFocus: false,
      staleTime: 10000,
    }
  );
};
