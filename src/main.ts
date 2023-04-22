import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as process from 'process';
import { join } from 'path';
import * as hbs from 'hbs';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import supertokens from 'supertokens-node';
import { SupertokensExceptionFilter } from './auth/auth.filter';
import ThirdParty from 'supertokens-node/recipe/thirdparty';
const { Google, Github, Apple } = ThirdParty;
async function bootstrap() {
	// supertokens.init({
	// 	appInfo: {
	// 		apiDomain: process.env.HOST,
	// 		appName: 'linux-forum',
	// 		websiteDomain: process.env.HOST,
	// 	},
	// 	recipeList: [
	// 		ThirdParty.init({
	// 			signInAndUpFeature: {
	// 				providers: [
	// 					// We have provided you with development keys which you can use for testing.
	// 					// IMPORTANT: Please replace them with your own OAuth keys for production use.
	// 					Google({
	// 						clientId: '1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com',
	// 						clientSecret: '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'
	// 					})
	// 				]
	// 			}
	// 		}),
	// 	]
	// });
	console.log('Linux forum server started');
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		logger: ['error', 'warn']
	});
	app.use(morgan('tiny'));
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
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			forbidUnknownValues: true,
			enableDebugMessages: true
		}),
	);

	hbs.registerPartials(join(__dirname, '..', 'views', 'partials'));
	hbs.registerHelper('compactDate', function(dateString) {
		const offsetMs = dateString.getTimezoneOffset() * 60 * 1000;
		const dateLocal = new Date(dateString.getTime() - offsetMs);
		return dateLocal.toISOString().slice(0, 19).replace(/-/g, '/').replace('T', ' ');
	});
	hbs.registerHelper('replaceNewlines', function(text: string) {
		console.log(text);
		return `<p>${text.replaceAll('\\n', '</p><p>')}</p>`;
	});
	let port = process.env.PORT;
	if (port === undefined) {
		port = '3000';
		console.log('WARN: $PORT is not specified, using 3000 by default');
	}

	app.enableCors({
		origin: [process.env.HOST],
		allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
		credentials: true,
	});
	app.useGlobalFilters(new SupertokensExceptionFilter());

	await app.listen(parseInt(port));
}

bootstrap();
