import "reflect-metadata";
import { getRouteMetadataKey } from "../metadatas";

export const Get = (endpointUrl: string): MethodDecorator => {
  return (target, key, descriptor) => {
    // const test = Reflect.getMetadata("design:returntype", target, key);
    // console.log(Object.keys(test));
    // console.log(test);

    const routes =
      Reflect.getOwnMetadata(getRouteMetadataKey, target.constructor) || [];
    routes.push({ endpointUrl, key });
    Reflect.defineMetadata(getRouteMetadataKey, routes, target.constructor);
  };
};

export const Post = (endpointUrl: string): MethodDecorator => {
  return (target, key, descriptor) => {};
};

export const Put = (endpointUrl: string): MethodDecorator => {
  return (target, key, descriptor) => {};
};

export const Patch = (endpointUrl: string): MethodDecorator => {
  return (target, key, descriptor) => {};
};

export const Delete = (endpointUrl: string): MethodDecorator => {
  return (target, key, descriptor) => {};
};
