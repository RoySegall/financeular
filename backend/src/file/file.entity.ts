import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, OneToMany} from 'typeorm';
import {User} from "../user/user.entity";
import {Category} from "../category/category.entity";

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  path: string;

  @CreateDateColumn()
  createDate: Date;

  @ManyToOne(type => User, user => user.files)
  user: User;

  @OneToMany(type => Category, category => category.file)
  categories: Category[];
}
