import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const errors = [];
page.on("console", (msg) => { if (msg.type() === "error") errors.push(msg.text()); });
page.on("pageerror", (err) => errors.push(String(err)));
page.on("requestfailed", (req) => {
  if (req.url().includes("/img/solutions/")) errors.push(`image failed: ${req.url()}`);
});

await page.goto("http://localhost:3000/solutions", { waitUntil: "networkidle" });

const jumpLinks = await page.locator("#products a").count();
console.log("Jump links count (expect 6):", jumpLinks);

const sectionIds = await page.evaluate(() =>
  Array.from(document.querySelectorAll("[id^='eazz-']")).map((el) => el.id),
);
console.log("Section ids:", sectionIds);

const images = await page.locator("img[src*='/img/solutions/']").count();
console.log("Product images rendered:", images);

console.log("Errors:", errors);

await page.screenshot({ path: ".tmp-solutions-top.png" });
await page.locator("#eazz-track").scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
await page.screenshot({ path: ".tmp-solutions-mid.png" });

await browser.close();
