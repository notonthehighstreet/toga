import React, {PropTypes, Component} from 'react';
import bemHelper from 'react-bem-helper';

import ProductListItem from '../ProductListItem/ProductListItem';

import './productList.scss';

const bem = bemHelper({ prefix: 'toga-', name: 'product-list' });

export default class ProductList extends Component {

  static propTypes = {
    products: PropTypes.array.isRequired,
    listId: PropTypes.string.isRequired
  };

  render() {
    const {listId, products} = this.props;

    return <ul {...bem()}>
      {products.map(product => <ProductListItem key={product.code}
                                                product={product}
                                                listId={listId}
                                                actions={this.props.actions}/>)}
    </ul>;
  }
}
