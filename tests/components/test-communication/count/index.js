import React from 'react';
import BEMHelper from 'react-bem-helper';

import './styles.scss';

const bem = new BEMHelper({  prefix: 'test-', name: 'counted' });

module.exports = ({ count, className, ...props }) => {
  return (
    <div { ...bem(null, null, className) } { ...props } >
      <span { ...bem('desc') }>Total : </span>
      <strong { ...bem('amount') }>{ count }</strong>
    </div>
  );
};
