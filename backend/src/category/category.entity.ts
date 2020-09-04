import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {File} from "../file/file.entity";

export enum Period {
  MONTH = "month",
  WEEK = "week",
}

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  amount: number;

  @Column()
  year: number;

  @Column()
  month: number;

  @Column({
    type: "enum",
    enum: Period,
    default: Period.WEEK,
  })
  period: Period;

  @ManyToOne(type => File, file => file.categories)
  file: File;
}
