/**
 * /api/test/:id
 * @Params("id")
 */
export const Param = (paramName: string): ParameterDecorator => (
  target,
  key,
  index
) => {
  console.log(target, key, index, paramName);
};
