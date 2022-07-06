import { productFixture2 } from "./product-fixture";
import { getProductCurrency } from "./get-product-currency";
import { getProductPrice } from "./get-product-price";

it("returns correct value", () => {
  expect(getProductPrice(productFixture2)).toEqual(10);
});
