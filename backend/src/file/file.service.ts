import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {File} from "./file.entity";

@Injectable()
export class FileService {

  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>
  ) {}

  async getAll(): Promise<File[]> {
    return this.fileRepository.find({ relations: ['user', 'categories', 'rows'] });
  }
}
