import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommandModule } from 'nestjs-command';
import { FileModule } from './file/file.module';

@Module({
  imports: [FileModule, CommandModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
