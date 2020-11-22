import { Response } from "../../src/decorators/Response";
import { ResponseField } from "../../src/decorators/ResponseField";

@Response
export class HelloResponse {
  @ResponseField()
  test: string;
}
