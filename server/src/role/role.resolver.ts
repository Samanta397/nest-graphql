import {Args, Int, Mutation, Query, Resolver} from '@nestjs/graphql';
import {Role} from "./role.model";
import {RoleService} from "./role.service";

@Resolver(() => Role)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Query(() => Role)
  async role(@Args('id', { type: () => [Int] }) id: number) {
    return this.roleService.getOneById(id)
  }

  @Query(() => [Role])
  async roles() {
    return this.roleService.getMany()
  }

  @Mutation(() => Role)
  async createRole(@Args('name') name: string) {
    const role = new Role();
    role.name = name;

    return this.roleService.create(role);
  }

  @Mutation(() => Role)
  async addPermissionsToRole(
    @Args('id', { type: () => [Int] }) id: number,
    @Args('permissions', { type: () => [Int] }) permissionIds: number[]
  ) {
    return this.roleService.addPermissionsToRole(id, permissionIds)
  }
}
