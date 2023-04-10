import { Entity, Column, ManyToMany, JoinTable, PrimaryGeneratedColumn } from 'typeorm';
import {Permission} from "../../permission/dto/permission.entity";
import {Role} from "../../role/dto/role.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @ManyToMany(() => Permission, { cascade: true })
  @JoinTable()
  permissions: Permission[];

  @ManyToMany(() => Role, { cascade: true })
  @JoinTable()
  roles: Role[];
}