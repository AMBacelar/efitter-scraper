const { getMaterialsFromString, getCategory } = require('../utils');
const urls = require('../urls/hm.json');
require('expect-puppeteer');

describe('H&M tests', () => {
  // beforeAll(async () => {});
  urls.forEach((item) => {
    it(
      item.url,
      async () => {
        await page.goto(item.url);
        try {
          await page.click('#onetrust-accept-btn-handler');
        } catch (error) {}

        const { isPageValid, product_name, sizeExample, materials } =
          await page.evaluate(async () => {
            let product_name, sizeExample, materials, isPageValid;

            // Check page
            let element = document.querySelector('.product');
            if (typeof element != 'undefined' && element != null) {
              const product_name = document.querySelector(
                '.product-item-headline'
              ).textContent;
              const breadcrumbs = document
                .querySelector('nav.breadcrumbs')
                .innerText.toLowerCase();
              const breadcrumbArray = breadcrumbs.split('  ');
              if (breadcrumbArray.length < 3) {
                isPageValid = true;
              } else {
                if (
                  breadcrumbs.includes('women') ||
                  breadcrumbs.includes('divided')
                ) {
                  isPageValid = true;
                }
              }
            }
            // Check Page end

            if (!isPageValid) {
              return {
                product_name: '',
                sizeExample: '',
                materials: '',
                isPageValid: false,
              };
            }

            product_name = document
              .querySelector('.product-item-headline')
              .textContent.trim();
            sizeExample = document.querySelectorAll(
              '.picker-option .option .value'
            )[1].textContent;

            materials = new Array();
            document.querySelector('.js-open-more-details').click();

            // await elementAppear('.details-attributes-list-item');
            var materials_li = document.querySelectorAll(
              '.details-attributes-list-item'
            );
            for (let i = 0; i < materials_li.length; i++) {
              if (materials_li[i].firstChild.textContent == 'Composition') {
                materials = materials_li[i].textContent;
              }
            }

            document.querySelector('.icon-close-black').click();

            return { product_name, sizeExample, materials, isPageValid };
          });
        expect(product_name).toEqual(item.itemName);
        expect(sizeExample).toEqual(item.exampleSize);
        expect(getMaterialsFromString(materials)).toEqual(item.materials);
        expect(getCategory(product_name)).toEqual(item.category);
        expect(isPageValid).toEqual(item.isPageValid);
      },
      30 * 1000
    );
  });
});
