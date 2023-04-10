import { Module } from '@nestjs/common';
import { RoleResolver } from './role.resolver';
import { RoleService } from './role.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Role} from "./dto/role.entity";
import {PermissionModule} from "../permission/permission.module";
import {Permission} from "../permission/dto/permission.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, Permission]),
    PermissionModule
  ],
  providers: [RoleResolver, RoleService]
})
export class RoleModule {}
