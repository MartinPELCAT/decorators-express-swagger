import { MiddlewareFunction } from "../../src";

export const testMiddlware: MiddlewareFunction = (_req, _res, next) => {
  //The code
  next();
};
