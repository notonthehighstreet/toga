import React from 'react';
import classnames from 'classnames';
import bemHelper from 'react-bem-helper';

import './styles.scss';

const bem = bemHelper({ prefix: 'n-', name: 'button' });
const sizes = ['small', 'medium', 'large'];

export default class Button extends React.Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    className: React.PropTypes.string,
    type: React.PropTypes.string,
    size: React.PropTypes.oneOf(sizes),
    fullWidth: React.PropTypes.bool,
    secondary: React.PropTypes.bool,
    href: React.PropTypes.string
  };

  static defaultProps = {
    size: sizes[0],
    fullWidth: false,
    secondary: false
  };

  render() {
    const { className, size, secondary, fullWidth, children, ...props } = this.props;

    const bemClasses = bem(null, [size, secondary ? 'secondary' : 'primary', fullWidth ? 'full-width' : undefined]).className;
    const classes = classnames(className, bemClasses);
    const tag = this.props.href ? 'a' : 'button';

    return React.createElement(tag, { className: classes, ...props }, children);
  }
}
