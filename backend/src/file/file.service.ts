import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {File} from "./file.entity";
import {createWriteStream, existsSync, mkdirSync} from "fs";
import {User} from "../user/user.entity";

@Injectable()
export class FileService {

  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>
  ) {}

  async getAll(): Promise<File[]> {
    return this.fileRepository.find({ relations: ['user', 'categories', 'rows'] });
  }

  getUploadPath(): string {
    return process.env.UPLOAD_PATH;
  }

  async saveFile({createReadStream, filename, mimetype}, user: User): Promise<object> {

    // Check that this is an excel file.
    if (mimetype != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      return new Promise((resolve => {
        resolve({
          status: "failed",
          message: "The file is not a valid excel file",
          fileId: "",
        });
      }));
    }

    // If the folder does not exists - create it.
    if (!existsSync(this.getUploadPath())) {
      mkdirSync(this.getUploadPath());
    }

    const name = `${new Date().getTime()}${filename}`;
    const path = `${this.getUploadPath()}/${new Date().getTime()}${filename}`;

    // Expand the resolver with an error.
    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(path))
        .on('finish', async () => {

          const file = new File();
          file.name = name;
          file.path = path;
          file.user = user;
          await this.fileRepository.save(file);

          resolve({
            status: "success",
            message: "The file has uploaded",
            fileId: file.id
          })
        })
        .on('error', (e) => {
          console.error(e)
          resolve({
            status: "failed",
            message: "An error occurred, please check logs",
            fileId: "",
          });
        })
    );
  }
}
