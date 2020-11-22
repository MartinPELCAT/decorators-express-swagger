import { MiddlewareType } from "../../src/types/MiddlewareType";

export const helloMiddlware: MiddlewareType = (_req, _res, next) => {
  console.log("Hello middleware");
  next();
};
