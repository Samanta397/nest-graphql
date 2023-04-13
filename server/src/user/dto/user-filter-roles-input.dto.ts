import {Field, InputType} from "@nestjs/graphql";
import {StringFilterComparison} from "../../filter/types/string-filter-comparison";
import {IDFilterComparison} from "../../filter/types/id-filter-comparison.dto";

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