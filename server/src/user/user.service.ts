import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, In} from 'typeorm';
import {UserInput} from "./dto/user.input";
import {User} from "./user.model";
import {Permission} from "../permission/permission.model";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>
  ) {}

  async getOneById(id: number): Promise<User> {
    return  await this.userRepository.findOneBy({id: id});
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


  // async update(id: number, updateObject: UserInput): Promise<User> {
  //   const user = await this.userRepository.findOneBy({id: id})
  //
  // }
}