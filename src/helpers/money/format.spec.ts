import { formatForCurrency } from "./format";

it("formats", () => {
  expect(formatForCurrency("EUR", 10)).toEqual("10 €");
});

it("formats correctly to 3 decimals", () => {
  expect(formatForCurrency("EUR", 10.85)).toEqual("10,85 €");
});
