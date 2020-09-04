import { Injectable } from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async getAll(): Promise<User[]> {
    const foo = await this.userRepository.find({relations: ['files']});
    return this.userRepository.find({relations: ['files']});
  }
}
