import React, {PropTypes, Component} from 'react';
import ToggleProductButton from './ToggleProductButton';
import Price from './Price';

class Product extends Component {
  render() {
    const {product, listId, actions, actions:{toggleProduct, gtm}} = this.props;
    const onRemoveButtonClick = () => {
      toggleProduct({
        listId,
        productCode: product.code,
        productRemoved: product.removed
      }, {
        event: 'toggleProduct',
        productCode: product.code,
        triggerSource: 'remove button'
      });
    };
    const onProductLinkClick = () => {
      gtm({
        event: 'productClick',
        productCode: product.code
      });
    };

    return (
      <li className={`product ${product.removed?'removed':''}`}>
        <div className="image-box box">
          <a className="image-link content" href={product.url} onClick={onProductLinkClick}>
            <img className="product-image" src={product.image} alt={product.title}/>
          </a>
          <ToggleProductButton listId={listId}
                               productRemoved={product.removed}
                               productCode={product.code}
                               actions={actions}/>
        </div>
        <a className="title-link" href={product.url} onClick={onProductLinkClick}>
          {product.title}
        </a>
        <div className="partner">
          by
          <a className="partner-link" href={product.partnerUrl}>
            {product.partnerName}
          </a>
        </div>

        <Price price={product.price}/>

        <div className="actions">
          <button className="remove-button" onClick={onRemoveButtonClick}>Remove</button>
        </div>
      </li>
    );
  }
}

Product.propTypes = {
  product: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    removed: PropTypes.bool.isRequired,
    price: PropTypes.object.isRequired
  }),
  actions: PropTypes.shape({
    toggleProduct: PropTypes.func.isRequired
  }),
  listId: PropTypes.string.isRequired
};

export default Product;
