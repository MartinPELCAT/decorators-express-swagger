import { Router } from "express";
import { generateApiDoc } from "../doc/apiDoc";
import { generateRoutes } from "../utils/routeUtils";
import { AuthorizedFunction } from "./Autorized";

export interface BuildApiOptions {
  apiUrl?: string;
  generateDocs?: boolean;
  docsUrl?: string;
  controllers: Array<Function>;
  auth?: AuthorizedFunction;
}

interface BuildApiObject {
  router: Router;
  docsUrl: string;
  apiUrl: string;
}

export const BuildAPI = (options: BuildApiOptions): BuildApiObject => {
  const router = Router({ caseSensitive: true });

  //Define default values
  options.apiUrl = options.apiUrl ?? "/api";
  options.generateDocs = options.generateDocs ?? true;
  options.docsUrl = options.docsUrl ?? "/api/doc";

  generateRoutes(router, options);

  if (options.generateDocs) {
    generateApiDoc(router, options.docsUrl);
  }
  const { docsUrl, apiUrl } = options;
  return { router, docsUrl, apiUrl };
};
