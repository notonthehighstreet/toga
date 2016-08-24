import React, {PropTypes, Component} from 'react';
import bemHelper from 'react-bem-helper';

import ToggleProductButton from '../ToggleProductButton/ToggleProductButton';
import Price from '../Price/Price';

import './productListItem.scss';

const bem = bemHelper({ prefix: 'toga-', name: 'product-list-item' });

export default class ProductListItem extends Component {

  constructor(props) {
    super(props);
    this.onRemoveButtonClick = this.onRemoveButtonClick.bind(this);
  }

  static propTypes = {
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

  onRemoveButtonClick(source) {
    const {product, listId, actions:{ toggleProduct }} = this.props;
    toggleProduct({
      listId,
      productCode: product.code,
      productRemoved: product.removed
    }, {
      event: 'toggleProduct',
      productCode: product.code,
      triggerSource: source
    });
  }

  render() {
    const {product, listId, actions } = this.props;

    return (
      <li {...bem(null, {'removed': !!product.removed})}>
        <div {...bem('image-box')}>
          <img {...bem('product-image')} src={product.image} alt={product.title}/>
          <ToggleProductButton listId={listId}
                               productRemoved={product.removed}
                               productCode={product.code}
                               actions={actions}/>
        </div>
        <span {...bem('title-link')}>
          {product.title}
        </span>
        <Price price={product.price}/>

        <div {...bem('actions')}>
          <button {...bem('remove-button')} onClick={() => this.onRemoveButtonClick('remove button')}>Remove</button>
        </div>
      </li>
    );
  }
}
