import { middlewareMetadataKey } from "../metadatas/symbols";
import {
  MiddlewareMetadataType,
  MiddlewareType,
} from "../types/MiddlewareType";

/**
 * @description Middleware decorator
 * @param middlwares all miffdlware function to execute before
 * @
 */
export const Middlewares = (
  middlewares: MiddlewareType[] | MiddlewareType
): MethodDecorator => {
  return (target, key) => {
    const ownMiddleware: MiddlewareMetadataType[] =
      Reflect.getOwnMetadata(middlewareMetadataKey, target) || [];

    Reflect.defineMetadata(
      middlewareMetadataKey,
      [...ownMiddleware, ...[middlewares]],
      target.constructor,
      key
    );
  };
};
