import {Field, InputType} from "@nestjs/graphql";
import {StringFilterComparison} from "../../filter/types/string-filter-comparison";
import {IDFilterComparison} from "../../filter/types/id-filter-comparison.dto";

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