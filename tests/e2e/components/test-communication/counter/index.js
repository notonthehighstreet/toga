import React from 'react';
import BEMHelper from 'react-bem-helper';

import './styles.scss';

const bem = new BEMHelper({  prefix: 'test-', name: 'counter' });

module.exports = function Counter({ className, children, ...props }) {
  return (<button { ...bem(null, null, className) } { ...props }>{ children }</button>);
};
