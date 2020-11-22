import "reflect-metadata";
import { controllerMetadataKey } from "../metadatas/symbols";
import { getControllerRoutes } from "../routes/getControllerRoutes";
import { ControllerMetadata } from "../types/ControllerMetadatas";

// interface ControllerOptions {}

export const Controller = (controllerUrl: string): ClassDecorator => {
  return (target) => {
    const routes = getControllerRoutes(target);

    const controllerObject: ControllerMetadata = {
      controllerUrl,
      ...routes,
    };
    Reflect.defineMetadata(controllerMetadataKey, controllerObject, target);
  };
};
