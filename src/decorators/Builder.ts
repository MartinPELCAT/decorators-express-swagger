import { Router } from "express";
import Container from "typedi";
import { controllerMetadataKey } from "../metadatas/symbols";
import { ControllerMetadataType } from "../types/ControllerMetadatas";

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

    controllerMeta.getRoutes.forEach((getRoute) => {
      router.get(
        controllerMeta.controllerUrl.concat(getRoute.endpointUrl),
        controller.prototype[getRoute.key].bind(
          Container.get(controller) // inject services to a controller
        )
      );
    });
  });

  return { router };
};
