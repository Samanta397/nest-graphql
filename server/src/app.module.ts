import { Module } from '@nestjs/common';
import {join} from "path";
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";
import { UserModule } from './user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { FilterModule } from './filter/filter.module';
import { SortingModule } from './sorting/sorting.module';
import { PagingModule } from './paging/paging.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      database: 'test_db',
      username: 'root',
      password: 'root',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    UserModule,
    RoleModule,
    PermissionModule,
    FilterModule,
    SortingModule,
    PagingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
