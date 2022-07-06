import { Product } from "./interface";

export const productFixture = {
  name: "name",
  id: "gtin",
  gtin: "gtin",
  recommendedRetailPrice: 10,
  recommendedRetailPriceCurrency: "EUR",
  imageUrl: "wwww.google.com.br",
  brandName: "some-brand",
  categoryName: "some-category-name",
} as Product;

export const productFixture2 = {
  name: "name",
  id: "id-found",
  recommendedRetailPrice: 10,
  recommendedRetailPriceCurrency: "EUR",
  imageUrl: "wwww.google.com.br",
  brandName: "some-brand",
  categoryName: "some-category-name",
} as Product;
