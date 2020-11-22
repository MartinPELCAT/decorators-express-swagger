import { Controller } from "../../src/decorators/Controller";
import { Get } from "../../src/decorators/Route";
import { HelloResponse } from "../returns/HelloController";
import { Request, Response } from "express";

@Controller("/hello")
export class HelloController {
  @Get("/")
  hello(_: Request, res: Response): HelloResponse {
    res.send("Hello Controoler");
    return { test: "test" };
  }

  @Get("/test")
  test(_: Request, res: Response): HelloResponse {
    res.send("Hello Controoler test");
    return { test: "test" };
  }
}
