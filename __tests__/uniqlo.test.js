const { getMaterialsFromString, getCategory } = require('../utils');
const urls = require('../urls/uniqlo.json');
require('expect-puppeteer');

describe('Uniqlo tests', () => {
  // beforeAll(() => {});
  urls.forEach((item) => {
    test(
      item.url,
      async () => {
        await page.goto(item.url);

        try {
          await page.click('#onetrust-accept-btn-handler');
        } catch (error) {}

        // Check Page
        const isPageValid = await page.evaluate(async () => {
          const url = document.location.href;
          if (url.includes('/product/')) {
            const element = document.querySelector('h1');
            const product_name = document.querySelector('h1').textContent;
            if (element.textContent.toLowerCase().includes('women')) {
              return true;
            }
          }
          return false;
        });

        expect(isPageValid).toEqual(item.isPageValid);

        if (isPageValid) {
          const { product_name, sizeExample, materials } = await page.evaluate(
            async () => {
              let product_name, sizeExample, materials, isPageValid;

              // Product Name
              product_name = document
                .querySelector('h1, pdp__title')
                .textContent.trim();

              // Size example
              sizeExample = document
                .querySelectorAll('.swatchBox--size .swatch--size')[0]
                .textContent.replace(/\s/g, '');

              // Materials
              materials = document.querySelector(
                '.deliverySection__text'
              ).textContent;

              return { product_name, sizeExample, materials, isPageValid };
            }
          );

          expect(product_name).toEqual(item.itemName);
          expect(sizeExample).toEqual(item.exampleSize);
          expect(getMaterialsFromString(materials)).toEqual(item.materials);
          expect(getCategory(product_name)).toEqual(item.category);
        }
      },
      30 * 1000
    );
  });
});
