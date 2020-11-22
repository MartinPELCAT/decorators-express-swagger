import "reflect-metadata";
import { routeMetadataKey } from "../metadatas/symbols";
import { RouteMetadataType } from "../types/RouteMetadataType";

export const Get = (endpointUrl: string): MethodDecorator => {
  return (target, key) => {
    applyRouteMetadata(target.constructor, {
      method: "GET",
      endpointUrl,
      key: key.toString(),
    });
  };
};

export const Post = (endpointUrl: string): MethodDecorator => {
  return (target, key) => {
    applyRouteMetadata(target.constructor, {
      method: "POST",
      endpointUrl,
      key: key.toString(),
    });
  };
};

export const Put = (endpointUrl: string): MethodDecorator => {
  return (target, key) => {
    applyRouteMetadata(target.constructor, {
      method: "PUT",
      endpointUrl,
      key: key.toString(),
    });
  };
};

export const Patch = (endpointUrl: string): MethodDecorator => {
  return (target, key) => {
    applyRouteMetadata(target.constructor, {
      method: "PATCH",
      endpointUrl,
      key: key.toString(),
    });
  };
};

export const Delete = (endpointUrl: string): MethodDecorator => {
  return (target, key) => {
    applyRouteMetadata(target.constructor, {
      method: "DELETE",
      endpointUrl,
      key: key.toString(),
    });
  };
};

const applyRouteMetadata = (target: Function, routeMeta: RouteMetadataType) => {
  const routes: RouteMetadataType[] =
    Reflect.getOwnMetadata(routeMetadataKey, target) || [];
  routes.push(routeMeta);
  Reflect.defineMetadata(routeMetadataKey, routes, target);
};
