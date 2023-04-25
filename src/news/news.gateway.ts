import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server } from 'socket.io'
import { OnEvent } from '@nestjs/event-emitter'
import { NewsArticleDto } from './news.dto'
import { NewsArticle } from '@prisma/client'

@WebSocketGateway(
	{
		cors: {
			origin: '*'}
	})
export class NewsGateway  {
	@WebSocketServer()
		server: Server
	send(data: NewsArticle) : void {
		this.server.emit('news', {
			title: data.title,
			text: data.text,
			date: data.updatedAt
		})
	}

}