import {
  getRouteMetadataKey,
  deleteRouteMetadataKey,
  patchRouteMetadataKey,
  postRouteMetadataKey,
  putRouteMetadataKey,
} from "../metadatas/symbols";
import { ControllerMetadataType } from "../types/ControllerMetadataType";
import { RouteMetadataType } from "../types/RouteMetadataType";

export const getControllerRoutes = (
  target: Function
): Pick<
  ControllerMetadataType,
  "getRoutes" | "deleteRoutes" | "putRoutes" | "postRoutes" | "patchRoutes"
> => {
  const getRoutes: RouteMetadataType[] = Reflect.getOwnMetadata(
    getRouteMetadataKey,
    target
  );
  const postRoutes: RouteMetadataType[] = Reflect.getOwnMetadata(
    postRouteMetadataKey,
    target
  );
  const deleteRoutes: RouteMetadataType[] = Reflect.getOwnMetadata(
    deleteRouteMetadataKey,
    target
  );

  const patchRoutes: RouteMetadataType[] = Reflect.getOwnMetadata(
    patchRouteMetadataKey,
    target
  );
  const putRoutes: RouteMetadataType[] = Reflect.getOwnMetadata(
    putRouteMetadataKey,
    target
  );

  return { getRoutes, postRoutes, deleteRoutes, patchRoutes, putRoutes };
};
