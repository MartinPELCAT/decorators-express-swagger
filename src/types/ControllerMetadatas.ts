import { RouteMetadata } from "./RouteMetadata";

export type ControllerMetadata = {
  /**
   * @description Base url of all the routes defined in the controller
   */
  controllerUrl: string;

  /**
   * @description All routes with "GET" Methode
   */
  getRoutes?: RouteMetadata[];

  /**
   * @description All routes with "POST" Methode
   */
  postRoutes?: RouteMetadata[];

  /**
   * @description All routes with "DELETE" Methode
   */
  deleteRoutes?: RouteMetadata[];

  /**
   * @description All routes with "PUT" Methode
   */
  putRoutes?: RouteMetadata[];

  /**
   * @description All routes with "PATCH" Methode
   */
  patchRoutes?: RouteMetadata[];
};
