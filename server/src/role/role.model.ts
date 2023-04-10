import {Field, Int, ObjectType} from "@nestjs/graphql";
import {Permission} from "../permission/permission.model";

@ObjectType()
export class Role {
  @Field(type => Int)
  id: number;

  @Field()
  name: string;

  @Field(type => [Permission], {nullable: true})
  permissions: Permission[];
}