import { Router } from "express";
import { controllerMetadataKey, getRouteMetadataKey } from "../metadatas";

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

export const BuildApi = ({
  baseUrl = "/api",
  generateDocs = true,
  docsUrl = "/api/docs",
  controllers = [],
  services = [],
  globalMiddleware = [],
}: Partial<BuildApiOptions>): BuildApiObject => {
  const router = Router();
  controllers.forEach((controller) => {
    const controllerMeta = Reflect.getOwnMetadata(
      controllerMetadataKey,
      controller
    );
    console.log(controller);

    controllerMeta.getRoutes.forEach((getRoute) => {
      router.get(
        controllerMeta.controllerUrl.concat(getRoute.endpointUrl),
        controller.prototype[getRoute.key]
      );
    });
  });

  return { router };
};
