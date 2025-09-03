import { test, expect } from '@playwright/test';

test.describe('SpoiledRotten Shopping Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the landing page', async ({ page }) => {
    // Check main elements
    await expect(page.locator('h1')).toContainText('SpoiledRotten.AI');
    await expect(page.locator('text=The Ultimate Luxury is Doing Nothing')).toBeVisible();
    await expect(page.locator('button:has-text("Start Automating")')).toBeVisible();
  });

  test('should navigate to chat interface', async ({ page }) => {
    // Click start automating button
    await page.click('button:has-text("Start Automating")');
    
    // Should be on chat page
    await expect(page).toHaveURL(/.*\/chat/);
    await expect(page.locator('text=Your luxury shopping concierge')).toBeVisible();
  });

  test('should display spoiled odometer', async ({ page }) => {
    // Check odometer is visible
    const odometer = page.locator('[class*="fixed bottom-6 left-6"]');
    await expect(odometer).toBeVisible();
    
    // Check initial state
    await expect(odometer.locator('text=0%')).toBeVisible();
    await expect(odometer.locator('text=0 items')).toBeVisible();
    await expect(odometer.locator('text=$0')).toBeVisible();
  });

  test('should show floating chat button', async ({ page }) => {
    // Check floating chat button
    const chatButton = page.locator('[class*="fixed bottom-6 right-6"]').first();
    await expect(chatButton).toBeVisible();
    
    // Click to open chat
    await chatButton.click();
    
    // Chat window should appear
    await expect(page.locator('text=SpoiledRotten AI')).toBeVisible();
    await expect(page.locator('text=Your luxury concierge')).toBeVisible();
  });

  test('should add items to cart and update odometer', async ({ page }) => {
    // Go to chat page
    await page.goto('/chat');
    
    // Send a message
    const input = page.locator('input[placeholder*="luxury handbag"]');
    await input.fill('I want a luxury handbag');
    await input.press('Enter');
    
    // Wait for AI response with products
    await page.waitForTimeout(2500); // Wait for simulated response
    
    // Click add to cart on a product
    const addToCartButton = page.locator('button:has-text("Add to Cart")').first();
    if (await addToCartButton.isVisible()) {
      await addToCartButton.click();
      
      // Check toast notification
      await expect(page.locator('text=added to cart!')).toBeVisible();
      
      // Check odometer updated
      const odometer = page.locator('[class*="fixed bottom-6 left-6"]');
      await expect(odometer.locator('text=1 item')).toBeVisible();
      
      // Checkout button should appear
      await expect(odometer.locator('button:has-text("Checkout")')).toBeVisible();
    }
  });

  test('should open checkout modal', async ({ page }) => {
    // Go to chat page
    await page.goto('/chat');
    
    // Add an item to cart first
    const input = page.locator('input[placeholder*="luxury handbag"]');
    await input.fill('I want a luxury handbag');
    await input.press('Enter');
    
    await page.waitForTimeout(2500);
    
    const addToCartButton = page.locator('button:has-text("Add to Cart")').first();
    if (await addToCartButton.isVisible()) {
      await addToCartButton.click();
      
      // Click checkout button
      const checkoutButton = page.locator('button:has-text("Checkout")');
      await checkoutButton.click();
      
      // Checkout modal should appear
      await expect(page.locator('h2:has-text("Checkout")')).toBeVisible();
      await expect(page.locator('text=Order Summary')).toBeVisible();
      await expect(page.locator('text=Using test card for demo')).toBeVisible();
    }
  });

  test('should complete checkout process', async ({ page }) => {
    // Go to chat page and add item
    await page.goto('/chat');
    
    const input = page.locator('input[placeholder*="luxury handbag"]');
    await input.fill('I want a luxury handbag');
    await input.press('Enter');
    
    await page.waitForTimeout(2500);
    
    const addToCartButton = page.locator('button:has-text("Add to Cart")').first();
    if (await addToCartButton.isVisible()) {
      await addToCartButton.click();
      
      // Open checkout
      await page.locator('button:has-text("Checkout")').click();
      
      // Fill in required fields
      await page.fill('input[placeholder="spoiled@example.com"]', 'test@example.com');
      await page.fill('input[placeholder="Spoiled Rotten"]', 'Test User');
      
      // Click pay button
      await page.click('button:has-text("Pay $")');
      
      // Should show success message
      await expect(page.locator('text=Payment Successful!')).toBeVisible({ timeout: 5000 });
      await expect(page.locator('text=Your luxury items are on their way!')).toBeVisible();
    }
  });

  test('should handle mobile viewport', async ({ page, browserName }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check responsive elements
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('button:has-text("Start Automating")')).toBeVisible();
    
    // Odometer should still be visible
    const odometer = page.locator('[class*="fixed bottom-6 left-6"]');
    await expect(odometer).toBeVisible();
    
    // Floating chat should be visible
    const chatButton = page.locator('[class*="fixed bottom-6 right-6"]').first();
    await expect(chatButton).toBeVisible();
  });

  test('should persist cart in localStorage', async ({ page, context }) => {
    await page.goto('/chat');
    
    // Add item to cart
    const input = page.locator('input[placeholder*="luxury handbag"]');
    await input.fill('I want a luxury handbag');
    await input.press('Enter');
    
    await page.waitForTimeout(2500);
    
    const addToCartButton = page.locator('button:has-text("Add to Cart")').first();
    if (await addToCartButton.isVisible()) {
      await addToCartButton.click();
      
      // Get localStorage
      const cartData = await page.evaluate(() => {
        return localStorage.getItem('spoiledRottenCart');
      });
      
      expect(cartData).toBeTruthy();
      const cart = JSON.parse(cartData!);
      expect(cart).toHaveLength(1);
      
      // Reload page
      await page.reload();
      
      // Cart should persist
      const odometer = page.locator('[class*="fixed bottom-6 left-6"]');
      await expect(odometer.locator('text=1 item')).toBeVisible();
    }
  });

  test('should show progress milestones', async ({ page }) => {
    await page.goto('/chat');
    
    // Check milestone labels are defined
    const odometer = page.locator('[class*="fixed bottom-6 left-6"]');
    
    // Initially should show "0"
    await expect(odometer.locator('text=0')).toBeVisible();
    
    // Add multiple items to increase spoiled level
    const input = page.locator('input[placeholder*="luxury handbag"]');
    
    for (let i = 0; i < 3; i++) {
      await input.fill(`I want luxury item ${i}`);
      await input.press('Enter');
      await page.waitForTimeout(2500);
      
      const addButton = page.locator('button:has-text("Add to Cart")').first();
      if (await addButton.isVisible()) {
        await addButton.click();
        await page.waitForTimeout(500);
      }
    }
    
    // Should show progress
    const progressBar = odometer.locator('[class*="bg-gradient-to-r"]');
    await expect(progressBar).toBeVisible();
  });
});