import React from 'react';
import classnames from 'classnames';
import bemHelper from 'react-bem-helper';

const bem = bemHelper({ prefix: 'toga-', name: 'links-list' });

const FooterLinks = ({ links, className, ...props }) => {
  const linksClass = classnames(bem().className, className);
  return (
    <ul className={ linksClass } { ...props }>
      { links && links.map((link, i) => {
        const { label, name, ...linkProps } = link;
        const linkClass = classnames(bem('link', name).className, className);
        return (
          <li key={i}>
            <a className={ linkClass } { ...linkProps }>{ label }</a>
          </li>
        );
      })}
    </ul>
  );
};

export default FooterLinks;
