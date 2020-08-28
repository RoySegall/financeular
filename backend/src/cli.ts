import { NestFactory } from '@nestjs/core';
import {AppModule} from "./app.module";
import {CommandModule, CommandService} from "nestjs-command";

(async () => {
    const app = await NestFactory.createApplicationContext(AppModule, {
        logger: false // no logger
    });
    app.select(CommandModule).get(CommandService).exec();
})();
