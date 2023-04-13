import {Field, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class OffsetPageInfo {
  @Field({ nullable: true })
  hasNextPage?: boolean;

  @Field({ nullable: true })
  hasPreviousPage?: boolean;
}
