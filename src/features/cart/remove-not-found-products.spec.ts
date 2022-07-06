import { removeNotFoundProducts } from "./remove-not-found-products";
import {
  productFixture2,
  productFixture3WithoutId,
} from "../product/product-fixture";

it("remove not found", () => {
  expect(
    removeNotFoundProducts(["id", "gtin", "id-found"], [productFixture2])
  ).toEqual([
    {
      brandName: "some-brand",
      categoryName: "some-category-name",
      id: "id-found",
      imageUrl: "wwww.google.com.br",
      name: "name",
      recommendedRetailPrice: 10,
      recommendedRetailPriceCurrency: "EUR",
    },
  ]);
});

it("remove not found", () => {
  expect(
    removeNotFoundProducts(
      ["id", "gtin", "id-found"],
      [productFixture3WithoutId]
    )
  ).toEqual([]);
});
