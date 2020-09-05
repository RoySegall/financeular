import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommandModule } from 'nestjs-command';
import { FileModule } from './file/file.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {RowModule} from "./row/row.module";
import { GraphQLModule } from '@nestjs/graphql';
import {join} from "path";
import {ConfigModule} from "@nestjs/config";

const DB_PORT = parseInt(process.env.DATABASE_PORT);

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    FileModule,
    CommandModule,
    UserModule,
    CategoryModule,
    RowModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      "type": "mysql",
      "host": process.env.DATABASE_HOST,
      "port": DB_PORT,
      "username": process.env.DATABASE_USER,
      "password": process.env.DATABASE_PASS,
      "database": process.env.DATABASE_NAME,
      "autoLoadEntities": true,
      "synchronize": true
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
})
export class AppModule {}
