import { reducer, useCartStoreTypes } from "./use-cart-store";

it("adds to store", () => {
  const value = reducer(
    { productById: {} },
    {
      type: useCartStoreTypes.addToCart,
      payload: {
        productId: "added-product-id",
      },
    }
  );

  expect(value).toEqual({ productById: { "added-product-id": 1 } });
});

it("adds to store keeps older data", () => {
  const value = reducer(
    { productById: { "other-id": 2 } },
    {
      type: useCartStoreTypes.addToCart,
      payload: {
        productId: "added-product-id",
      },
    }
  );

  expect(value).toEqual({
    productById: { "added-product-id": 1, "other-id": 2 },
  });
});

it("increments", () => {
  const value = reducer(
    { productById: { "added-product-id": 1 } },
    {
      type: useCartStoreTypes.increment,
      payload: {
        productId: "added-product-id",
      },
    }
  );

  expect(value).toEqual({ productById: { "added-product-id": 2 } });
});

it("increments keeps older data", () => {
  const value = reducer(
    { productById: { "added-product-id": 1, "older-data": 2 } },
    {
      type: useCartStoreTypes.increment,
      payload: {
        productId: "added-product-id",
      },
    }
  );

  expect(value).toEqual({
    productById: { "added-product-id": 2, "older-data": 2 },
  });
});

it("decrements", () => {
  const value = reducer(
    { productById: { "added-product-id": 2 } },
    {
      type: useCartStoreTypes.decrement,
      payload: {
        productId: "added-product-id",
      },
    }
  );

  expect(value).toEqual({ productById: { "added-product-id": 1 } });
});

it("decrements when its 1, removes", () => {
  const value = reducer(
    { productById: { "added-product-id": 1 } },
    {
      type: useCartStoreTypes.decrement,
      payload: {
        productId: "added-product-id",
      },
    }
  );

  expect(value).toEqual({ productById: {} });
});

it("decrements when its 1, removes, but keep the rest", () => {
  const value = reducer(
    { productById: { "added-product-id": 1, "other-data": 2 } },
    {
      type: useCartStoreTypes.decrement,
      payload: {
        productId: "added-product-id",
      },
    }
  );

  expect(value).toEqual({ productById: { "other-data": 2 } });
});
