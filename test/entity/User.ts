import { Field, ObjectType } from "../../src";
import { Input } from "../../src/decorators/Input";

export interface IUser {
  name: string;
  age: number;
  birthDate: Date;
  isActive: boolean;
}

abstract class AbstractUser {
  @Field()
  abractUser: string;
}

@ObjectType
export class User extends AbstractUser implements IUser {
  @Field()
  name: string;

  @Field({ description: "Un test d'une description number" })
  age: number;

  @Field({ description: "Un test d'une description Date" })
  birthDate: Date;

  @Field({ description: "Un test d'une description Bool" })
  isActive: boolean;
}

@Input
export class UserInput extends AbstractUser implements Partial<IUser> {
  @Field()
  name: string;

  @Field()
  age: number;
}
