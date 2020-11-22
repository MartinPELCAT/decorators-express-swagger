import "reflect-metadata";
import { controllerMetadataKey, getRouteMetadataKey } from "../metadatas";

interface ControllerOptions {}

export const Controller = (controllerUrl: string): ClassDecorator => {
  return (target) => {
    const getRoutes = Reflect.getOwnMetadata(getRouteMetadataKey, target);

    const controllerObject = {
      controllerUrl,
      getRoutes,
    };
    Reflect.defineMetadata(controllerMetadataKey, controllerObject, target);
  };
};
