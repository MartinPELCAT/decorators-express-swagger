import { Request, Response } from "express";
import Container from "typedi";
import { Route } from "../metadatas/metadatasTypes";

import { MiddlewareFunction } from "../types/MiddlewareType";

type Parameters = Pick<
  Route,
  "bodyParam" | "queryURLParam" | "paramsURLParam" | "contextParam"
>;

export function endpointParameters(
  { bodyParam, contextParam, paramsURLParam, queryURLParam }: Parameters,
  route: Route
) {
  const endPoint: Function = route.target.prototype[route.key].bind(
    Container.get(route.target) // inject services to the controller
  );

  const endPointOverride: MiddlewareFunction = async function (
    req: Request,
    res: Response
  ) {
    const args: any[] = [];

    queryURLParam?.forEach((query) => {
      args[query.index] = req.query[query.paramName];
    });

    bodyParam?.forEach((query) => {
      args[query.index] = req.body;
    });

    paramsURLParam?.forEach((query) => {
      args[query.index] = req.params[query.paramName];
    });

    contextParam?.forEach((query) => {
      args[query.index] = { req, res };
    });

    const endpointReturnValue = await endPoint(...args);
    res.json(endpointReturnValue);
  };
  return endPointOverride;
}
