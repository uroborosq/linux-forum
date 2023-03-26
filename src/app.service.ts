import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	getLatestNews(n: number): string[] {
		let minutesLeft = 60;

		if (n > 20) {
			throw 'Number of news must be lower than 21';
		}
		const news = Array<string>();
		for (let i = 0; i < n; i++) {
			const rand = Math.floor(Math.random() * minutesLeft);
			minutesLeft -= rand;
			news.push(`${60 - minutesLeft} минут назад: подождите, загрузка...`);
		}
		return news;
	}
}
