import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {Category} from "../category/category.entity";

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

  @OneToMany(type => Category, category => category.user)
  categories: Category[];
}
