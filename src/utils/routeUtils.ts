import { Request, Response, Router } from "express";
import Container from "typedi";
import { BuildApiOptions } from "..";
import {
  AUTHORIZED_METADATA_KEY,
  BODY_METADATA_KEY,
  CTX_METADATA_KEY,
  MIDDLEWARE_METADATA_KEY,
  PARAMS_METADATA_KEY,
  QUERY_METADATA_KEY,
  ROUTE_METADATA_KEY,
} from "../metadatas/symbols";
import { ControllerMetadataType } from "../types/ControllerMetadataType";
import { MiddlewareFunction } from "../types/MiddlewareType";
import { RouteMetadataType } from "../types/RouteMetadataType";
import { AuthorizedFunction } from "./AuthorizedFunction";

export const getControllerRoutes = (
  target: Function
): Pick<ControllerMetadataType, "routes"> => {
  const routes: RouteMetadataType[] = Reflect.getOwnMetadata(
    ROUTE_METADATA_KEY,
    target
  );

  return { routes };
};

export const generateRoutes = (
  { routes, controllerUrl }: ControllerMetadataType,
  controller: Function,
  router: Router,
  options?: BuildApiOptions
) => {
  routes.forEach((route) => {
    const authorized: string[] = Reflect.getOwnMetadata(
      AUTHORIZED_METADATA_KEY,
      controller,
      route.key
    );

    if (authorized && !options.auth)
      throw new Error("Authorized function not provided");

    const authorizedMiddleware: MiddlewareFunction = AuthorizedFunction(
      authorized,
      options
    );

    const middlewares: MiddlewareFunction[] =
      Reflect.getOwnMetadata(MIDDLEWARE_METADATA_KEY, controller, route.key) ||
      [];

    const url = options.baseUrl.concat(controllerUrl.concat(route.endpointUrl));

    const endPoint: Function = controller.prototype[route.key].bind(
      Container.get(controller) // inject services to the controller
    );
    const queryParameters: Array<{ queryParameter: string; index: number }> =
      Reflect.getOwnMetadata(QUERY_METADATA_KEY, controller, route.key) || [];
    const bodyParameters: Array<{ index: number }> =
      Reflect.getOwnMetadata(BODY_METADATA_KEY, controller, route.key) || [];
    const paramsParameters: Array<{ paramName: string; index: number }> =
      Reflect.getOwnMetadata(PARAMS_METADATA_KEY, controller, route.key) || [];
    const ctxParameters: Array<{ index: number }> =
      Reflect.getOwnMetadata(CTX_METADATA_KEY, controller, route.key) || [];

    const endPointOverride: MiddlewareFunction = async function (
      req: Request,
      res: Response
    ) {
      const args: any[] = [];

      queryParameters.forEach((query) => {
        args[query.index] = req.query[query.queryParameter];
      });

      bodyParameters.forEach((query) => {
        args[query.index] = req.body;
      });

      paramsParameters.forEach((query) => {
        args[query.index] = req.params[query.paramName];
      });

      ctxParameters.forEach((query) => {
        args[query.index] = { req, res };
      });

      const test = await endPoint(...args);
      res.send(test);
    };

    switch (route.method) {
      case "GET":
        router.get(url, authorizedMiddleware, middlewares, endPointOverride);
        break;
      case "POST":
        router.post(url, authorizedMiddleware, middlewares, endPointOverride);
        break;
      case "DELETE":
        router.delete(url, authorizedMiddleware, middlewares, endPointOverride);
        break;
      case "PUT":
        router.put(url, authorizedMiddleware, middlewares, endPointOverride);
        break;
      case "PATCH":
        router.patch(url, authorizedMiddleware, middlewares, endPointOverride);
        break;
    }
  });
};
