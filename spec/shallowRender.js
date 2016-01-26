const TestUtils = require('react-addons-test-utils');
const React = require('react');

module.exports = (Component) => {
  const renderer = TestUtils.createRenderer();

  renderer.render(<Component/>);

  return renderer.getRenderOutput();
};
