import React from 'react';
import bemHelper from 'react-bem-helper';

import './styles.scss';

const bem = bemHelper({ prefix: 'toga-', name: 'copyright' });

export default () =>
  <div { ...bem() }>
    Copyright © 2006–2016 <span { ...bem('company-name') }>Notonthehighstreet Enterprises Limited</span>
  </div>;

