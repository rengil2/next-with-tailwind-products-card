import { getProductForId } from "./get-product-for-id";
import { Product } from "./interface";
import { productFixture } from "./product-fixture";

const products = [productFixture] as Product[];

it("finds", () => {
  expect(getProductForId("gtin", products)).toEqual({
    brandName: "some-brand",
    categoryName: "some-category-name",
    id: "gtin",
    gtin: "gtin",
    imageUrl: "wwww.google.com.br",
    name: "name",
    recommendedRetailPrice: 10,
    recommendedRetailPriceCurrency: "EUR",
  });
});
it("returns null if not found", () => {
  expect(getProductForId("id-not-found", products)).toEqual(null);
});

it("returns null if products is null or undefined", () => {
  expect(getProductForId("id-not-found", null as any)).toEqual(null);
  expect(getProductForId("id-not-found", undefined as any)).toEqual(null);
});
