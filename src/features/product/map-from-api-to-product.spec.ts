import produce from "immer";
import { Product } from "./interface";
import { mapFromApiToProduct } from "./map-from-api-to-product";
import { productFixture, productFixture2 } from "./product-fixture";

it("has error due to missing id", () => {
  const product = { ...productFixture2 };
  expect(mapFromApiToProduct(product).error).toEqual("This product is invalid");
});

it("it maps correct", () => {
  const product = mapFromApiToProduct({ ...productFixture });
  expect(product.error).toEqual(undefined);
  expect(product.id).toEqual(product.gtin);
});
