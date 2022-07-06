import { productFixture2 } from "./product-fixture";
import { getProductCurrency } from "./get-product-currency";

it("returns correct value", () => {
  expect(getProductCurrency(productFixture2)).toEqual("EUR");
});
