import { Controller } from "../../src/decorators/Controller";
import { Get } from "../../src/decorators/Route";
import { HelloResponse } from "../returns/HelloController";
import { Request, Response } from "express";
import { HelloService } from "../services/HelloService";
import { NewService } from "../services/NewService";

@Controller("/hello")
export class HelloController {
  constructor(
    private helloService: HelloService,
    private newService: NewService
  ) {}

  @Get("/")
  hello(_: Request, res: Response): HelloResponse {
    this.helloService.test();
    this.newService.test();
    res.send("Hello Controoler");
    return { test: "test" };
  }

  @Get("/test")
  test(_: Request, res: Response): HelloResponse {
    res.send("Hello Controoler test");
    return { test: "test" };
  }
}
