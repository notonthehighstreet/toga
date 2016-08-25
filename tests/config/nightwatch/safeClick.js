exports.command = function safeClick(selector, callback) {
  var browser = this;// eslint-disable-line

  browser
    .scrollElementToCenter(selector)
    .click(selector, function() {
      if (typeof callback === 'function') {
        callback.call(browser);
      }
    })
    .pause(10);

  return this;
};
