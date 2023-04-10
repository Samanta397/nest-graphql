import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {PermissionService} from "./permission.service";
import {Permission} from "./permission.model";

@Resolver()
export class PermissionResolver {
  constructor(private readonly permissionService: PermissionService) {}

  @Query(() => Permission)
  async permission(@Args('id') id: number) {
    return this.permissionService.getOneById(id)
  }

  @Mutation(() => Permission)
  async createPermission(@Args('name') name: string) {
    const permission = new Permission();
    permission.name = name;

    return this.permissionService.create(permission);
  }
}