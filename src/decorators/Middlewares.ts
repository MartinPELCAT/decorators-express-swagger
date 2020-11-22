/**
 * @description Middleware decorator
 * @param middlwares all miffdlware function to execute before
 * @
 */
export const Middlewares = (middlwares: Function[]): MethodDecorator => {
  return (target, key, descriptor) => {
    console.log(middlwares, target, key, descriptor);
  };
};
