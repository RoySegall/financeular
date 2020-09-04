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

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    FileModule,
    CommandModule,
    UserModule,
    CategoryModule,
    RowModule,
    TypeOrmModule.forRoot({
      "type": "mysql",
      "host": "localhost",
      "port": 3306,
      "username": "root",
      "password": "root",
      "database": "fincaular",
      "autoLoadEntities": true,
      "synchronize": true
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
})
export class AppModule {}
