import { Controller } from "../../src/decorators/Controller";
import { Get } from "../../src/decorators/Route";
import { HelloResponse } from "../responses/HelloResponse";
import { Request, Response } from "express";
import { Query } from "../../src/decorators/Query";

@Controller("/hello")
export class HelloController {
  @Get("/")
  hello(
    _: Request,
    res: Response,
    @Query("hello") _param: string
  ): HelloResponse {
    res.send("Hello Controoler");
    return {
      test: "test",
      super: 2,
      superBool: true,
      superDate: new Date(),
    };
  }
}
