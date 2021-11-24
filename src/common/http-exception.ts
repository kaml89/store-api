export class ApplicationError extends Error {
  statusCode?: number;
  status?: number;
  message: string;
  error: string | null;
  constructor(
    statusCode: number,
    message: string = "an error occurred",
    error?: string | null
  ) {
    super(message);

    this.statusCode = statusCode || 500;
    this.message = message;
    this.error = error || null;
  }
}

export class NotFoundError extends ApplicationError {
  constructor(message) {
    super(404, message || "resource not found");
  }
}
