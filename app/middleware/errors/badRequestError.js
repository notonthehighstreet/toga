module.exports = () => {
  function BadRequestError(_message) {

    const error = Error.apply(this, arguments);
    error.name = this.name = 'badRequestError';

    this.message = _message || error.message;

    Object.defineProperty(this, 'stack', {
      get: function() {
        return error.stack;
      }
    });

    return this;
  }
  BadRequestError.prototype = Object.create(Error.prototype);
  return BadRequestError;
};
