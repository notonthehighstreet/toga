import React from 'react';
import bemHelper from 'react-bem-helper';
import deepAssign from 'deep-assign';
import passPropsToComponent from './passPropsToComponent';

import './styles.scss';

const bem = bemHelper({ prefix: 'toga-', name: 'accordion'});
let accordionTabCount = 0;

const Header = ({ className, expanded, tag = 'h3', children,  ...props }) => {
  const classes = bem('header',  null, { [className]: true });
  const link = <a href="#" onClick={(e) => e.preventDefault() }>{children}</a>;
  const headerProps = {
    role: 'tab',
    'aria-expanded': !!expanded,
    id: `accordion-tab-${accordionTabCount}`,
    ...classes, ...props
  };
  return children ? React.createElement(tag, headerProps, link) : null;
};

const Panel = ({ className, expanded, tag = 'div', children,  ...props }) => {
  const classes = bem('panel', null, { [className]: !!className } );
  const panelProps = {
    role: 'tabPanel',
    'aria-hidden' : !expanded,
    ...classes, ...props
  };
  return children ? React.createElement(tag, panelProps, children) : null;
};

class Accordion extends React.Component {

  constructor() {
    super();
    this.state = {
      expandedItems: {}
    };
    this.togglePanel = this.togglePanel.bind(this);
  }

  isExpanded(item) {
    return !!this.state.expandedItems[item];
  }

  togglePanel(item) {
    const selected =  !!this.state.expandedItems[item];
    const expandedItems = deepAssign({}, this.state.expandedItems, { [item]: !selected });
    this.setState({ expandedItems: expandedItems });
  }

  render() {
    const { children, tag = 'div', className, ...props } = this.props;
    const classes = bem(null, null, className);
    const accordionProps = { role: 'tablist', ...classes, ...props };
    let count = 0;
    const accordionChildren = children
      && [].concat(children).map((child) => {
        if (child.type !== Accordion.Panel) {
          count++;
        }
        const id = `accordion-${count}`;
        const expanded = this.isExpanded(id);
        const headerProps = { expanded, id, onClick: () => this.togglePanel(id) };
        const panelProps = { expanded, 'aria-labelledby': id };

        return passPropsToComponent(child, [
          { Component: Header, props: headerProps },
          { Component: Panel, props: panelProps }
        ]);
      });

    return React.createElement(tag, accordionProps, accordionChildren);
  }
}

Accordion.Header = Header;
Accordion.Panel = Panel;

export default Accordion;
