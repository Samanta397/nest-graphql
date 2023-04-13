import {Field, InputType} from "@nestjs/graphql";

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