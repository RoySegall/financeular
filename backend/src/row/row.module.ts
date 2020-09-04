import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Row} from "./row.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Row])]
})
export class RowModule {}
