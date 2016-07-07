import React from 'react';

module.exports = ({links}) =>
  <ul className="toga-footerAccordion__links">
    { links && links.map((link, i) => {
      return <li className="toga-footerAccordion__link" key={i}><a href={link.href}>{link.name}</a></li>;
    })}
  </ul>;
