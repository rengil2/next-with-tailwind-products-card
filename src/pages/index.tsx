import Layout from "../components/layout";
import {
  useCartStore,
  useCartStoreTypes,
} from "../features/cart/use-cart-store";
import { ProductCard } from "../components/product/product-card";
import { ProductQuantityControl } from "../components/product/product-quantity-control";
import { productQueries } from "../features/product/queries";
import { Product } from "../features/product/interface";
import { ProductList } from "../components/product/product-list";
import {
  ErrorState,
  LoadingState,
} from "../components/product/loading-empty-state";
import { PrimaryButton } from "../components/button/primary-button";

const HomePage = () => {
  const [productsById, dispatch] = useCartStore((state) => [
    state.productById,
    state.dispatch,
  ]);

  const paginatedListQuery = productQueries.useFetchPaginatedQuery();

  if (paginatedListQuery.isLoading) {
    return <LoadingState />;
  }

  if (paginatedListQuery.error || !paginatedListQuery.data) {
    return <ErrorState />;
  }

  return (
    <Layout>
      <h1>Products</h1>
      {paginatedListQuery.data.pages.map((group) => {
        return (
          <div key={group.nextPage} className="my-4">
            <ProductList
              products={group.products}
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
                      <PrimaryButton
                        data-testid={`add-to-cart-button-${product.id}`}
                        onClick={() =>
                          dispatch({
                            type: useCartStoreTypes.addToCart,
                            payload: { productId: product.id },
                          })
                        }
                      >
                        Add To Cart
                      </PrimaryButton>
                    );
                  }}
                />
              )}
            />
          </div>
        );
      })}
      {paginatedListQuery.hasNextPage ? (
        <div className="flex justify-center items-center mt-4">
          <PrimaryButton onClick={() => paginatedListQuery.fetchNextPage()}>
            Fetch more
          </PrimaryButton>
        </div>
      ) : null}
    </Layout>
  );
};

export default HomePage;
