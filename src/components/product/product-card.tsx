import Image from "next/image";
import { getProductPrice } from "../../features/product/get-product-price";
import { formatForCurrency } from "../../helpers/money/format";
import { getProductCurrency } from "../../features/product/get-product-currency";
import { checkIfValidImage } from "../../helpers/image/check-if-valid-image";
import { Product } from "../../features/product/interface";

export const ProductCard: React.FC<{
  product: Product;
  renderFooter?: () => React.ReactNode;
  as: any;
}> = ({ product, renderFooter, as: Parent }) => {
  if (product.error) return null;

  return (
    <Parent className="flex flex-col rounded border-[1px] border-gray-400 p-4 justify-between">
      <div className="flex justify-center">
        {checkIfValidImage(product.imageUrl) ? (
          <Image
            src={product.imageUrl}
            alt={`Picture of the product ${product.name}`}
            objectFit="contain"
            width="120px"
            height="120px"
          />
        ) : (
          <div className="min-w-[120px] min-w-[120px]" />
        )}
      </div>
      <div className="my-2">
        <h4>
          <b>{product.name}</b>
        </h4>
        <p>{product.categoryName}</p>
        <p>
          {formatForCurrency(
            getProductCurrency(product),
            getProductPrice(product)
          )}
        </p>
      </div>

      <div className="flex flex-col flex-1 justify-end">
        {renderFooter ? renderFooter() : null}
      </div>
    </Parent>
  );
};
