import { Controller } from "../../src/decorators/Controller";
import { Get } from "../../src/decorators/Route";
import { HelloResponse } from "../returns/HelloController";

class Test {
  test: string;
}

@Controller("/hello")
export class HelloController {
  @Get("/")
  hello(req, res): HelloResponse {
    res.send("Hello Controoler");
    return { test: "test" };
  }

  @Get("/test")
  test(req, res): HelloResponse {
    res.send("Hello Controoler test");

    return { test: "test" };
  }
}
