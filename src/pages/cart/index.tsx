import Layout from "../../components/layout";
import { useCartStore } from "../../features/cart/use-cart-store";
import { ProductCard } from "../../components/product/product-card";
import { ProductQuantityControl } from "../../components/product/product-quantity-control";
import { productQueries } from "../../features/product/queries";
import { Product } from "../../features/product/interface";
import { ProductList } from "../../components/product/product-list";
import { formatForCurrency } from "../../helpers/money/format";
import { removeNotFoundProducts } from "../../features/cart/remove-not-found-products";
import { calculateTotalValue } from "../../features/cart/calculate-total-value";
import { getProductCurrency } from "../../features/product/get-product-currency";

const CartPage = () => {
  const [productById] = useCartStore((state) => [state.productById]);
  const productIds = Object.keys(productById);
  const productListQuery =
    productQueries.useFetchForProductIdsQuery(productIds);

  if (productListQuery.isLoading || !productListQuery.data) {
    return null;
  }
  const products = removeNotFoundProducts(
    productIds,
    productListQuery.data.products
  );

  const totalValue = calculateTotalValue(
    products,
    (productId) => productById[productId]
  );

  return (
    <Layout>
      <h1>Cart</h1>
      <h2>{formatForCurrency(getProductCurrency(products[0]), totalValue)}</h2>
      <ProductList
        products={products}
        renderItem={(product: Product) => (
          <div className="flex flex-row w-[40rem] max-w-[400px]">
            <div className="w-[40rem] max-w-[400px]">
              <ProductCard
                as="li"
                key={product.gtin}
                product={product}
                renderFooter={() => {
                  if (!product.id) return null;
                  return (
                    <ProductQuantityControl
                      quantity={productById[product.id]}
                      productId={product.id}
                    />
                  );
                }}
              />
            </div>
          </div>
        )}
      />
    </Layout>
  );
};

export default CartPage;
