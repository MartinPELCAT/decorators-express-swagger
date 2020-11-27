export class Error404 extends Error {
  public code: number;
  constructor(message: string) {
    super(message);
    this.code = 404;
  }
}
export class Error403 extends Error {
  public code: number;
  constructor(message: string) {
    super(message);
    this.code = 403;
  }
}

export class Error400 extends Error {
  public code: number;
  constructor(message: string) {
    super(message);
    this.code = 400;
  }
}
