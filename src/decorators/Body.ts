/**
 * req.body
 */
export const Body: ParameterDecorator = (target, key, index) => {
  console.log(target, key, index);
};
