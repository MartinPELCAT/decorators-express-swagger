import "reflect-metadata";

export const getRouteMetadataKey = Symbol("get_route");
export const postRouteMetadataKey = Symbol("post_route");
export const deleteRouteMetadataKey = Symbol("delete_route");
export const patchRouteMetadataKey = Symbol("patch_route");
export const putRouteMetadataKey = Symbol("put_route");

export const controllerMetadataKey = Symbol("controller_key");
export const serviceMetadataKey = Symbol("service_key");
export const middlewareMetadataKey = Symbol("middleware_key");

export const responseMetadataKey = Symbol("response_key");
export const responseFieldMetadataKey = Symbol("response_field_key");
