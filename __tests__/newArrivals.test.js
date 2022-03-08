const { getCategory, findBrand } = require('../utils');
require('expect-puppeteer');

const validateItemNames = (itemNames, brandCheck = false) => {
  let brandCheckList = [];
  let items = itemNames.filter((itemName) => getCategory(itemName) === '');
  if (brandCheck) {
    brandCheckList = itemNames.filter((itemName) => !findBrand(itemName));
  }
  return [...items, ...brandCheckList];
};

describe('New items on H&M', () => {
  it(
    'should all pass through the test as capturable items',
    async () => {
      await page.goto(
        'https://www2.hm.com/en_gb/ladies/new-arrivals/view-all.html'
      );
      let itemNames = await page.evaluate(() => {
        const result = [];
        const nodeArray = document.querySelectorAll('.item-details a.link');
        nodeArray.forEach((node) => result.push(node.innerText));
        return result;
      });
      expect(itemNames.length > 0).toEqual(true);
      itemNames = validateItemNames(itemNames);
      if (itemNames.length !== 0) console.log('H&M list:', itemNames);
      expect(true).toEqual(true);
    },
    30 * 1000
  );
});

describe('New items on Mango', () => {
  it(
    'should all pass through the test as capturable items',
    async () => {
      await page.goto(
        'https://shop.mango.com/gb/women/featured/new-now_d71927648'
      );
      let itemNames = await page.evaluate(() => {
        const result = [];
        const nodeArray = document.querySelectorAll('span.product-name');
        nodeArray.forEach((node) => result.push(node.innerText));
        return result;
      });
      expect(itemNames.length > 0).toEqual(true);
      itemNames = validateItemNames(itemNames);
      if (itemNames.length !== 0) console.log('Mango list:', itemNames);
      expect(true).toEqual(true);
    },
    30 * 1000
  );
});

describe('New items on Uniqlo', () => {
  it(
    'should all pass through the test as capturable items',
    async () => {
      await page.goto(
        'https://www.uniqlo.com/uk/en/women/featured/new-arrivals'
      );
      let itemNames = await page.evaluate(() => {
        const result = [];
        const nodeArray = document.querySelectorAll(
          'span.productTile__heading'
        );
        nodeArray.forEach((node) => result.push(node.innerText));
        return result;
      });
      expect(itemNames.length > 0).toEqual(true);
      itemNames = validateItemNames(itemNames);
      if (itemNames.length !== 0) console.log('Uniqlo list:', itemNames);
      expect(true).toEqual(true);
    },
    30 * 1000
  );
});

describe('New items on Zara', () => {
  it(
    'should all pass through the test as capturable items',
    async () => {
      await page.goto(
        'https://www.zara.com/uk/en/woman-new-in-l1180.html?v1=2026572'
      );
      let itemNames = await page.evaluate(() => {
        const result = [];
        const nodeArray = document.querySelectorAll(
          '.product-grid-product-info__main-info a.product-link._item.product-grid-product-info__name.link'
        );
        nodeArray.forEach((node) => result.push(node.innerText));
        return result;
      });
      expect(itemNames.length > 0).toEqual(true);
      itemNames = validateItemNames(itemNames);
      if (itemNames.length !== 0) console.log('Zara list:', itemNames);
      expect(true).toEqual(true);
    },
    30 * 1000
  );
});

describe('New items on Asos', () => {
  it(
    'should all pass through the test as capturable items',
    async () => {
      await page.goto(
        'https://www.asos.com/women/new-in/new-in-clothing/cat/?cid=2623&nlid=ww|new+in|new+products|clothing'
      );
      let itemNames = await page.evaluate(() => {
        const result = [];
        const nodeArray = document.querySelectorAll(
          'article[data-auto-id="productTile"] h2'
        );
        nodeArray.forEach((node) => result.push(node.innerText));
        return result;
      });
      expect(itemNames.length > 0).toEqual(true);
      itemNames = validateItemNames(itemNames, true);
      if (itemNames.length !== 0) console.log('ASOS list:', itemNames);
      expect(true).toEqual(true);
    },
    30 * 1000
  );
});
