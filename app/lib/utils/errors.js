module.exports = () => {
  function extendError(msg) {
    this.name = this.constructor.name;
    if (msg !== null) {
      this.message = msg;
    }
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor.name);
    }
    else {
      this.stack = (new Error(msg)).stack;
    }
  }

  class NotFoundError extends Error {
    constructor(error) {
      super();
      extendError.call(this, error);
    }
  }

  class BadRequestError extends Error {
    constructor(error) {
      super();
      extendError.call(this, error);
    }
  }

  class BundleError extends Error {
    constructor(error) {
      super();
      extendError.call(this, error);
    }
  }

  class InternalServerError extends Error {
    constructor(error) {
      super();
      extendError.call(this, error);
    }
  }

  return {
    NotFoundError, BadRequestError, InternalServerError, BundleError
  };
};
