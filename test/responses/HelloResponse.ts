import { ResponseField, Response } from "../../src";

export abstract class Non {
  @ResponseField({ description: "++++++" })
  valueNon?: string;
}

export abstract class Oui extends Non {
  @ResponseField({ description: "++++++" })
  valueOui?: string;
}

export class Test extends Oui {
  @ResponseField({ description: "++++++" })
  valueTest?: string;
}

@Response
export class HelloResponse extends Test {
  @ResponseField()
  test: string;

  // @ResponseField()
  // testtest?: Test;

  @ResponseField({ description: "Un test d'une description number" })
  super: number;

  @ResponseField({ description: "Un test d'une description Date" })
  superDate: Date;

  @ResponseField({ description: "Un test d'une description Bool" })
  superBool: boolean;
}
