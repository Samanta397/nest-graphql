import {registerEnumType} from "@nestjs/graphql";

export enum UserSortField {
  id = 'id',
  username = 'username',
  email = 'email',
}

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC'
}

registerEnumType(UserSortField, {
  name: 'UserSortField',
});

registerEnumType(SortDirection, {
  name: 'SortDirection'
})