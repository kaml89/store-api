export class ApplicationError extends Error {
  statusCode: number;
  message: string;
  error: string | null;
  constructor(
    statusCode: number,
    message: string = "an error occurred",
    error?: string | null
  ) {
    super(message);
    Object.setPrototypeOf(this, ApplicationError.prototype);

    this.statusCode = statusCode || 500;
    this.message = message;
    this.error = error || null;

    Error.captureStackTrace(this);
  }
}

export class NotFoundError extends ApplicationError {
  constructor(message) {
    super(404, message || "resource not found");
  }
}
