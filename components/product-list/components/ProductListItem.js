import React, {PropTypes, Component} from 'react';
import ToggleProductButton from './ToggleProductButton';
import Price from './Price';
import bemHelper from 'react-bem-helper';
import '../styles/components/product.scss';

const bem = bemHelper({ prefix: 'toga-', name: 'product-list-item' });

class ProductListItem extends Component {
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
      <li {...bem(null, {'removed': !!product.removed})}>
        <div {...bem('image-box')}>
          <a {...bem('image-link')} href={product.url} onClick={onProductLinkClick}>
            <img {...bem('product-image')} src={product.image} alt={product.title}/>
          </a>
          <ToggleProductButton listId={listId}
                               productRemoved={product.removed}
                               productCode={product.code}
                               actions={actions}/>
        </div>
        <a {...bem('title-link')} href={product.url} onClick={onProductLinkClick}>
          {product.title}
        </a>
        <div {...bem('partner-details')}>
          by
          <a {...bem('partner-link')} href={product.partnerUrl}>
            {product.partnerName}
          </a>
        </div>

        <Price price={product.price}/>

        <div {...bem('actions')}>
          <button {...bem('remove-button')} onClick={onRemoveButtonClick}>Remove</button>
        </div>
      </li>
    );
  }
}

ProductListItem.propTypes = {
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

export default ProductListItem;
