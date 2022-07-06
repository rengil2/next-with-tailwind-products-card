import { getProductPrice } from "../../features/product/get-product-price";

const getFormatMoney = (currency = "EUR") =>
  new Intl.NumberFormat("de", {
    style: "currency",
    currency: "EUR",
    maximumSignificantDigits: 3,
  });

export const formatForCurrency = (currency: string, value: number) => {
  const formatter = getFormatMoney(currency);
  return formatter.format(value);
};
