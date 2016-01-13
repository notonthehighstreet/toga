const React = require('react');
const ReactDom = require('react-dom/server');
const Polyglot = require('node-polyglot');
const phrases = require('./i18n.json');
const Copyright = React.createClass({
  render: function() { //TODO include the `t` function more like in a React way plx
    return (
      <div className="copyright">&copy; 2016 - {this.props.t('THANKS')}</div>
    );
  }
});

exports.render = (options, callback) => {
  const polyglot = new Polyglot({
    phrases: phrases[options.locale]
  });
  const t = polyglot.t.bind(polyglot);
  const html = ReactDom.renderToString(<Copyright t={t}/>);

  callback(html);
};
