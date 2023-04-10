import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { PermissionResolver } from './permission.resolver';
import { PermissionService } from './permission.service';
import {Permission} from "./dto/permission.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  providers: [PermissionResolver, PermissionService],
  exports: [PermissionService]
})
export class PermissionModule {}
