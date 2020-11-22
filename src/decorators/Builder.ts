import { Router } from "express";
import Container from "typedi";
import {
  controllerMetadataKey,
  middlewareMetadataKey,
} from "../metadatas/symbols";
import { ControllerMetadataType } from "../types/ControllerMetadataType";
import { MiddlewareType } from "../types/MiddlewareType";

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
      const middlewares: MiddlewareType[] =
        Reflect.getOwnMetadata(
          middlewareMetadataKey,
          controller,
          getRoute.key
        ) || [];

      router.get(
        controllerMeta.controllerUrl.concat(getRoute.endpointUrl),
        middlewares,
        controller.prototype[getRoute.key].bind(
          Container.get(controller) // inject services to a controller
        )
      );
    });
  });

  return { router };
};
