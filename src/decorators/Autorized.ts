export const Authorized = (roles: string[]): MethodDecorator => {
  return (target, key, descriptor) => {
    console.log(roles, target, key, descriptor);
  };
};
