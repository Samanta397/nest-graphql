import {Field, InputType, Int} from "@nestjs/graphql";

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
// }
}