import React, {PropTypes, Component} from 'react';

class ToggleProductButton extends Component {
  render() {
    const {actions:{toggleProduct}, productCode, productRemoved, listId} = this.props;
    const onClick = () => {
      toggleProduct({
        listId,
        productCode,
        productRemoved
      }, {
        event: 'toggleProduct',
        triggerSource: 'heart',
        productCode
      });
    };

    return <div className={`toggle-product-button ${productRemoved?'inactive':'active'}`} onClick={onClick}></div>;
  }
}

ToggleProductButton.propTypes = {
  productCode: PropTypes.number.isRequired,
  productRemoved: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    toggleProduct: PropTypes.func.isRequired
  }),
  listId: PropTypes.string.isRequired
};

export default ToggleProductButton;
