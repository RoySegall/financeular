import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Row} from "./row.entity";

@Injectable()
export class RowService {

  constructor(
    @InjectRepository(Row)
    private rowRepository: Repository<Row>
  ) {}

  async getAll(): Promise<Row[]> {
    return this.rowRepository.find({relations: ['category', 'file']})
  }
}
