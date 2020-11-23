import "reflect-metadata";
import { responseFieldMetadataKey } from "../metadatas/symbols";

type ResponseFieldOptions = {
  description?: string;
  nullable?: boolean;
};

export type MetadataOptions = {
  key: string | symbol;
  type: string;
} & ResponseFieldOptions;

export const ResponseField = (
  options?: ResponseFieldOptions
): PropertyDecorator => {
  return (target, key) => {
    const type = Reflect.getMetadata("design:type", target, key);
    const existingMetadata: Array<MetadataOptions> =
      Reflect.getOwnMetadata(responseFieldMetadataKey, target.constructor) ||
      [];
    const description = (options && options.description) ?? "";
    const nullable = (options && options.nullable) ?? false;

    existingMetadata.push({ key, type: type.name, description, nullable });
    Reflect.defineMetadata(
      responseFieldMetadataKey,
      existingMetadata,
      target.constructor
    );
  };
};
