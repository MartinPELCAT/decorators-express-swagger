import { MiddlewareType } from "../../src/types/MiddlewareType";

export const testMiddlware: MiddlewareType = (_req, _res, next) => {
  console.log("test middleware");
  next();
};
