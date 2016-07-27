import React from 'react';
import bemHelper from 'react-bem-helper';

import './styles.scss';

const bem = bemHelper({ prefix: 'toga-', name: 'links-list' });

const FooterLinks = ({ links, className, ...props }) => {
  return (
    <ul { ...bem(null, null, className) } { ...props }>
      { links && links.map((link, i) => {
        const { label, screenReaderLabel, name, ...linkProps } = link;
        const displayLabel = screenReaderLabel
          ? <span className="sr-only">{screenReaderLabel}</span>
          : label;
        return (
          <li key={i}>
            <a { ... bem('link', name, className) } { ...linkProps }>{ displayLabel }</a>
          </li>
        );
      })}
    </ul>
  );
};

export default FooterLinks;
