import { Router } from "express";
import Container from "typedi";
import { middlewareMetadataKey, routeMetadataKey } from "../metadatas/symbols";
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
  router: Router
) => {
  routes.forEach((route) => {
    const url = controllerUrl.concat(route.endpointUrl);

    const middlewares: MiddlewareType[] =
      Reflect.getOwnMetadata(middlewareMetadataKey, controller, route.key) ||
      [];

    const endPoint = controller.prototype[route.key].bind(
      Container.get(controller) // inject services to a controller
    );

    switch (route.method) {
      case "GET":
        router.get(url, middlewares, endPoint);
        break;
      case "POST":
        router.post(url, middlewares, endPoint);
        break;
      case "DELETE":
        router.delete(url, middlewares, endPoint);
        break;
      case "PUT":
        router.put(url, middlewares, endPoint);
        break;
      case "PATCH":
        router.patch(url, middlewares, endPoint);
        break;
    }
  });
};
