import { Router } from "express";
import { generateApiDoc } from "../doc/apiDoc";
import { generateRoutes } from "../utils/routeUtils";
import { AuthorizedFunction } from "./Autorized";

export interface BuildApiOptions {
  apiUrl?: string;
  generateDocs?: boolean;
  docUrl?: string;
  controllers: Array<Function>;
  auth?: AuthorizedFunction;
}

interface BuildApiObject {
  router: Router;
  apiUrl: string;
  docUrl: string;
}

export const BuildAPI = (options: BuildApiOptions): BuildApiObject => {
  const router = Router({ caseSensitive: true });

  //Define default values
  options.apiUrl = options.apiUrl ?? "/api";
  options.generateDocs = options.generateDocs ?? true;
  options.docUrl = options.docUrl ?? "/api/doc";

  generateRoutes(router, options);

  if (options.generateDocs) {
    generateApiDoc(router, options.docUrl);
  }

  const { apiUrl, docUrl } = options;
  return { router, apiUrl, docUrl };
};
