import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {File} from "../file/file.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(type => File, file => file.user)
  files: File[];
}
