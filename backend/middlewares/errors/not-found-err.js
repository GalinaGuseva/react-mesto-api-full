const { NOT_FOUND } = require('./error-code');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND;
  }
}

module.exports = NotFoundError;
