import React, {PropTypes, Component} from 'react';
import bemHelper from 'react-bem-helper';

import Svg from '../../../svg';
import heart from '../../../lib/svg/heart.svg';

import './toggleProductButton.scss';

const bem = bemHelper({prefix: 'toga-', name: 'toggle-product-button'});

export default class ToggleProductButton extends Component {

  static propTypes = {
    productCode: PropTypes.number.isRequired,
    productRemoved: PropTypes.bool.isRequired,
    actions: PropTypes.shape({
      toggleProduct: PropTypes.func.isRequired
    }),
    listId: PropTypes.string.isRequired
  };

  onClick(source) {
    const {actions:{toggleProduct}, productCode, productRemoved, listId} = this.props;
    toggleProduct({
      listId,
      productCode,
      productRemoved
    }, {
      event: 'toggleProduct',
      triggerSource: source,
      productCode
    });
  }

  render() {
    const {productRemoved} = this.props;

    return (
      <div {...bem(null, productRemoved ? 'inactive' : 'active')} onClick={() => this.onClick('heart')}>
        <Svg markup={heart} />
      </div>
    );
  }
}
