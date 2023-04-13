import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class UserInputDto {
  @Field()
  username: string;

  @Field()
  email: string;
}