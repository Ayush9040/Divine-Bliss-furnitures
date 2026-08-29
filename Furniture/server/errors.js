export class ContactRequestError extends Error {
  constructor(message, { status = 500, errors = undefined } = {}) {
    super(message);
    this.name = 'ContactRequestError';
    this.status = status;
    this.errors = errors;
  }
}
