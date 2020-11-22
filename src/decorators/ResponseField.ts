import "reflect-metadata";
import { responseFieldMetadataKey } from "../metadatas";

type ResponseFieldOptions = {
  description?: string;
};

export const ResponseField = (
  options?: ResponseFieldOptions
): PropertyDecorator => {
  return (target, key) => {
    const type = Reflect.getMetadata("design:type", target, key);
    const existingMetadata: Array<any> =
      Reflect.getOwnMetadata(responseFieldMetadataKey, target.constructor) ||
      [];
    const description =
      options && options.description ? options.description : "";

    existingMetadata.push({ key, type: type.name, description });
    Reflect.defineMetadata(
      responseFieldMetadataKey,
      existingMetadata,
      target.constructor
    );
  };
};
