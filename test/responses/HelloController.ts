import { ResponseField, Response } from "../../src";

@Response
export class Test {
  @ResponseField({ description: "Un test d'une description string" })
  value: string;
}

@Response
export class HelloResponse {
  @ResponseField()
  test: string;

  @ResponseField()
  testtest?: Test;

  @ResponseField({ description: "Un test d'une description number" })
  super: number;

  @ResponseField({ description: "Un test d'une description Date" })
  superDate: Date;

  @ResponseField({ description: "Un test d'une description Bool" })
  superBool: boolean;
}
