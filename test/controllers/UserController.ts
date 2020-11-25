import { Controller } from "../../src/decorators/Controller";
import { Get, Post } from "../../src/decorators/Route";
import { User } from "../entity/User";
import { Authorized, Middlewares } from "../../src";
import { testMiddlware } from "../middlewares/testMiddleware";

@Controller("/hello")
export class UserController {
  @Get("/:id")
  @Middlewares(testMiddlware)
  @Authorized(["Test", "ADMIn"])
  hello(): User {
    return {
      name: "test",
      age: 2,
      isActive: true,
      birthDate: new Date(),
      abractUser: "",
    };
  }

  @Post("/")
  test(): User {
    return {
      name: "test",
      age: 2,
      isActive: true,
      birthDate: new Date(),
      abractUser: "",
    };
  }
}
