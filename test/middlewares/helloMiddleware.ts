import { MiddlewareFunction } from "../../src/types/MiddlewareType";

export const helloMiddlware: MiddlewareFunction = (_req, _res, next) => {
  //The code
  next();
};
