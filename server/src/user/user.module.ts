import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './dto/user.entity';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import {PermissionModule} from "../permission/permission.module";
import {Permission} from "../permission/dto/permission.entity";
import {RoleModule} from "../role/role.module";
import {Role} from "../role/dto/role.entity";
import {FilterModule} from "../filter/filter.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Permission, Role]),
    PermissionModule,
    RoleModule,
    FilterModule
  ],
  providers: [UserService, UserResolver],
})
export class UserModule {}