import Layout from "../components/Layout";
import Image from "next/image";

import {
  useCartStore,
  useCartStoreTypes,
} from "../features/cart/use-cart-store";
import { useProductListQuery } from "../features/product/queries/use-product-list-query";
import { ProductCard } from "../features/product/product-card";
import { ProductQuantityControl } from "../features/product/product-quantity-control";

const LoadingState = () => <div>Loading</div>;
const ErrorState = () => <div>Error</div>;

export interface ProductFromApi {
  name: string;
  gtin: string;
  recommendedRetailPrice: number;
  recommendedRetailPriceCurrency: string;
  imageUrl: string;
  brandName: string;
  categoryName: string;
}

export interface Product {
  name: string;
  gtin: string;
  recommendedRetailPrice: number;
  recommendedRetailPriceCurrency: string;
  imageUrl: string;
  brandName: string;
  categoryName: string;
  id?: string;
  error?: string;
}

export const ProductList: React.FC<{
  products: Product[];
  renderItem: (product: Product) => React.ReactNode;
}> = ({ renderItem, products }) => {
  return (
    <ul className="grid-rows-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-full col-span-full">
      {products.map(renderItem)}
    </ul>
  );
};

const HomePage = () => {
  const [productsById, dispatch] = useCartStore((state) => [
    state.productById,
    state.dispatch,
  ]);
  const query = useProductListQuery();
  if (query.isLoading) {
    return <LoadingState />;
  }

  if (query.error || !query.data) {
    return <ErrorState />;
  }

  return (
    <Layout>
      <h1>Products</h1>
      <ProductList
        products={query.data.products}
        renderItem={(product: Product) => (
          <ProductCard
            as="li"
            key={product.gtin}
            product={product}
            renderFooter={() => {
              if (productsById[product.id] && product.id) {
                return (
                  <ProductQuantityControl
                    quantity={productsById[product.id]}
                    productId={product.id}
                  />
                );
              }
              return (
                <button
                  className="bg-purple-500 text-white py-3 px-8 rounded-md"
                  onClick={() =>
                    dispatch({
                      type: useCartStoreTypes.addToCart,
                      payload: { productId: product.id },
                    })
                  }
                >
                  Add To Cart
                </button>
              );
            }}
          />
        )}
      />
    </Layout>
  );
};

export default HomePage;
