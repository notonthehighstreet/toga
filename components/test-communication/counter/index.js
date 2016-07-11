import React from 'react';
import classNames from 'classnames';
import BEMHelper from 'react-bem-helper';

import './styles.scss';

const bem = new BEMHelper({  prefix: 'test-', name: 'counter' });

module.exports = class Counter extends React.Component {

  render() {
    const { className, children, ...props } = this.props;
    const classes = classNames(bem(null).className, className);
    
    return (
        <button className={ classes } { ...props }>{ children }</button>
    );
  }
};
