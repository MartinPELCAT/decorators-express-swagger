import { Controller } from "../../src/decorators/Controller";
import { Get } from "../../src/decorators/Route";
import { HelloResponse } from "../responses/HelloResponse";
import { Param } from "../../src/decorators/Param";

@Controller("/hello")
export class HelloController {
  @Get("/:id")
  hello(@Param("id") param: string): HelloResponse {
    console.log("Hello controller");
    console.log(param);

    return {
      test: "test",
      super: 2,
      superBool: true,
      superDate: new Date(),
    };
  }
}
