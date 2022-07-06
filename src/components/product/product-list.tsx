import { Product } from "../../features/product/interface";

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
