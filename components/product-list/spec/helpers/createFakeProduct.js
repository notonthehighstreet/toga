import chanceFactory from 'chance';

const chance = chanceFactory();
const sensibleMaximum = 5;
const createFakeProductLink = () => {
  return {
    href: chance.url(),
    rel: chance.url()
  };
};
const createFakeImage = () => {
  return {
    href: chance.url({
      path: `system/product_images/images/001/882/138/{size}_${chance.word()}.${chance.pick(['jpg', 'png'])}`
    })
  };
};
const createFakeProduct = () => {
  return {
    product: {
      links: [
        {
          href: chance.url(),
          rel: chance.url({path: 'rels/site-link'})
        },
        ...chance.n(createFakeProductLink, chance.natural({max: sensibleMaximum}))
      ],
      images: chance.n(createFakeImage, chance.natural({min:1, max: sensibleMaximum})),
      title: chance.sentence({words: sensibleMaximum}),
      prices:[
        {currency: 'GBP', amount: chance.integer({min: 100, max: 10000})},
        {currency: 'AUD', amount: chance.integer({min: 100, max: 10000})},
        {currency: 'EUR', amount: chance.integer({min: 100, max: 10000})},
        {currency: 'USD', amount: chance.integer({min: 100, max: 10000})}
      ],
      partner: {
        name: chance.word(),
        links: [
          {
            href: chance.url(),
            rel: chance.url({path: 'rels/site-link'})
          },
          ...chance.n(createFakeProductLink, chance.natural({max: sensibleMaximum}))
        ]
      },
      code: chance.natural()
    }
  };
};

export default createFakeProduct;
