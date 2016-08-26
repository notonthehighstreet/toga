import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Products from '../components/ProductList/ProductList';
import * as ListActions from '../actions';

const mapStateToProps = ({products, listId}) => {
  return {
    products, listId
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(ListActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
