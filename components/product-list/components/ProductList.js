import React, {PropTypes, Component} from 'react';
import ProductListItem from './ProductListItem';
import bemHelper from 'react-bem-helper';
import '../styles/components/products.scss';

const bem = bemHelper({ prefix: 'toga-', name: 'product-list' });

class ProductList extends Component {
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

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  listId: PropTypes.string.isRequired
};

export default ProductList;
