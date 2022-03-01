const { getMaterialsFromString, getCategory } = require('../utils');
const urls = require('../urls/asos.json');
require('expect-puppeteer');

describe('ASOS tests', () => {
  // beforeAll(() => {});
  urls.forEach((item) => {
    it(
      item.url,
      async () => {
        await page.goto(item.url);

        // Check Page
        const isPageValid = await page.evaluate(async () => {
          const validAsosBrands = [
            'ASOS',
            'ASOS DESIGN',
            'ASOS EDITION',
            'ASOS WHITE',
            'ASOS MADE IN',
            'ASOS 4505',
            'ASOS LUXE',
            'Reclaimed Vintage',
            'COLLUSION',
          ];
          let element = document.querySelector('#product-details');
          if (typeof element != 'undefined' && element != null) {
            // product page

            const breadcrumbHasWomen = document
              .querySelector("[aria-label='breadcrumbs']")
              .innerText.toLowerCase()
              .includes('women');
            const pageSectionStyles =
              document.querySelector('#women-floor').className ===
              'TO7hyVB _3B0kHbC _3AH1eDT Tar7aO0';
            if (pageSectionStyles || breadcrumbHasWomen) {
              // womans clothing
              const product_name = document.querySelector('h1').textContent;
              const brand = document.querySelectorAll(
                'div.product-description a'
              )[1].innerText;
              // brand
              const index = validAsosBrands.findIndex((value) =>
                brand.toLowerCase().includes(value.toLowerCase())
              );
              if (index >= 0) return true;
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
              product_name = document.querySelector('h1').textContent.trim();

              // Size example
              sizeExample = document
                .querySelectorAll(
                  '.colour-size-select [data-id="sizeSelect"] option'
                )[1]
                .textContent.replaceAll('UK', '')
                .replaceAll('EU', '')
                .trim();

              // Materials
              materials = document.querySelector('.about-me').textContent; // about me section has the material info

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
