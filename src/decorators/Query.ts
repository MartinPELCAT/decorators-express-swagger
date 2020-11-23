/**
 * /api/test?hello=world
 * @param queryParameter
 * @Query("hello") hello : string
 * hello === "world"
 */

export const Query = (queryParameter: string): ParameterDecorator => () =>
  //   target,
  //   key,
  //   index
  {
    console.log(queryParameter);

    //   console.log(target, key, index);
  };
