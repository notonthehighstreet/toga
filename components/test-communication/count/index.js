import React from 'react';
import classNames from 'classnames';
import BEMHelper from 'react-bem-helper';

import './styles.scss';

const bem = new BEMHelper({  prefix: 'test-', name: 'counted' });

module.exports = ({ count, className, ...props }) => {
  const classes = classNames(bem(null).className, className);

  return (
    <div className={ classes } { ...props } >
      <span { ...bem('desc') }>Total : </span>
      <strong { ...bem('amount') }>{ count }</strong>
    </div>
  );
};
