import { Controller } from "../../src/decorators/Controller";
import { Delete, Get, Patch, Post, Put } from "../../src/decorators/Route";
import { User, UserInput } from "../entity/User";
import { Authorized, Body, Middlewares } from "../../src";
import { testMiddlware } from "../middlewares/testMiddleware";

@Controller("/bitoku")
export class BitokuController {
  @Get("/:id", { description: "Recupere les trucs" })
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

  @Delete("/")
  tesdt(): UserInput {
    return {
      name: "test",
      age: 2,
      abractUser: "",
    };
  }

  @Patch("/")
  tesft(): UserInput {
    return {
      name: "test",
      age: 2,
      abractUser: "",
    };
  }

  @Put("/")
  tegst(): UserInput {
    return {
      name: "test",
      age: 2,
      abractUser: "",
    };
  }
}
