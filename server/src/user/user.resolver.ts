import {Resolver, Args, Mutation, Query, Int} from '@nestjs/graphql';
import { UserService } from './user.service';
import {User} from "./user.model";
import {OffsetPaging, UserConnection, UserFilterInput, UserSort} from "./dto/user.input";

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async user(@Args('id', { type: () => [Int] }) id: number) {
    return this.userService.getOneById(id)
  }

  @Query(() => UserConnection)
  async users(
    @Args('filter', { nullable: true }) filter: UserFilterInput,
    @Args('sorting', {type: () => [UserSort],  nullable: true}) sorting: UserSort[],
    @Args('paging', { nullable: true }) paging: OffsetPaging
  ) {
    return this.userService.getMany(filter, sorting, paging);
  }

  @Mutation(() => User)
  async createUser(
    @Args('username') username: string,
    @Args('email') email: string
  ) {
    const user = new User();
    user.username = username;
    user.email = email;

    return this.userService.create(user);
  }

  @Mutation(() => User)
  async addPermissionsToUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('permissionsIds', { type: () => [Int] }) permissionIds: number[]
  ) {
    return this.userService.addPermissionsToUser(id, permissionIds)
  }

  @Mutation(() => User)
  async addRolesToUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('rolesIds', {type: () => [Int]}) roleIds: number[]
  ) {
    return this.userService.addRolesToUser(id, roleIds)
  }
}