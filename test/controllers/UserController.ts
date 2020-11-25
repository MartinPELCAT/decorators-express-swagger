import { Controller } from "../../src/decorators/Controller";
import { Get, Post } from "../../src/decorators/Route";
import { User, UserInput } from "../entity/User";
import { Authorized, Body, Middlewares } from "../../src";
import { testMiddlware } from "../middlewares/testMiddleware";

@Controller("/hello")
export class UserController {
  @Get("/:id")
  @Middlewares(testMiddlware)
  @Authorized(["Test", "ADMIn"])
  hello(@Body input: UserInput): User {
    console.log(input);

    return {
      name: "test",
      age: 2,
      isActive: true,
      birthDate: new Date(),
      abractUser: "",
      test: { testinput: { issou: "" } },
    };
  }

  @Post("/")
  test(): UserInput {
    return {
      name: "test",
      age: 2,
      abractUser: "",
    };
  }
}
