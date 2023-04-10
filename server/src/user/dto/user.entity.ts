import { Entity, Column, ManyToMany, JoinTable, PrimaryGeneratedColumn } from 'typeorm';
import {Permission} from "../../permission/dto/permission.entity";

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
}