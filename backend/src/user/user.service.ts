import { Injectable } from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import "bcrypt";
import {hashSync, compareSync} from "bcrypt";

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async getAll(): Promise<User[]> {
    return this.userRepository.find({relations: ['files']});
  }

  async findById(id: number): Promise<User> {
    const users = await this.userRepository.find({where: {id: id}});
    return users[0];
  }

  async getByUsername(username: string): Promise<User | undefined> {
    const results = await this.userRepository.find({where: {username}});

    return results[0];
  }

  async getByUsernameAndPassword(username: string, password: string): Promise<User | undefined> {
    const user = await this.getByUsername(username);

    if (!user) {
      return null;
    }

    if (compareSync(password, user.password)) {
      return user;
    }

    return null;
  }

  async createUser(username: string, password: string): Promise<User> {
    const user = new User();
    user.username = username;
    user.email = `${username}@example.com`;
    user.password = hashSync(password, 10);
    try {
      const results = await this.userRepository.insert(user);
      console.log(results);
      return user;
    } catch (e) {
      console.log(e);
    }
  }
}
