import React from 'react';
import classnames from 'classnames';
import bemHelper from 'react-bem-helper';

import getComponent from './getComponent';
import './styles.scss';

const bem = bemHelper({ prefix: 'toga-', name: 'accordion'});

const Title = ({ className, expanded, tag = 'h2', children,  ...props }) => {
  const classes = classnames(bem('title').className, { expanded }, className);
  return React.createElement(tag, { className: classes, ...props}, children);
};

const Content = ({ className, expanded, tag = 'div', children,  ...props }) => {
  const classes = classnames(bem('content').className, { 'hidden--mobile': !expanded }, className);
  return React.createElement(tag, { className: classes, ...props}, children);
};

class Accordion extends React.Component {

  constructor() {
    super();
    this.state = {
      expanded: false
    };
    this.toggleContent = this.toggleContent.bind(this);
  }

  toggleContent() {
    this.setState({ expanded: !this.state.expanded});
  }

  render() {
    const { children, tag = 'div', className, ...props } = this.props;
    const { expanded } = this.state;

    const classes = classnames(bem().className, className);
    const title = getComponent(children, Title);
    const content = getComponent(children, Content);
    const headerProps = { expanded, onClick: this.toggleContent };
    const contentProps = { expanded };
    const accordionProps = { className: classes, ...props };
    const headerClone = title ? React.cloneElement(title, headerProps) : null;
    const contentClone = content ? React.cloneElement(content, contentProps) : null;

    return React.createElement(tag, accordionProps, headerClone, contentClone);
  }
}

Accordion.Title = Title;
Accordion.Content = Content;

export default Accordion;
