import {Field, ObjectType} from "@nestjs/graphql";
import {OffsetPageInfo} from "../../paging/types/offset-page-info.dto";
import {User} from "../user.model";

@ObjectType()
export class UserConnection {
  @Field(() => OffsetPageInfo )
  pageInfo: OffsetPageInfo

  @Field(() => [User])
  nodes: User[];
}