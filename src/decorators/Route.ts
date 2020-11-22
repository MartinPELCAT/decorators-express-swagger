import "reflect-metadata";
import {
  deleteRouteMetadataKey,
  getRouteMetadataKey,
  patchRouteMetadataKey,
  postRouteMetadataKey,
  putRouteMetadataKey,
} from "../metadatas/symbols";
import { RouteMetadataType } from "../types/RouteMetadataType";

export const Get = (endpointUrl: string): MethodDecorator => {
  return (target, key) => {
    applyRouteMetadata(target.constructor, getRouteMetadataKey, {
      endpointUrl,
      key: key.toString(),
    });
  };
};

export const Post = (endpointUrl: string): MethodDecorator => {
  return (target, key) => {
    applyRouteMetadata(target.constructor, postRouteMetadataKey, {
      endpointUrl,
      key: key.toString(),
    });
  };
};

export const Put = (endpointUrl: string): MethodDecorator => {
  return (target, key) => {
    applyRouteMetadata(target.constructor, putRouteMetadataKey, {
      endpointUrl,
      key: key.toString(),
    });
  };
};

export const Patch = (endpointUrl: string): MethodDecorator => {
  return (target, key) => {
    applyRouteMetadata(target.constructor, patchRouteMetadataKey, {
      endpointUrl,
      key: key.toString(),
    });
  };
};

export const Delete = (endpointUrl: string): MethodDecorator => {
  return (target, key) => {
    applyRouteMetadata(target.constructor, deleteRouteMetadataKey, {
      endpointUrl,
      key: key.toString(),
    });
  };
};

const applyRouteMetadata = (
  target: Function,
  symbol: Symbol,
  routeMeta: RouteMetadataType
) => {
  const routes: RouteMetadataType[] =
    Reflect.getOwnMetadata(symbol, target) || [];
  routes.push(routeMeta);
  Reflect.defineMetadata(symbol, routes, target);
};
