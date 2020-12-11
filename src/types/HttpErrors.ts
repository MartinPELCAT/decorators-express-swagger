interface HttpError {
  code: number;
}

export class Error404 extends Error implements HttpError {
  public code = 404;
  constructor(message: string) {
    super(message);
  }
}
export class Error403 extends Error implements HttpError {
  public code = 403;
  constructor(message: string) {
    super(message);
    this.code = 403;
  }
}

export class Error400 extends Error implements HttpError {
  public code = 400;
  constructor(message: string) {
    super(message);
  }
}
