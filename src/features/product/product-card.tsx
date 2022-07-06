import Image from "next/image";
import { Product } from "../../pages";

export const ProductCard: React.FC<{
  product: Product;
  renderFooter?: () => React.ReactNode;
  as: any;
}> = ({ product, renderFooter, as: Parent }) => {
  if (product.error) return null;

  return (
    <Parent className="flex flex-col rounded border-[1px] border-gray-400 p-4 justify-between">
      <div className="flex justify-center">
        <Image
          src={product.imageUrl}
          alt={`Picture of the product ${product.name}`}
          objectFit="contain"
          width="120px"
          height="120px"
        />
      </div>
      <div className="my-2">
        <h4>
          <b>{product.name}</b>
        </h4>
        <p>{product.categoryName}</p>
        <p>{product.recommendedRetailPrice}</p>
      </div>

      <div className="flex flex-col flex-1 justify-end">
        {renderFooter ? renderFooter() : null}
      </div>
    </Parent>
  );
};
