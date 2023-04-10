import {Field, Int, ObjectType} from "@nestjs/graphql";
import {Permission} from "../permission/permission.model";

@ObjectType()
export class User {
  @Field(type => Int)
  id: number;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field(type => [Permission], {nullable: true})
  permissions: Permission[];
}