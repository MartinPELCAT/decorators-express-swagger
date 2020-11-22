import { RouteMetadataType } from "./RouteMetadata";

export interface ControllerMetadataType {
  /**
   * @description Base url of all the routes defined in the controller
   */
  controllerUrl: string;

  /**
   * @description All routes with "GET" Methode
   */
  getRoutes?: RouteMetadataType[];

  /**
   * @description All routes with "POST" Methode
   */
  postRoutes?: RouteMetadataType[];

  /**
   * @description All routes with "DELETE" Methode
   */
  deleteRoutes?: RouteMetadataType[];

  /**
   * @description All routes with "PUT" Methode
   */
  putRoutes?: RouteMetadataType[];

  /**
   * @description All routes with "PATCH" Methode
   */
  patchRoutes?: RouteMetadataType[];
}
