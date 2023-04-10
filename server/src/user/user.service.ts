import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UserInput} from "./dto/user.input";
import {User} from "./user.model";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getOneById(id: number): Promise<User> {
    return  await this.userRepository.findOneBy({id: id});
  }

  async create(user: UserInput): Promise<User> {
    const newUser = await this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }
}