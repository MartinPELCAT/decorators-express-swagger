import "reflect-metadata";
import { responseFieldMetadataKey } from "../metadatas";

export const Response: ClassDecorator = (target) => {
  const responseFields = Reflect.getOwnMetadata(
    responseFieldMetadataKey,
    target
  );
  //   console.log("Response");
  //   console.log(target);
  //   console.log(responseFields);
};
