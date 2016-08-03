import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ProductList from '../components/List';
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
