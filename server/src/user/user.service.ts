import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, In, Brackets} from 'typeorm';
import {OffsetPaging, UserFilterInput, UserInput} from "./dto/user.input";
import {User} from "./user.model";
import {Permission} from "../permission/permission.model";
import {Role} from "../role/role.model";


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

  async getMany(filter, sorting, paging: OffsetPaging = {limit: 3}): Promise<User[]> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    if (filter) {
      const { and, or, id, username, email } = filter;

      if (id) {
        const {condition, variables} = this.buildFilter(id, 'id')
        queryBuilder.where(condition, variables);
      }

      if (username) {
        const {condition, variables} = this.buildFilter(username, 'username')
        queryBuilder.where(condition, variables);
      }

      if (email) {
        const {condition, variables} = this.buildFilter(email, 'email')
        queryBuilder.where(condition, variables);
      }

      if (and) {
        queryBuilder.andWhere(new Brackets(qb => {
          and.forEach(filter => {
            qb.where(this.buildWhere(filter));
          });
        }));
      }

      if (or) {
        queryBuilder.andWhere(new Brackets(qb => {
          or.forEach(filter => {
            qb.where(this.buildWhere(filter));
          });
        }));
      }
    }


    if (sorting) {
      const sortCondition = sorting.reduce((acc, item) => {
        return {...acc, ...{[item.field]: item.direction}}
      }, {});

      queryBuilder.orderBy(sortCondition)
    }

    if (paging) {
      queryBuilder.limit(paging.limit).offset(paging.offset)
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


  private buildWhere(filter: UserFilterInput) {
    const { and, or, id, username, email } = filter;

    if (and) {
      return new Brackets(qb => {
        and.forEach(filter => {
          qb.andWhere(this.buildWhere(filter));
        });
      });
    }

    if (or) {
      return new Brackets(qb => {
        or.forEach(filter => {
          qb.orWhere(this.buildWhere(filter));
        });
      });
    }

    if (id) {
      const {condition, variables} = this.buildFilter(id, 'id')
      return new Brackets(qb => {
        qb.where(condition, variables)
      })
    }

    if (username) {
      const {condition, variables} = this.buildFilter(username, 'username')
      return new Brackets(qb => {
        qb.where(condition, variables)
      })
    }

    if (email) {
      const {condition, variables} = this.buildFilter(email, 'email')
      return new Brackets(qb => {
        qb.where(condition, variables)
      })
    }
  }

  private buildFilter(filter, fieldName) {
    const [operator, value] = Object.entries(filter)[0];

    switch (operator) {
      case 'eq':
        return ({condition: `user.${fieldName} = :${fieldName}`, variables: {[fieldName]: value}})
      case 'gt':
        return ({condition: `user.${fieldName} > :${fieldName}`, variables: {[fieldName]: value}})
      case 'gte':
        return ({condition: `user.${fieldName} >= :${fieldName}`, variables: {[fieldName]: value}})
      case 'lt':
        return ({condition: `user.${fieldName} < :${fieldName}`, variables: {[fieldName]: value}})
      case 'lte':
        return ({condition: `user.${fieldName} <= :${fieldName}`, variables: {[fieldName]: value}})
      case 'like':
        return ({condition: `user.${fieldName} LIKE :${fieldName}`, variables: {[fieldName]: value}})
      case 'neq':
        return ({condition: `user.${fieldName} NOT LIKE :${fieldName}`, variables: {[fieldName]: value}})
    }
  }
}