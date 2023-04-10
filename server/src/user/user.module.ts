import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './dto/user.entity';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import {PermissionModule} from "../permission/permission.module";
import {Permission} from "../permission/dto/permission.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Permission]),
    PermissionModule
  ],
  providers: [UserService, UserResolver],
})
export class UserModule {}