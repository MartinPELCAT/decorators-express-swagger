import "reflect-metadata";
import { getAPIMetadataStorage } from "../metadatas/metadataStorage";
import { Route } from "../metadatas/metadatasTypes";

type RouteOptions = {
  description: string;
};

export const Get = (
  path: string,
  returnType: () => any,
  options?: RouteOptions
): MethodDecorator => {
  return (target, key) => {
    registerRoute(
      {
        key: key,
        target: target.constructor,
        path,
        method: "GET",
      },
      returnType,
      options
    );
  };
};

export const Post = (
  path: string,
  returnType: () => any,
  options?: RouteOptions
): MethodDecorator => {
  return (target, key) => {
    registerRoute(
      {
        key,
        target: target.constructor,
        path,
        method: "POST",
      },
      returnType,
      options
    );
  };
};

export const Put = (
  path: string,
  returnType: () => any,
  options?: RouteOptions
): MethodDecorator => {
  return (target, key) => {
    registerRoute(
      {
        key: key,
        target: target.constructor,
        path,
        method: "PUT",
      },
      returnType,
      options
    );
  };
};

export const Patch = (
  path: string,
  returnType: () => any,
  options?: RouteOptions
): MethodDecorator => {
  return (target, key) => {
    registerRoute(
      {
        key: key,
        target: target.constructor,
        path,
        method: "PATCH",
      },
      returnType,
      options
    );
  };
};

export const Delete = (
  path: string,
  returnType: () => any,
  options?: RouteOptions
): MethodDecorator => {
  return (target, key) => {
    registerRoute(
      {
        key: key,
        target: target.constructor,
        path,
        method: "DELETE",
      },
      returnType,
      options
    );
  };
};

const registerRoute = (
  {
    key,
    target,
    path,
    method,
  }: Pick<Route, "key" | "target" | "path" | "method">,
  returnType: () => any,
  options: RouteOptions
) => {
  const description = options && options.description ? options.description : "";

  getAPIMetadataStorage().addEndpoint({
    key,
    target,
    path,
    method,
    description,
  });

  const param = returnType();
  if (param === null) return;

  const isArray = Array.isArray(param);
  if (isArray) {
    getAPIMetadataStorage().addResponseType(
      { target, key },
      param[0].name,
      isArray
    );
  } else {
    getAPIMetadataStorage().addResponseType(
      { target, key },
      param.name,
      isArray
    );
  }
};
