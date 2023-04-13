import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, In, Brackets} from 'typeorm';
import {UserInputDto} from "./dto/user-input.dto";
import {User} from "./user.model";
import {Permission} from "../permission/permission.model";
import {Role} from "../role/role.model";
import {FilterService} from "../filter/filter.service";
import {UserConnection} from "./dto/user-connection.dto";
import {OffsetPaging} from "../paging/types/offset-paging.dto";

@Injectable()
export class UserService extends FilterService{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ) {
    super();
  }

  async getOneById(id: number): Promise<User> {
    return  await this.userRepository.findOneBy({id: id});
  }

  async getMany(filter, sorting, paging: OffsetPaging = {limit: 3, offset: 0}): Promise<UserConnection> {
    const queryBuilder = this.userRepository.createQueryBuilder('user')
      .leftJoin('user.roles', 'role')
      .leftJoin('user.permissions', 'permission');

    let nodes = [];

    if (filter) {
      const { and, or, id, username, email } = filter;

      if (id) {
        const {condition, variables} = this.buildFilter(id, 'user.id', 'id')
        queryBuilder.where(condition, variables);
      }

      if (username) {
        const {condition, variables} = this.buildFilter(username, 'user.username', 'username')
        queryBuilder.where(condition, variables);
      }

      if (email) {
        const {condition, variables} = this.buildFilter(email, 'user.email', 'email')
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

    nodes = await queryBuilder.skip(paging.offset).take(paging.limit).getMany();
    const total = await queryBuilder.getCount();
    const hasNextPage = paging.limit + paging.offset < total;
    const hasPreviousPage = paging.offset > 0

    return {pageInfo: { hasNextPage, hasPreviousPage} , nodes: nodes};
  }

  async create(user: UserInputDto): Promise<User> {
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


  private buildWhere(filter) {
    const { and, or, id, username, email, name, roles, permissions } = filter;

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

    if (roles) {
        if (roles.id) {
          const {condition, variables} = this.buildFilter(roles.id, 'role.id', 'roleId')

          return new Brackets(qb => {
            qb.where(condition, variables)
          })
        }

      if (roles.name) {
        const {condition, variables} = this.buildFilter(roles.name, 'role.name', 'roleName')

        return new Brackets(qb => {
          qb.where(condition, variables)
        })
      }

        if (roles.and) {
          return new Brackets(qb => {
            roles.and.forEach(filter => {
              qb.andWhere(this.buildWhere(filter));
            });
          });
        }

      if (roles.or) {
        return new Brackets(qb => {
          roles.or.forEach(filter => {
            qb.orWhere(this.buildWhere(filter));
          });
        });
      }
    }

    if (permissions) {
      if (permissions.id) {
        const {condition, variables} = this.buildFilter(permissions.id, 'permission.id', 'permissionId')

        return new Brackets(qb => {
          qb.where(condition, variables)
        })
      }

      if (permissions.name) {
        const {condition, variables} = this.buildFilter(permissions.name, 'permission.name', 'permissionName')

        return new Brackets(qb => {
          qb.where(condition, variables)
        })
      }

      if (permissions.and) {
        return new Brackets(qb => {
          permissions.and.forEach(filter => {
            qb.andWhere(this.buildWhere(filter));
          });
        });
      }

      if (permissions.or) {
        return new Brackets(qb => {
          permissions.or.forEach(filter => {
            qb.orWhere(this.buildWhere(filter));
          });
        });
      }
    }

    if (id) {
      const {condition, variables} = this.buildFilter(id, 'user.id', 'id')
      return new Brackets(qb => {
        qb.where(condition, variables)
      })
    }

    if (username) {
      const {condition, variables} = this.buildFilter(username, 'user.username', 'username')
      return new Brackets(qb => {
        qb.where(condition, variables)
      })
    }

    if (email) {
      const {condition, variables} = this.buildFilter(email, 'user.email', 'email')
      return new Brackets(qb => {
        qb.where(condition, variables)
      })
    }

    if (name) {
      const {condition, variables} = this.buildFilter(name, 'user.name', 'name')
      return new Brackets(qb => {
        qb.where(condition, variables)
      })
    }
  }

}