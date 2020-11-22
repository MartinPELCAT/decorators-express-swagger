import { Router } from "express";
import Container from "typedi";
import { AuthorizedFunction } from "../decorators/Autorized";
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
  auth?: AuthorizedFunction
) => {
  routes.forEach((route) => {
    const authorized: string[] = Reflect.getOwnMetadata(
      authorizedMetadataKey,
      controller,
      route.key
    );

    if (authorized && !auth)
      throw new Error("Authorized function not provided");

    const auto: MiddlewareType = (req, res, next) => {
      if (authorized === undefined) next();
      if (auth(authorized, { req, res })) {
        next();
      } else {
        res.status(403).send({ message: "Operation not authorized" });
      }
    };

    const middlewares: MiddlewareType[] =
      Reflect.getOwnMetadata(middlewareMetadataKey, controller, route.key) ||
      [];

    const url = controllerUrl.concat(route.endpointUrl);

    const endPoint = controller.prototype[route.key].bind(
      Container.get(controller) // inject services to a controller
    );

    switch (route.method) {
      case "GET":
        router.get(url, auto, middlewares, endPoint);
        break;
      case "POST":
        router.post(url, auto, middlewares, endPoint);
        break;
      case "DELETE":
        router.delete(url, auto, middlewares, endPoint);
        break;
      case "PUT":
        router.put(url, auto, middlewares, endPoint);
        break;
      case "PATCH":
        router.patch(url, auto, middlewares, endPoint);
        break;
    }
  });
};
