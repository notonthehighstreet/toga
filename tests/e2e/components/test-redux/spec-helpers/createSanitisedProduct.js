export default (product) => {
  return {
    url: product.links[0].href,
    image: product.images[0].href.replace('{size}', 'preview'),
    title: product.title,
    price: product.prices[0],
    code: product.code
  };
};
