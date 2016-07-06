import React from 'react';

module.exports = class FooterAccordion extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false
    };

    this.toggleContent = this.toggleContent.bind(this);
  }

  render() {

    const {title, children, className, ...props } = this.props;

    return (
      <div id="about" className={`toga-footerAccordion__list ${className ? className : ''}`} {...props} >
        <h2 className={`toga-footerAccordion__header ${this.state.open ? ' expanded':''}`} onClick={this.toggleContent}>{title}</h2>
        <div className={`toga-footerAccordion__content ${this.state.open ? '':' hidden-mobile' }`}>
          { children }
        </div>
      </div>
    );
  }

  toggleContent() {
    this.setState({ open: !this.state.open});
  }
};
