import { Controller } from "../../src/decorators/Controller";
import { Get } from "../../src/decorators/Route";
import { HelloResponse } from "../responses/HelloResponse";
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
    };
  }
}
