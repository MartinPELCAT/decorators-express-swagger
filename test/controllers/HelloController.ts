import { Controller } from "../../src/decorators/Controller";
import { Get, Post } from "../../src/decorators/Route";
import { HelloResponse } from "../responses/HelloController";
import { Request, Response } from "express";

@Controller("/hello")
export class HelloController {
  @Get("/")
  hello(_: Request, res: Response): HelloResponse {
    res.send("Hello Controoler");
    return {
      test: "test",
      super: 2,
      superBool: true,
      superDate: new Date(),
      testtest: { value: "test" },
    };
  }

  @Post("/test")
  test(_: Request, res: Response): HelloResponse {
    res.send("Hello Controoler test");
    return {
      test: "test",
      super: 2,
      superBool: true,
      superDate: new Date(),
    };
  }
}
