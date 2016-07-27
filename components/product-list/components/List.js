import React, {PropTypes, Component} from 'react';
import Product from './Product';

class List extends Component {
  render() {
    const {listId, products} = this.props;

    return <ul className="products">
      {products.map(product => <Product key={product.code} 
                                        product={product} 
                                        listId={listId}
                                        actions={this.props.actions}/>)}
    </ul>;
  }
}

List.propTypes = {
  products: PropTypes.array.isRequired,
  listId: PropTypes.string.isRequired
};

export default List;
