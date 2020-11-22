import { Router } from "express";
import { controllerMetadataKey } from "../metadatas/symbols";
import { ControllerMetadataType } from "../types/ControllerMetadataType";
import { generateRoutes } from "../utils/routeUtils";

interface BuildApiOptions {
  baseUrl?: string;
  generateDocs?: boolean;
  docsUrl?: string;
  controllers?: Array<any>;
  services?: Array<any>;
  globalMiddleware?: Array<any>;
}

interface BuildApiObject {
  router: Router;
}

export const BuildApi = (options: BuildApiOptions): BuildApiObject => {
  const router = Router();
  options.controllers.forEach((controller) => {
    const controllerMeta: ControllerMetadataType = Reflect.getOwnMetadata(
      controllerMetadataKey,
      controller
    );

    generateRoutes(controllerMeta, controller, router);
  });

  return { router };
};
