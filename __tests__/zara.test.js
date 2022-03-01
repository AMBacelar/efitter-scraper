const { getMaterialsFromString, getCategory } = require('../utils');
const urls = require('../urls/zara.json');
require('expect-puppeteer');

describe('Zara tests', () => {
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
          let element = document.querySelector('.product-detail-info');
          if (typeof element != 'undefined' && element != null) {
            const womensSection = [
              ...document.querySelectorAll(
                'li.layout-categories-category--level-1'
              ),
            ].filter(
              (MenuElement) =>
                MenuElement.querySelector('a').innerText.toLowerCase() ===
                'woman'
            )[0];
            if (!womensSection.className.includes('is-blurred')) {
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
                .querySelector('h1.product-detail-info__header-name')
                .textContent.trim();

              // Size example
              sizeExample = document
                .querySelector('.product-detail-size-info')
                .textContent.trim();

              // Materials
              materials = document.querySelector(
                '.product-detail-extra-detail'
              ).innerText;

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
