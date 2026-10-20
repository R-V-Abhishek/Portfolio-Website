import { chromium } from "@playwright/test";
import fs from "node:fs";
const browser = await chromium.launch();
fs.mkdirSync("reports/visual", { recursive: true });
for (const width of [360, 768, 1440]) {
  for (const theme of ["light", "dark"]) {
    const page = await browser.newPage({
      viewport: { width, height: 1000 },
      colorScheme: theme,
    });
    for (const [name, route] of [
      ["home", "/"],
      ["work", "/projects/"],
      ["about", "/about/"],
      ["amagi", "/experience/amagi/"],
      ["writing", "/blog/eda-patterns-i-wish-i-knew/"],
    ]) {
      await page.goto(`http://127.0.0.1:4321${route}`);
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({
        path: `reports/visual/${name}-${width}-${theme}.png`,
        fullPage: true,
      });
    }
    await page.close();
  }
}
await browser.close();
console.log("Captured 30 production screenshots.");
