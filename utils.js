const getMaterialsFromString = (inputString) => {
  const materials = [];
  matcharacteristic.forEach((material) => {
    if (inputString.toLowerCase().includes(material.Name.toLowerCase())) {
      materials.push(material.Name);
    }
  });
  const TencelIndex = materials.indexOf('Tencel');
  const lyocellIndex = materials.indexOf('Lyocell');
  const hasLyocell = lyocellIndex !== -1;
  const hasTencel = TencelIndex !== -1;
  if (hasLyocell && hasTencel) {
    materials.splice(TencelIndex, 1);
  }
  return materials;
};

const matcharacteristic = [
  {
    Name: 'Acrylic',
    Characteristic:
      'is lightweight, soft, and warm - similar to wool but it is machine washable.',
  },
  {
    Name: 'Canvas',
    Characteristic:
      "is durable, sturdy, and heavy duty. It's great for the outdoors.",
  },
  {
    Name: 'Cashmere',
    Characteristic:
      "is lighter and softer than sheep's wool but is much warmer.",
  },
  {
    Name: 'Chiffon',
    Characteristic: 'is sheer and lightweight and normally looks translucent.',
  },
  {
    Name: 'Cotton',
    Characteristic: 'is soft, breathable, lightweight, and durable.',
  },
  {
    Name: 'Elastane',
    Characteristic:
      "is elastic. It's blended with other fabric types to make them stretchy.",
  },
  {
    Name: 'Jersey',
    Characteristic: 'is a soft stretchy, knit fabric.',
  },
  {
    Name: 'Leather',
    Characteristic: 'is a strong, durable, and wrinkle-resistant fabric.',
  },
  {
    Name: 'Linen',
    Characteristic:
      'is breathable and naturally cool. It creases fairly easily.',
  },
  {
    Name: 'Lycra',
    Characteristic:
      "is elastic. It's blended with other fabric types to make them stretchy.",
  },
  {
    Name: 'Lyocell',
    Characteristic:
      'is soft, breathable, light and can be stretchy. This makes it ideal for sportswear.',
  },
  {
    Name: 'Modal',
    Characteristic: 'is soft and strong pricier alternative to cotton.',
  },
  {
    Name: 'Nylon',
    Characteristic: 'is strong, light, and stretchy.',
  },
  {
    Name: 'Polyamide',
    Characteristic: 'is strong, light, and stretchy.',
  },
  {
    Name: 'Polyester',
    Characteristic:
      'is durable and crease resistant. It can be reasonably stretchy and may feel sweaty when the weather is hot.',
  },
  {
    Name: 'Polyurethane',
    Characteristic:
      "is elastic. It's blended with other fabric types to make them stretchy.",
  },
  {
    Name: 'Rayon',
    Characteristic: 'is lightweight, flowy, and doesn’t wrinkle easily.',
  },
  {
    Name: 'Satin',
    Characteristic:
      'is soft, shiny and slightly elastic. It drapes so may not be form-fitting.',
  },
  {
    Name: 'Silk',
    Characteristic:
      'is strong and durable but also very lightweight with a sheen. It drapes so may not be form-fitting.',
  },
  {
    Name: 'Spandex',
    Characteristic:
      "is elastic. It's blended with other fabric types to make them stretchy.",
  },
  {
    Name: 'Suede',
    Characteristic:
      'is softer and thinner than traditional leather but is still very durable.',
  },
  {
    Name: 'Tencel',
    Characteristic:
      'is soft, breathable, light and can be stretchy. This makes it ideal for sportswear.',
  },
  {
    Name: 'Velvet',
    Characteristic:
      'is soft and shiny but also has drape, making it suitable for dresses or even upholstery.',
  },
  {
    Name: 'Viscose',
    Characteristic:
      'has a similar drape and smooth feel to silk. It is lightweight and flowy.',
  },
  {
    Name: 'Wool',
    Characteristic:
      'is soft and very warm. It has a little bit of stretch to it and it can be itchy if it is unlined.',
  },
];

const config = {
  validAsosBrands: [
    'ASOS',
    'ASOS DESIGN',
    'ASOS EDITION',
    'ASOS WHITE',
    'ASOS MADE IN',
    'ASOS 4505',
    'ASOS LUXE',
    'Reclaimed Vintage',
    'COLLUSION',
  ],

  brands: {
    asos: 'ASOS',
    bershka: 'Bershka',
    boohoo: 'Boohoo',
    hm: 'H&M',
    iSawItFirst: 'I Saw It First',
    mango: 'Mango',
    missguided: 'Missguided',
    monki: 'Monki',
    nakd: 'NA-KD',
    next: 'Next',
    otherStories: 'OtherStories',
    plt: 'PrettyLittleThing',
    pullBear: 'Pull&Bear',
    uniqlo: 'Uniqlo',
    zara: 'Zara',
  },

  categories: [
    {
      name: 'One-pieces',
      keywords: [
        'boiler suit',
        'boilersuit',
        'dress',
        'dungaree',
        'gown',
        'jumpsuit',
        'kimono',
        'LBD',
        'overall',
        'pinafore',
        'playsuit',
        'sundress',
        'unitard',
      ],
    },
    {
      name: 'Outerwear',
      keywords: [
        'blazer',
        'coat',
        'fleece',
        'gilet',
        'hoodie',
        'jacket',
        'overshirt',
        'overcoat',
        'parka',
        'poncho',
        'puffer',
        'raincoat',
        'shacket',
        'waistcoat',
        'trench',
      ],
    },
    {
      name: 'Tops',
      keywords: [
        'blouse',
        'bodice',
        'body',
        'bodysuit',
        'camisole',
        'cardigan',
        'chemise',
        'dashiki',
        'jumper',
        'leotard',
        'polo',
        'shirt',
        'shirtdress',
        'sweater',
        'sweatshirt',
        'tunic',
        't-shirt',
        'top',
        'vest',
      ],
    },
    {
      name: 'Bottoms',
      keywords: [
        'bell-bottom',
        'capri',
        'chino',
        'culotte',
        'flare',
        'jean',
        'jegging',
        'Jodhpur',
        'jogger',
        'khakis',
        'legging',
        'miniskirt',
        'sarong',
        'short',
        'skirt',
        'skort',
        'sport tight',
        'sports tight',
        'sweatpant',
        'tracksuit',
        'trouser',
        'trunks',
        'tutu',
      ],
    },
  ],
};

const getCategory = (product_name) => {
  return (
    config.categories.filter(
      (category) =>
        category.keywords.filter((keyword) =>
          product_name.toLowerCase().includes(keyword)
        ).length
    )[0]?.name || ''
  );
};

const findBrand = (stringContainingBrand) => {
  let itemBrand;
  const brandList = Object.keys(config.brands).reduce(
    (r, k) => r.concat(config.brands[k]),
    []
  );

  // asos test
  for (let i = 0; i < config.validAsosBrands.length; i++) {
    const asosBrand = config.validAsosBrands[i];
    if (stringContainingBrand.toLowerCase().includes(asosBrand.toLowerCase())) {
      itemBrand = config.brands.asos;
      return itemBrand;
    }
  }

  for (let i = 0; i < brandList.length; i++) {
    const viableBrand = brandList[i];
    if (
      stringContainingBrand.toLowerCase().includes(viableBrand.toLowerCase())
    ) {
      itemBrand = viableBrand;
      return itemBrand;
    }
  }
  return;
};

module.exports = {
  getMaterialsFromString,
  getCategory,
  findBrand,
};
