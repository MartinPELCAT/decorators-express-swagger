import "reflect-metadata";
import { getAPIMetadataStorage } from "../metadatas/metadataStorage";

type FieldOptions = {
  description?: string;
  nullable?: boolean;
};

export type MetadataOptions = {
  key: string | symbol;
  type: string;
} & FieldOptions;

export const Field = (options?: FieldOptions): PropertyDecorator => {
  return (target, key) => {
    const type: Function = Reflect.getMetadata("design:type", target, key);
    getAPIMetadataStorage().addField(
      { target: target.constructor, key },
      {
        name: key,
        type: type.name,
        nullable: options ? options.nullable : false,
        description: options ? options.description : "",
      }
    );
  };
};
