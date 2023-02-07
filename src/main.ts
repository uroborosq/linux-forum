import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from "process";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn']
  });
  let port = process.env.PORT;
  if (port === undefined) {
    port = "3000"
    console.log("WARN: $PORT is not specified, using 3000 by default")
  }
  await app.listen(parseInt(port));
}
bootstrap();
