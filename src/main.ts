import { NestFactory } from '@nestjs/core';
import { PrismaClient } from '@prisma/client';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as process from 'process';
import { join } from 'path';
import * as hbs from 'hbs'
async function bootstrap() {
	console.log('Linux forum server started');
	const prisma = new PrismaClient();
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		logger: ['error', 'warn']
	});
	const config = new DocumentBuilder()
		.setTitle('Linux forum API')
		.setDescription('The description of Linux forum backend API')
		.setVersion('0.0.1')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);
	app.useStaticAssets(join(__dirname, '..', 'public'));
	app.setBaseViewsDir(join(__dirname, '..', 'views'));
	app.setViewEngine('hbs');
	hbs.registerPartials(join(__dirname, '..', 'views', 'partials'));

	let port = process.env.PORT;
	if (port === undefined) {
		port = '3000';
		console.log('WARN: $PORT is not specified, using 3000 by default');
	}
	await app.listen(parseInt(port));
}

bootstrap();
