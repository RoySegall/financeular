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
    return this.userRepository.find({relations: ['files']});
  }

  async getByUsername(username: string): Promise<User | undefined> {
    const results = await this.userRepository.find({where: {username}});

    return results[0];
  }
}
