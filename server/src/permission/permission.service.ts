import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Permission} from "./permission.model";
import {Repository} from "typeorm";
import {PermissionInput} from "./dto/permission.input";

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>
  ) {}

  async getOneById(id: number): Promise<Permission> {
    return await this.permissionRepository.findOneBy({id: id})
  }

  async getMany(): Promise<Permission[]> {
    return await this.permissionRepository.find();
  }

  async create(permission: PermissionInput): Promise<Permission> {
    const newPermission = await this.permissionRepository.create(permission);
    return this.permissionRepository.save(newPermission)
  }
}
