import { useInfiniteQuery, useQuery } from "react-query";
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
  const fetchProducts = async ({ pageParam = 1 }) => {
    const result = await fetch("api/products?page=" + pageParam);
    const data = await result.json();
    debugger;
    return {
      products: data.results.map(mapToProduct),
      nextPage: data.count > data.page * 20 ? data.page + 1 : undefined,
    };
  };

  return useInfiniteQuery("products", fetchProducts, {
    getNextPageParam: (lastPage, pages) => {
      return lastPage.nextPage;
    },
  });
};

const fetchProducts = async (productIds: string[]) => {
  const products = [] as Product[];
  const fetchAll = async () => {
    for (const productId of productIds) {
      const result = await fetch("api/products/" + productId);
      const data = await result.json();
      products.push(mapToProduct(data));
    }
  };

  await fetchAll();
  return {
    products,
  };
};

export const useProductForCartQuery = (productIds: string[]) => {
  return useQuery(["product", productIds.toString()], () =>
    fetchProducts(productIds)
  );
};
