import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {File} from "../file/file.entity";
import {Category} from "../category/category.entity";

@Entity()
export class Row {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  date: Date;

  @ManyToOne(type => File, file => file.rows)
  file: File;

  @ManyToOne(type => Category, category => category.rows)
  category: Category;
}
