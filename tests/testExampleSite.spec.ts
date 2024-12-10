import { test, expect } from '@playwright/test';

test.beforeEach(async ({page}) => {
  await page.goto('http://localhost:5173');
})

test('Check every editable elements has correct attributes', async ({ page }) => {
  // Attribute needed:
  // 1. contenteditable - Make content editable
  // 2. role textbox - Identify element is inputable
  // 3. tabindex 0 - Identify element is focusable
  const elements = await page.locator(`[data-target]`);
  const count = await elements.count();
  for (let i = 0; i < count; i++) {
    const element = elements.nth(i);

    await expect(element).toHaveAttribute('contenteditable', 'true');
    await expect(element).toHaveAttribute('role', 'textbox');
    await expect(element).toHaveAttribute('tabindex', '0');
    await expect(element).toHaveAttribute('aria-editable', 'true');
  }
});

test('Check editing classname & attribute is correct', async ({ page }) => {
  const element = await page.locator(`[data-target]`).first();
  // Enter
  await element.focus();
  await expect(element).toHaveAttribute('aria-busy', 'true');

  const afterEnterHasActiveClass = await element.evaluate(el => el.classList.contains('active'));
  await expect(afterEnterHasActiveClass).toBe(true);

  // onLeave
  await element.blur()
  await expect(element).not.toHaveAttribute('aria-busy', 'true');
  const afterLeaveHasActiveClass = await element.evaluate(el => el.classList.contains('active'));
  await expect(afterLeaveHasActiveClass).toBe(false);
});


test('Check editable element lifecycle callback is trigger correctly', async ({ page }) => {
  const element = await page.locator(`[data-target]`).first();

  // Enter
  await element.focus();
  await expect(element).toHaveAttribute('data-entered');

  // onSubmit
  await element.fill('foobar')
  await element.press('Enter')
  await expect(element).toHaveAttribute('data-submitted');

  // onLeave
  await element.blur()
  await expect(element).toHaveAttribute('data-leave');
});

test('Check destoryAllEditable will destory all editable behavior', async ({ page }) => {
  await page.click('[data-destroy-button]')
  const elements = await page.locator(`[data-target]`);
  const count = await elements.count();
  for (let i = 0; i < count; i++) {
    const element = elements.nth(i);

    await expect(element).not.toHaveAttribute('contenteditable', 'true');
    await expect(element).not.toHaveAttribute('role', 'textbox');
    await expect(element).not.toHaveAttribute('tabindex', '0');
    await expect(element).not.toHaveAttribute('aria-editable', 'true');
  }
});

test('Check destoryTargetEditable will destory target editable behavior', async ({ page }) => {
  await page.click('[data-destroy-specific-button]')
  const nonTargetElement = await page.locator('[data-target]:not([data-target-bar])');
  const targetElement = await page.locator(`[data-target-bar]`);

  await expect(nonTargetElement).toHaveAttribute('contenteditable', 'true');
  await expect(nonTargetElement).toHaveAttribute('role', 'textbox');
  await expect(nonTargetElement).toHaveAttribute('tabindex', '0');
  await expect(nonTargetElement).toHaveAttribute('aria-editable', 'true');


  await expect(targetElement).not.toHaveAttribute('contenteditable', 'true');
  await expect(targetElement).not.toHaveAttribute('role', 'textbox');
  await expect(targetElement).not.toHaveAttribute('tabindex', '0');
  await expect(targetElement).not.toHaveAttribute('aria-editable', 'true');
});