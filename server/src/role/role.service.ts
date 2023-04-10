import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {In, Repository} from "typeorm";
import {Role} from "./role.model";
import {RoleInput} from "./dto/role.input";
import {Permission} from "../permission/permission.model";

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>
  ) {}

  async getOneById(id: number): Promise<Role> {
    return await this.roleRepository.findOneBy({id: id});
  }

  async create(role: RoleInput): Promise<Role> {
    const newRole = await this.roleRepository.create(role);
    return this.roleRepository.save(newRole)
  }

  async addPermissionsToRole(id: number, permissionIds: number[]): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: {id: id},
      relations: ['permissions']
    });
    const permissions = await this.permissionRepository.findBy({
      id: In(permissionIds)
    });
    role.permissions = [...permissions];
    return this.roleRepository.save(role);

  }
}
