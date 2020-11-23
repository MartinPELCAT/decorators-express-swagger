import { Controller } from "../../src/decorators/Controller";
import { Get } from "../../src/decorators/Route";
import { HelloResponse } from "../responses/HelloResponse";
import { Query } from "../../src/decorators/Query";

@Controller("/hello")
export class HelloController {
  @Get("/")
  hello(
    @Query("hello") param: string,
    @Query("test") test: string
  ): HelloResponse {
    console.log("Hello controller");
    console.log(param);
    console.log(test);

    return {
      test: "test",
      super: 2,
      superBool: true,
      superDate: new Date(),
    };
  }
}
