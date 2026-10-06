import { test, expect } from "@playwright/test";
test("red company pins open official careers directly", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".company-pin")).toHaveCount(3);
  await expect(
    page.getByRole("heading", { name: "Pune Hiring Map" }),
  ).toBeVisible();
  const pin = page.getByRole("link", { name: /NiCE — official careers/ });
  await expect(pin).toHaveAttribute(
    "href",
    "https://www.nice.com/careers/apply",
  );
  await expect(pin).toHaveAttribute("target", "_blank");
  await page
    .context()
    .route("https://www.nice.com/careers/apply", (r) =>
      r.fulfill({ body: "Official careers destination test" }),
    );
  const popup = page.waitForEvent("popup");
  await pin.click();
  await expect(await popup).toHaveURL("https://www.nice.com/careers/apply");
  await page.setViewportSize({ width: 390, height: 844 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
});
