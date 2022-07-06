import { getProductForId } from "./get-product-for-id";
import { Product } from "./interface";

const products = [
  {
    name: "name",
    gtin: "gtin",
    recommendedRetailPrice: 10,
    recommendedRetailPriceCurrency: "EUR",
    imageUrl: "wwww.google.com.br",
    brandName: "some-brand",
    categoryName: "some-category-name",
  },
  {
    name: "name",
    gtin: "id-found",
    recommendedRetailPrice: 10,
    recommendedRetailPriceCurrency: "EUR",
    imageUrl: "wwww.google.com.br",
    brandName: "some-brand",
    categoryName: "some-category-name",
  },
] as Product[];

it("finds", () => {
  expect(getProductForId("id-found", products)).toEqual(1);
});
