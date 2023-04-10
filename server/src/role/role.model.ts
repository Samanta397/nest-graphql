import {Field, Int, ObjectType} from "@nestjs/graphql";
import {Permission} from "../permission/permission.model";
import {ManyToMany} from "typeorm";
import {User} from "../user/dto/user.entity";

@ObjectType()
export class Role {
  @Field(type => Int)
  id: number;

  @Field()
  name: string;

  @Field(type => [Permission], {nullable: true})
  permissions: Permission[];

  @ManyToMany(() => User, user => user.permissions)
  users: User[];
}