import React, { PropTypes } from 'react';
import bemHelper from 'react-bem-helper';

const bem = bemHelper({ prefix: 'toga-', name: 'svg' });

const Svg = ({ markup, className, ...props }) => {
  const isBase64 = typeof markup === 'string' && markup.indexOf('data') === 0;
  const classes = bem(null, null, className);
  return isBase64
    ? <img src={markup} { ...classes } {...props} />
    : <div dangerouslySetInnerHTML={{ __html: markup }} { ...classes } {...props} ></div>;
};

Svg.propTypes = {
  markup: PropTypes.string.isRequired,
};

export default Svg;
