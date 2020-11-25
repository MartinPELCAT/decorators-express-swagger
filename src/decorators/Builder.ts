import { Router } from "express";
import { generateRoutes } from "../utils/routeUtils";
import { AuthorizedFunction } from "./Autorized";

export interface BuildApiOptions {
  baseUrl?: string;
  generateDocs?: boolean;
  docsUrl?: string;
  controllers?: Array<Function>;
  globalMiddleware?: Array<any>;
  auth?: AuthorizedFunction;
}

interface BuildApiObject {
  router: Router;
}

export const BuildAPI = (options: BuildApiOptions): BuildApiObject => {
  const router = Router({ caseSensitive: true });

  //Define default values
  options.baseUrl = options.baseUrl ?? "/api";
  options.generateDocs = options.generateDocs ?? true;

  generateRoutes(router, options);

  return { router };
};
