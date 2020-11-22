import "reflect-metadata";
import { controllerMetadataKey } from "../metadatas/symbols";
import { getControllerRoutes } from "../routes/getControllerRoutes";
import { ControllerMetadataType } from "../types/ControllerMetadataType";

// interface ControllerOptions {}

export const Controller = (controllerUrl: string): ClassDecorator => {
  return (target) => {
    const routes = getControllerRoutes(target);

    const controllerObject: ControllerMetadataType = {
      controllerUrl,
      ...routes,
    };
    Reflect.defineMetadata(controllerMetadataKey, controllerObject, target);
  };
};
