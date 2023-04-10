import {Resolver, Args, Mutation, Query} from '@nestjs/graphql';
import { UserService } from './user.service';
import {User} from "./user.model";

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async user(@Args('id') id: number) {
    return this.userService.getOneById(id)
  }

  @Mutation(() => User)
  async createUser(@Args('username') username: string,  @Args('email') email: string) {
    const user = new User();
    user.username = username;
    user.email = email;

    return this.userService.create(user);
  }
}