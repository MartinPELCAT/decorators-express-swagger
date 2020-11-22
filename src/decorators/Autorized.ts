import { Request, Response } from "express";
import { authorizedMetadataKey } from "../metadatas/symbols";

export type AuthorizedFunction = (
  roles: string[] | null,
  context: { req: Request; res: Response }
) => boolean;

export const Authorized = (
  roles: string[] | string = null
): MethodDecorator => {
  return (target, key) => {
    Reflect.defineMetadata(
      authorizedMetadataKey,
      typeof roles === "string" ? [roles] : roles,
      target.constructor,
      key
    );
  };
};
