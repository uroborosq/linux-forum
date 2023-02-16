import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as process from "process";
import {join} from 'path';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn']
  });
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  const hbs = require('hbs')
  hbs.registerPartials(join(__dirname, "..", "views/partials"))

  let port = process.env.PORT;
  if (port === undefined) {
    port = "3000"
    console.log("WARN: $PORT is not specified, using 3000 by default")
  }
  await app.listen(parseInt(port));
}

bootstrap();
