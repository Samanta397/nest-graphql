import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../user/dto/user.entity";
import {Role} from "../../role/dto/role.entity";

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => User, user => user.permissions)
  users: User[];

  @ManyToMany(() => Role, role => role.permissions)
  roles: Role[];
}