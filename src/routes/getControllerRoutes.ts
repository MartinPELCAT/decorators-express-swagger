import { getRouteMetadataKey } from "..";
import {
  deleteRouteMetadataKey,
  patchRouteMetadataKey,
  postRouteMetadataKey,
  putRouteMetadataKey,
} from "../metadatas/symbols";
import { ControllerMetadata } from "../types/ControllerMetadatas";
import { RouteMetadata } from "../types/RouteMetadata";

export const getControllerRoutes = (
  target: Function
): Pick<
  ControllerMetadata,
  "getRoutes" | "deleteRoutes" | "putRoutes" | "postRoutes" | "patchRoutes"
> => {
  const getRoutes: RouteMetadata[] = Reflect.getOwnMetadata(
    getRouteMetadataKey,
    target
  );
  const postRoutes: RouteMetadata[] = Reflect.getOwnMetadata(
    postRouteMetadataKey,
    target
  );
  const deleteRoutes: RouteMetadata[] = Reflect.getOwnMetadata(
    deleteRouteMetadataKey,
    target
  );

  const patchRoutes: RouteMetadata[] = Reflect.getOwnMetadata(
    patchRouteMetadataKey,
    target
  );
  const putRoutes: RouteMetadata[] = Reflect.getOwnMetadata(
    putRouteMetadataKey,
    target
  );

  return { getRoutes, postRoutes, deleteRoutes, patchRoutes, putRoutes };
};
