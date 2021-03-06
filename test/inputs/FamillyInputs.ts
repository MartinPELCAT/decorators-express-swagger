import { Field, ObjectType } from "../../src";
import { Input } from "../../src/decorators/Input";
import { IFamilly } from "../entity/Familly";
import { IProfile } from "../entity/Profile";

@Input
export class FamillyInput implements Partial<IFamilly> {
  @Field({ description: "Name of the familly" })
  name: string;

  @Field({ description: "Email of he familly" })
  email: string;

  @Field()
  username: string;

  @Field({ description: "Password of the familly account" })
  password: string;
}

@ObjectType
export class FamillyObject implements Partial<IFamilly> {
  @Field({ description: "Object identifier" })
  _id: string;

  @Field({ description: "Name of the familly" })
  name: string;

  @Field({ description: "Email of he familly" })
  email: string;

  @Field({ description: "Familly profiles" })
  profiles?: Partial<IProfile[]>;
}
