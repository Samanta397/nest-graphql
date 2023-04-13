import {Field, InputType} from "@nestjs/graphql";
import {StringFilterComparison} from "../../filter/types/string-filter-comparison";
import {UserFilterPermissionsInput} from "./user-filter-permissions-input.dto";
import {UserFilterRolesInput} from "./user-filter-roles-input.dto";
import {IDFilterComparison} from "../../filter/types/id-filter-comparison.dto";

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

  @Field(() => UserFilterRolesInput, { nullable: true })
  roles?: UserFilterRolesInput;
}