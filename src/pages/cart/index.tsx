import Layout from "../../components/Layout";
import {
  useCartStore,
  useCartStoreTypes,
} from "../../features/cart/use-cart-store";
import { Product } from "../index";
import {
  getForId,
  useProductForCartQuery,
  useProductListQuery,
} from "../../features/product/queries/use-product-list-query";
import { ProductCard } from "../../features/product/product-card";
import { ProductQuantityControl } from "../../features/product/product-quantity-control";

export const ProductList: React.FC<{
  products: Product[];
  renderItem: (product: Product) => React.ReactNode;
}> = ({ renderItem, products }) => {
  return <ul className="flex flex-col">{products.map(renderItem)}</ul>;
};

const formatter = new Intl.NumberFormat("de", {
  style: "currency",
  currency: "EUR",
  maximumSignificantDigits: 3,
});

const CartPage = () => {
  const [productById] = useCartStore((state) => [state.productById]);
  const productIds = Object.keys(productById);
  const productListQuery = useProductForCartQuery(productIds);

  if (productListQuery.isLoading || !productListQuery.data) {
    return null;
  }

  const products = productIds
    .map((id) => getForId(id, productListQuery.data.products))
    .filter((p) => !!p?.id) as Product[];

  const totalValue = products.reduce(
    (total, product) =>
      total + (product.recommendedRetailPrice * productById[product.id] || 0),
    0
  ) as unknown as number;

  const formattedTotalValue = formatter.format(totalValue);
  return (
    <Layout>
      <h1>Cart</h1>
      <h2>Total to Pay {formattedTotalValue}</h2>
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
