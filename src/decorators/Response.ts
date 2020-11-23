import "reflect-metadata";
import { responseFieldMetadataKey } from "../metadatas/symbols";

/**
 * @description Reponse object to generate auto docs
 */
export const Response: ClassDecorator = (target) => {
  // Il faut recuperer les données pour les class extends
  //   console.log(target);
  const extendedTarget: Function = Object.getPrototypeOf(target); // get estended class

  const metas = Reflect.getOwnMetadata(
    responseFieldMetadataKey,
    extendedTarget
  );
  console.log(extendedTarget.prototype);

  console.log(metas);

  const reextendedTarget: Function = Object.getPrototypeOf(extendedTarget);

  const metass = Reflect.getOwnMetadata(
    responseFieldMetadataKey,
    reextendedTarget
  );

  console.log(metass);
  //   console.log(extendedTarget);
  //   console.log(reextendedTarget);
};
