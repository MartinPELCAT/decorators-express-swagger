import { MiddlewareFunction } from "../../src/";

export const helloMiddlware: MiddlewareFunction = (_req, _res, next) => {
  //The code
  next();
};
