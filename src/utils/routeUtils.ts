import { Router } from "express";
import Container from "typedi";
import { BuildApiOptions } from "..";
import {
  authorizedMetadataKey,
  middlewareMetadataKey,
  routeMetadataKey,
} from "../metadatas/symbols";
import { ControllerMetadataType } from "../types/ControllerMetadataType";
import { MiddlewareType } from "../types/MiddlewareType";
import { RouteMetadataType } from "../types/RouteMetadataType";

export const getControllerRoutes = (
  target: Function
): Pick<ControllerMetadataType, "routes"> => {
  const routes: RouteMetadataType[] = Reflect.getOwnMetadata(
    routeMetadataKey,
    target
  );

  return { routes };
};

export const generateRoutes = (
  { routes, controllerUrl }: ControllerMetadataType,
  controller: any,
  router: Router,
  options?: BuildApiOptions
) => {
  routes.forEach((route) => {
    const authorized: string[] = Reflect.getOwnMetadata(
      authorizedMetadataKey,
      controller,
      route.key
    );

    if (authorized && !options.auth)
      throw new Error("Authorized function not provided");

    const authorizedMiddleware: MiddlewareType = (req, res, next) => {
      if (authorized === undefined) next();
      if (options.auth(authorized, { req, res })) {
        next();
      } else {
        res.status(403).send({ message: "Operation not authorized" });
      }
    };

    const middlewares: MiddlewareType[] =
      Reflect.getOwnMetadata(middlewareMetadataKey, controller, route.key) ||
      [];

    const url = options.baseUrl.concat(controllerUrl.concat(route.endpointUrl));

    const endPoint = controller.prototype[route.key].bind(
      Container.get(controller) // inject services to the controller
    );

    switch (route.method) {
      case "GET":
        router.get(url, authorizedMiddleware, middlewares, endPoint);
        break;
      case "POST":
        router.post(url, authorizedMiddleware, middlewares, endPoint);
        break;
      case "DELETE":
        router.delete(url, authorizedMiddleware, middlewares, endPoint);
        break;
      case "PUT":
        router.put(url, authorizedMiddleware, middlewares, endPoint);
        break;
      case "PATCH":
        router.patch(url, authorizedMiddleware, middlewares, endPoint);
        break;
    }
  });
};
