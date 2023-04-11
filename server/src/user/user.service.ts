import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, In} from 'typeorm';
import {UserFilterInput, UserInput} from "./dto/user.input";
import {User} from "./user.model";
import {Permission} from "../permission/permission.model";
import {Role} from "../role/role.model";
import { SelectQueryBuilder, WhereExpressionBuilder } from 'typeorm';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ) {}

  async getOneById(id: number): Promise<User> {
    return  await this.userRepository.findOneBy({id: id});
  }

  async getMany(filter, sorting): Promise<User[]> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    if (sorting) {
      const sortCondition = sorting.reduce((acc, item) => {
        return {...acc, ...{[item.field]: item.direction}}
      }, {});

      queryBuilder.orderBy(sortCondition)
    }


    return queryBuilder.getMany();
  }

  async create(user: UserInput): Promise<User> {
    const newUser = await this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async addPermissionsToUser(id: number, permissionIds: number[]): Promise<User> {
    const user = await this.userRepository.findOne( {where: {id: id}, relations: ['permissions'] });
    const permissions: Permission[] = await this.permissionRepository.findBy({
      id: In(permissionIds)
    })
    user.permissions = [...permissions];
    return this.userRepository.save(user);
  }

  async addRolesToUser(id: number, rolesIds: number[]): Promise<User> {
    const user = await this.userRepository.findOne( {where: {id: id}, relations: ['roles'] });
    const roles: Role[] = await this.roleRepository.findBy({
      id: In(rolesIds)
    })

    user.roles = [...roles];
    return this.userRepository.save(user);
  }


}