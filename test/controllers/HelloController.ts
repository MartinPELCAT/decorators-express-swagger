import { Controller } from "../../src/decorators/Controller";
import { Get, Post } from "../../src/decorators/Route";
import { HelloResponse } from "../returns/HelloController";
import { Request, Response } from "express";
import { HelloService } from "../services/HelloService";
import { NewService } from "../services/NewService";
import { Authorized, Middlewares } from "../../src";
import { helloMiddlware } from "../middlewares/helloMiddleware";
import { testMiddlware } from "../middlewares/testMiddleware";

@Controller("/hello")
export class HelloController {
  constructor(
    private helloService: HelloService,
    private newService: NewService
  ) {}

  @Get("/")
  @Middlewares([testMiddlware])
  @Middlewares(helloMiddlware)
  @Authorized(["ADMIN", "USER"])
  hello(_: Request, res: Response): HelloResponse {
    this.helloService.test();
    this.newService.test();
    res.send("Hello Controoler");
    return { test: "test" };
  }

  @Post("/test")
  @Authorized()
  test(_: Request, res: Response): HelloResponse {
    res.send("Hello Controoler test");
    return { test: "test" };
  }
}
