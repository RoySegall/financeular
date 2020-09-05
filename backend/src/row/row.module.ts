import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Row} from "./row.entity";
import { RowService } from './row.service';
import { RowResolver } from './row.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Row])],
  providers: [RowService, RowResolver]
})
export class RowModule {}
