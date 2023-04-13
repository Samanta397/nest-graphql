import {Field, InputType} from "@nestjs/graphql";
import {SortDirection, UserSortField} from "../../sorting/types/sorting.types";

@InputType()
export class UserSort {
  @Field(() => UserSortField, { nullable: true })
  field: UserSortField

  @Field(() => SortDirection, { nullable: true })
  direction: SortDirection
}