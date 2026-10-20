import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const routes = [
  "/",
  "/projects/",
  "/experience/",
  "/experience/amagi/",
  "/about/",
  "/skills/",
  "/blog/",
  "/blog/building-portfolio-with-astro/",
  "/blog/eda-patterns-i-wish-i-knew/",
  "/contact/",
  "/404.html",
];
for (const width of [360, 768, 1440])
  for (const theme of ["light", "dark"] as const) {
    test(`${width}px ${theme}: all routes fit and remain accessible`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ colorScheme: theme, reducedMotion: "reduce" });
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      for (const route of routes) {
        await page.goto(route);
        await page.evaluate(() => document.fonts.ready);
        await expect(page.locator("h1")).toBeVisible();
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
          `${route} overflows at ${width}`,
        ).toBe(true);
        const result = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze();
        expect(
          result.violations.map(
            (v) => `${v.id}: ${v.nodes.map((n) => n.target).join(",")}`,
          ),
          route,
        ).toEqual([]);
      }
      expect(errors).toEqual([]);
    });
  }
test("topic filtering, reset, reload, history, and collection isolation", async ({
  page,
}) => {
  await page.goto("/projects/");
  await page
    .getByRole("button", { name: "Computer Vision", exact: true })
    .click();
  await expect(page).toHaveURL(/topic=Computer\+Vision/);
  await expect(page.locator("#ai [data-filter-item]:visible")).toHaveCount(1);
  await expect(page.locator("#passion .project-card")).toHaveCount(3);
  await page.reload();
  await expect(page.locator("#ai [data-filter-item]:visible")).toHaveCount(1);
  await page.getByRole("button", { name: "NLP", exact: true }).click();
  await expect(page.locator("#ai [data-filter-item]:visible")).toHaveCount(2);
  await page.goBack();
  await expect(
    page.getByRole("button", { name: "Computer Vision", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.goto("/projects/?topic=Unmatched");
  await expect(
    page.getByRole("heading", { name: "No projects match this filter" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Reset filters" }).click();
  await expect(page.locator("#ai [data-filter-item]:visible")).toHaveCount(5);
});
test("theme persistence and mobile keyboard menu", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await page.goto("/about/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  const trigger = page.getByRole("button", { name: "Menu" });
  await trigger.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "Close menu" }).focus();
  await page.keyboard.press("Shift+Tab");
  await expect(
    page.getByRole("dialog").getByRole("link", { name: "LinkedIn" }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: "Close menu" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(trigger).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
});
test("writing filter, copy email, and deterministic simulation", async ({
  page,
  context,
}) => {
  await page.goto("/blog/?topic=Unmatched");
  await expect(
    page.getByRole("heading", { name: "No articles match this filter" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Reset filters" }).click();
  await page.getByRole("button", { name: "python", exact: true }).click();
  await expect(page.locator("[data-filter-item]:visible")).toHaveCount(1);
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/contact/");
  await page.getByRole("button", { name: "Copy email" }).click();
  await expect(page.getByRole("status")).toHaveText(
    "Email copied to clipboard.",
  );
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "rvabhi2504@gmail.com",
  );
  await page.goto("/experience/amagi/");
  const status = page.locator(".simulation [role=status]");
  await page.getByRole("button", { name: "Next step" }).click();
  await expect(status).toContainText("first segment");
  await page.getByRole("button", { name: "Next step" }).click();
  await expect(status).toContainText("preview playable");
  await page.getByRole("button", { name: "Previous" }).click();
  await expect(status).toContainText("first segment");
  await page.getByRole("button", { name: "Reset", exact: true }).click();
  await expect(status).toContainText("Progressive preview: waiting");
});
test("without JavaScript: all projects and mobile navigation remain available", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 360, height: 800 },
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4321/projects/");
  await expect(page.locator("#ai [data-filter-item]:visible")).toHaveCount(5);
  await expect(
    page.locator(".nojs-nav").getByRole("link", { name: "About", exact: true }),
  ).toBeVisible();
  await context.close();
});
