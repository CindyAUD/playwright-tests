const { test, expect } = require('@playwright/test');

test('Verify sorting by Price (Low to High) on SauceDemo', async ({ page }) => {
  // Step 1: Open the Inventory Page
  await page.goto('https://www.saucedemo.com/');

  // Step 2: Log in (valid credentials)
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');

  // Verify successful login
  await expect(page.locator('.title')).toHaveText('Products');

  // Step 3: Filter products by price (low to high)
  const sortDropdown = page.locator('.product_sort_container');
  await sortDropdown.click(); // Open the sort dropdown
  await sortDropdown.selectOption({ value: 'lohi' }); // Select 'Price (Low to High)'

  // Step 4: Wait for the page to reflect the changes
  await page.waitForFunction(() => {
    const prices = Array.from(document.querySelectorAll('.inventory_item_price'))
                        .map(el => parseFloat(el.innerText.replace('$', '').trim()));
    return prices.every((price, i, arr) => i === 0 || arr[i - 1] <= price); // Check sorted order
  });

  // Step 5: Verify Sorting Order
  const prices = await page.locator('.inventory_item_price').allTextContents();
  const numericPrices = prices.map(price => parseFloat(price.replace('$', '').trim()));

  console.log('Extracted Prices:', numericPrices); // Debugging output

  // Assert that the prices are sorted in ascending order
  expect(numericPrices).toEqual([...numericPrices].sort((a, b) => a - b));

  // Step 6: Take a screenshot for debugging purposes
  await page.screenshot({ path: 'sorted-price-debug.png' });
});
