import {Field, InputType, Int, ObjectType, registerEnumType} from '@nestjs/graphql';
import {User} from "../user.model";

@InputType()
export class UserInput {
  @Field()
  username: string;

  @Field()
  email: string;
}

@InputType()
export class IDFilterComparison {
  @Field(() => Int,{ nullable: true })
  eq: number;

  @Field(() => Int, { nullable: true })
  neq: number;

  @Field(() => Int, { nullable: true })
  gt: number;

  @Field(() => Int, { nullable: true })
  gte: number;

  @Field(() => Int, { nullable: true })
  lt: number;

  @Field(() => Int, { nullable: true })
  lte: number;

  @Field(() => Int, { nullable: true })
  like: number;

  @Field(() => Int, { nullable: true })
  notLike: number;

  // @Field({ nullable: true })
  // inArr: number[];
  //
  // @Field({ nullable: true })
  // notInArr: number[];
}

@InputType()
export class StringFilterComparison {
  @Field({ nullable: true })
  eq: string;

  @Field({ nullable: true })
  neq: string;

  @Field({ nullable: true })
  gt: string;

  @Field({ nullable: true })
  gte: string;

  @Field({ nullable: true })
  lt: string;

  @Field({ nullable: true })
  lte: string;

  @Field({ nullable: true })
  like: string;

  @Field({ nullable: true })
  notLike: string;

  // @Field({ nullable: true })
  // inArr: string[];
  //
  // @Field({ nullable: true })
  // notInArr: string[];
}

@InputType()
export class UserFilterRolesInput {
  @Field(() => [UserFilterRolesInput], { nullable: true })
  and?: UserFilterRolesInput[];

  @Field(() => [UserFilterRolesInput], { nullable: true })
  or?: UserFilterRolesInput[];

  @Field(() => IDFilterComparison, { nullable: true })
  id?: IDFilterComparison;

  @Field(() => StringFilterComparison, { nullable: true })
  name?: StringFilterComparison;
}

@InputType()
export class UserFilterPermissionsInput {
  @Field(() => [UserFilterPermissionsInput], { nullable: true })
  and?: UserFilterPermissionsInput[];

  @Field(() => [UserFilterPermissionsInput], { nullable: true })
  or?: UserFilterPermissionsInput[];

  @Field(() => IDFilterComparison, { nullable: true })
  id?: IDFilterComparison;

  @Field(() => StringFilterComparison, { nullable: true })
  name?: StringFilterComparison;
}


@InputType()
export class UserFilterInput {
  @Field(() => IDFilterComparison, { nullable: true })
  id?: IDFilterComparison;

  @Field(() => StringFilterComparison, { nullable: true })
  username?: StringFilterComparison;

  @Field(() => StringFilterComparison, { nullable: true })
  email?: StringFilterComparison;

  @Field(() => [UserFilterInput], { nullable: true })
  and?: UserFilterInput[];

  @Field(() => [UserFilterInput], { nullable: true })
  or?: UserFilterInput[];

  @Field(() => UserFilterPermissionsInput, { nullable: true })
  permissions?: UserFilterPermissionsInput;
}

export enum UserSortField {
  id = 'id',
  username = 'username',
  email = 'email',
}

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC'
}

registerEnumType(UserSortField, {
  name: 'UserSortField',
});

registerEnumType(SortDirection, {
  name: 'SortDirection'
})

@InputType()
export class UserSort {
  @Field(() => UserSortField, { nullable: true })
  field: UserSortField

  @Field(() => SortDirection, { nullable: true })
  direction: SortDirection
}

@InputType()
export class OffsetPaging {
  @Field(() => Int, { nullable: true })
  limit?: number

  @Field(() => Int, { nullable: true })
  offset?: number
}

@ObjectType()
export class OffsetPageInfo {
  @Field({ nullable: true })
  hasNextPage?: boolean;

  @Field({ nullable: true })
  hasPreviousPage?: boolean;
}

@ObjectType()
export class UserConnection {
  @Field(() => OffsetPageInfo )
  pageInfo: OffsetPageInfo

  @Field(() => [User])
  nodes: User[];
}