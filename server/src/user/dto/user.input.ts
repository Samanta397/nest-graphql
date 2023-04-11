import {Field, InputType, Int, registerEnumType} from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field()
  username: string;

  @Field()
  email: string;
}

@InputType()
export class IDFilterComparison {
  @Field({ nullable: true })
  is: boolean;

  @Field({ nullable: true })
  isNot: boolean;

  @Field({ nullable: true })
  eq: number;

  @Field({ nullable: true })
  req: number;

  @Field({ nullable: true })
  gt: number;

  @Field({ nullable: true })
  gte: number;

  @Field({ nullable: true })
  like: number;

  @Field({ nullable: true })
  notLike: number;

  // @Field({ nullable: true })
  // in: number[];

  // @Field({ nullable: true })
  // notIn: number[];
}

@InputType()
export class StringFilterComparison {
  @Field({ nullable: true })
  is: boolean;

  @Field({ nullable: true })
  isNot: boolean;

  @Field({ nullable: true })
  eq: string;

  @Field({ nullable: true })
  req: string;

  @Field({ nullable: true })
  gt: string;

  @Field({ nullable: true })
  gte: string;

  @Field({ nullable: true })
  like: string;

  @Field({ nullable: true })
  notLike: string;

  // @Field({ nullable: true })
  // in: number[];

  // @Field({ nullable: true })
  // notIn: number[];
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

  // roles

  // permissions
}

export enum UserSortField {
  id= 'id',
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