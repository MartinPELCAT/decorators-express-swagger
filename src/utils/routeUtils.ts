import { Router } from "express";
import { BuildApiOptions } from "..";
import { getAPIMetadataStorage } from "../metadatas/metadataStorage";
import { HTTPMethod } from "../metadatas/metadatasTypes";
import { MiddlewareFunction } from "../types/MiddlewareType";
import { AuthorizedFunction } from "./AuthorizedFunction";
import { endpointParameters } from "./endpointParameters";

export const generateRoutes = (router: Router, options?: BuildApiOptions) => {
  const mappingHttpMethod: Array<{
    methode: HTTPMethod;
    function: Function;
  }> = [
    { methode: "DELETE", function: router.delete },
    { methode: "GET", function: router.get },
    { methode: "PATCH", function: router.patch },
    { methode: "PUT", function: router.put },
    { methode: "POST", function: router.post },
  ];

  getAPIMetadataStorage().controllers.forEach((controller) => {
    controller.routes.forEach((route) => {
      if (route.authRoles && !options.auth)
        throw new Error("Authorized function not provided");

      const url = options.apiUrl.concat(controller.baseUrl).concat(route.path);

      const authMiddleware: MiddlewareFunction =
        route.authRoles !== undefined
          ? AuthorizedFunction(
              route.authRoles === null
                ? null
                : Array.isArray(route.authRoles)
                ? route.authRoles
                : [route.authRoles],
              options
            )
          : undefined;

      const { bodyParam, contextParam, paramsURLParam, queryURLParam } = route;

      const endPoint: MiddlewareFunction = endpointParameters(
        { bodyParam, contextParam, paramsURLParam, queryURLParam },
        route
      );

      const meth = mappingHttpMethod.find(
        (methode) => methode.methode === route.method
      );

      meth.function.call(
        router,
        url,
        authMiddleware ?? [],
        route.handlers || [],
        endPoint
      );

      // switch (route.method) {
      //   case "GET":
      //     router.get(url, authMiddleware ?? [], route.handlers || [], endPoint);
      //     break;
      //   case "POST":
      //     router.post(
      //       url,
      //       authMiddleware ?? [],
      //       route.handlers || [],
      //       endPoint
      //     );
      //     break;
      //   case "DELETE":
      //     router.delete(
      //       url,
      //       authMiddleware ?? [],
      //       route.handlers || [],
      //       endPoint
      //     );
      //     break;
      //   case "PUT":
      //     router.put(url, authMiddleware ?? [], route.handlers || [], endPoint);
      //     break;
      //   case "PATCH":
      //     router.patch(
      //       url,
      //       authMiddleware ?? [],
      //       route.handlers || [],
      //       endPoint
      //     );
      //     break;
      // }
    });
  });
};
