import { ResponseField, Response } from "../../src";

@Response
export class HelloResponse {
  @ResponseField()
  test: string;
}
