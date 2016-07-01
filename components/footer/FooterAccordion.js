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

    const {title, links } = this.props;

    return (
      <div id="about" className="toga-footerAccordion__list">
        <h2 className={`toga-footerAccordion__header ${this.state.open ? ' expanded':''}`} onClick={this.toggleContent}>{title}</h2>
        <ul className={`toga-footerAccordion__links ${this.state.open ? '':' hidden' }`}>
          { links && links.map((link, i) => {
            return <li className="toga-footerAccordion__link" key={i}><a href={link.href}>{link.name}</a></li>;
          })}
        </ul>
      </div>
    );
  }

  toggleContent() {
    this.setState({ open: !this.state.open});
  }
};
