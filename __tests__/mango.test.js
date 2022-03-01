const { getMaterialsFromString, getCategory } = require('../utils');
const urls = require('../urls/mango.json');
require('expect-puppeteer');

describe('Mango tests', () => {
  // beforeAll(() => {});
  urls.forEach((item) => {
    it(
      item.url,
      async () => {
        await page.goto(item.url);

        try {
          await page.click('#onetrust-accept-btn-handler');
        } catch (error) {}

        // Check Page
        const isPageValid = await page.evaluate(async () => {
          const url = document.location.href;
          if (url.includes('/women/') || url.includes('/plus-size/')) {
            const element = document.querySelector('#productDetailOption');
            const product_name =
              document.querySelector('h1.product-name').textContent;
            if (typeof element != 'undefined' && element != null) {
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
              product_name = product_name = document
                .querySelector('.product-name')
                .textContent.trim();

              // Size example
              sizeExample = document.querySelector('.sizes .single-size')
                ? document.querySelector('.sizes .single-size').textContent
                : document.querySelectorAll(
                    '.sizes .selector .selector-list span'
                  )[0].textContent;

              sizeExample = sizeExample.split('-')[0].trim();

              // Materials
              document
                .querySelectorAll('.product-info-text')
                .forEach((node, i) => {
                  if (node.textContent.toLowerCase().includes('composition:')) {
                    materials =
                      document.querySelectorAll('.product-info-text')[i]
                        .textContent;
                  }
                });

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
