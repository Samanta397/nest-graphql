import {Args, Int, Mutation, Query, Resolver} from '@nestjs/graphql';
import {PermissionService} from "./permission.service";
import {Permission} from "./permission.model";

@Resolver()
export class PermissionResolver {
  constructor(private readonly permissionService: PermissionService) {}

  @Query(() => Permission)
  async permission(@Args('id', { type: () => [Int] }) id: number) {
    return this.permissionService.getOneById(id)
  }

  @Query(() => [Permission])
  async permissions() {
   return this.permissionService.getMany()
  }

  @Mutation(() => Permission)
  async createPermission(@Args('name') name: string) {
    const permission = new Permission();
    permission.name = name;

    return this.permissionService.create(permission);
  }
}
