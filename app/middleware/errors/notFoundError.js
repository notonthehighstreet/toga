module.exports = () => {
  function NotFoundError(_message) {

    const error = Error.apply(this, arguments);
    error.name = this.name = 'NotFoundError';

    this.message = _message || error.message;

    Object.defineProperty(this, 'stack', {
      get: function() {
        return error.stack;
      }
    });

    return this;
  }
  NotFoundError.prototype = Object.create(Error.prototype);
  return NotFoundError;
};
