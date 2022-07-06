import { calculateTotalValue } from "./calculate-total-value";
import { productFixture2, productFixture4 } from "../product/product-fixture";

it("get proper value summing 2 and 4", () => {
  expect(
    calculateTotalValue([productFixture2, productFixture4], () => 1)
  ).toEqual(40);
});

it("sums with more quantity", () => {
  expect(
    calculateTotalValue([productFixture2, productFixture4], (id: string) =>
      id === "4" ? 5 : 1
    )
  ).toEqual(160);
});

it("no crash with []", () => {
  expect(calculateTotalValue([], (id: string) => (id === "4" ? 5 : 1))).toEqual(
    0
  );
});

it("no crash with undefined", () => {
  expect(
    calculateTotalValue(undefined as any, (id: string) => (id === "4" ? 5 : 1))
  ).toEqual(0);
});
