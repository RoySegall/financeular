import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommandModule } from 'nestjs-command';
import { FileModule } from './file/file.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { FileRowModule } from './file-row/file-row.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    FileModule,
    CommandModule,
    UserModule,
    CategoryModule,
    FileRowModule, TypeOrmModule.forRoot({
        "type": "mysql",
        "host": "localhost",
        "port": 3306,
        "username": "root",
        "password": "root",
        "database": "fincaular",
        "autoLoadEntities": true,
        "synchronize": true
      }
    )
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
