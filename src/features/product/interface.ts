export interface Product {
  name: string;
  gtin: string;
  recommendedRetailPrice: number;
  recommendedRetailPriceCurrency: string;
  imageUrl: string;
  brandName: string;
  categoryName: string;
  id: string;
  error?: string;
}

export type ProductQuantity = number;
export type ProductId = string;
