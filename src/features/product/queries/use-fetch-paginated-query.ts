import { useInfiniteQuery } from "react-query";
import { mapFromApiToProduct } from "../map-from-api-to-product";

export const useFetchPaginatedQuery = () => {
  const fetchProducts = async ({ pageParam = 1 }) => {
    const result = await fetch("api/products?page=" + pageParam);
    const data = await result.json();
    debugger;
    return {
      products: data.results.map(mapFromApiToProduct),
      nextPage: data.count > data.page * 20 ? data.page + 1 : undefined,
    };
  };

  return useInfiniteQuery("useFetchPaginatedQuery", fetchProducts, {
    getNextPageParam: (lastPage, pages) => {
      return lastPage.nextPage;
    },
  });
};
