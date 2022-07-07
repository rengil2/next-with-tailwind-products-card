import { test, expect } from "@playwright/test";

/*
  Todos
  Make more robust tests that would not depend on the backend.
  I would just test that the first item was added and also would't test the total
 */
test("header", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  const title = await page.locator(`data-testid=header--logo`);
  await expect(title).toHaveText("Qogita");
});

test("add to cart, increment, decrement", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.locator(`data-testid=add-to-cart-button-5054563079435`).click();

  await page
    .locator(`data-testid=product-quantity-control--increment-5054563079435`)
    .click();

  await page
    .locator(`data-testid=product-quantity-control--decrement-5054563079435`)
    .click();

  await page
    .locator(`data-testid=product-quantity-control--remove-5054563079435`)
    .click();
});

test("going to cart", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.locator(`data-testid=add-to-cart-button-5054563079435`).click();
  await page.locator(`data-testid=add-to-cart-button-8411047151242`).click();
  await page.goto("http://localhost:3000/cart");
  expect(await page.$$('text="Total To Pay 52,98 €"')).toHaveLength(1);
});
