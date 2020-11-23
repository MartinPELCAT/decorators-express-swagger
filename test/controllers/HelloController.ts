import { Controller } from "../../src/decorators/Controller";
import { Get } from "../../src/decorators/Route";
import { HelloResponse } from "../responses/HelloResponse";
import { Body } from "../../src";

@Controller("/hello")
export class HelloController {
  @Get("/:id")
  hello(@Body body: any): HelloResponse {
    console.log("Hello controller");
    console.log(body);

    return {
      test: "test",
      super: 2,
      superBool: true,
      superDate: new Date(),
    };
  }
}
