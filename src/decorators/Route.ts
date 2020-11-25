import "reflect-metadata";
import { getAPIMetadataStorage } from "../metadatas/metadataStorage";

export const Get = (path: string): MethodDecorator => {
  return (target, key) => {
    getAPIMetadataStorage().addEndpoint({
      key: key,
      target: target.constructor,
      path,
      method: "GET",
    });
  };
};

export const Post = (path: string): MethodDecorator => {
  return (target, key) => {
    getAPIMetadataStorage().addEndpoint({
      key,
      target: target.constructor,
      path,
      method: "POST",
    });
  };
};

export const Put = (path: string): MethodDecorator => {
  return (target, key) => {
    getAPIMetadataStorage().addEndpoint({
      key: key,
      target: target.constructor,
      path,
      method: "PUT",
    });
  };
};

export const Patch = (path: string): MethodDecorator => {
  return (target, key) => {
    getAPIMetadataStorage().addEndpoint({
      key: key,
      target: target.constructor,
      path,
      method: "PATCH",
    });
  };
};

export const Delete = (path: string): MethodDecorator => {
  return (target, key) => {
    getAPIMetadataStorage().addEndpoint({
      key: key,
      target: target.constructor,
      path,
      method: "DELETE",
    });
  };
};
