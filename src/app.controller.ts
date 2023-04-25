import {
	Controller,
	Get,
	Param,
	Render,
	Res,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common'
import { AppService } from './app.service'
import { AppInterceptor } from './app.interceptor'
import { ApiExcludeController } from '@nestjs/swagger'
import { ReplyService } from './reply/reply.service'
import { TopicService } from './topic/topic.service'
import { ArticleService } from './article/article.service'
import { CategoryService } from './category/category.service'
import { SessionContainer } from 'supertokens-node/recipe/session'
import { Session } from './auth/session.decorator'
import { AuthOptionalGuard } from './auth/auth.optional-guard'
import { UserService } from './user/user.service'
import { Reply, Role } from '@prisma/client'
import { NewsService } from './news/news.service'

@ApiExcludeController()
@Controller()
@UseInterceptors(AppInterceptor)
export class AppController {
	constructor(
		private readonly appService: AppService,
		private readonly replyService: ReplyService,
		private readonly topicService: TopicService,
		private readonly articleService: ArticleService,
		private readonly categoryService: CategoryService,
		private readonly userService: UserService,
		private readonly newsService: NewsService
	) {}

	@Get()
	@Render('index')
	// @UseGuards(new AuthOptionalGuard())
	async root(@Session() session: SessionContainer) {
		let loggedUser = 'Авторизация'
		if (session !== undefined) {
			loggedUser = (await this.userService.getUser(session.getUserId())).name
		}
		return {
			news: await this.newsService.getLastNews(5),
			authorizationStatus: loggedUser,
		}
	}
	@Get('/index.html')
	@Render('index')
	async index(@Session() session: SessionContainer) {
		let loggedUser = 'Авторизация'
		if (session !== undefined) {
			loggedUser = (await this.userService.getUser(session.getUserId())).name
		}
		return {
			news: await this.newsService.getLastNews(5),
			authorizationStatus: loggedUser,
		}
	}

	@Get('/wiki.html')
	@Render('wiki')
	@UseGuards(new AuthOptionalGuard())
	async wiki(@Session() session: SessionContainer) {
		let loggedUser = 'Авторизация'
		let createButton = ''
		let createCategory = ''
		if (session !== undefined) {
			loggedUser = (await this.userService.getUser(session.getUserId())).name
			if (
				(await this.userService.getUserRole(session.getUserId())) == Role.ADMIN
			) {
				createButton =
					'<input type="button" value="Создать новую статью" onclick="showArticleCreate()">'
				createCategory =
					'<input type="button" value="Создать новую категорию" onclick="showCategoryCreate()">'
			}
		}
		return {
			authorizationStatus: loggedUser,
			createButton: createButton,
			createCategory: createCategory,
		}
	}
	@Get('/lc.html')
	@Render('lc')
	@UseGuards(new AuthOptionalGuard())
	async lc(@Session() session: SessionContainer) {
		let loggedUser = 'Авторизация'
		let button = '<input type="button" value="Войти через GitHub" onclick="GitHubClicked()">'
		console.log(session)
		if (session !== undefined) {
			loggedUser = (await this.userService.getUser(session.getUserId())).name
			button =
				'<input type="button" value="Выйти" onclick="async function logOut() {await supertokensSession.signOut(); window.location.href = \'/\';} logOut()">'
		}
		return {
			authorizationStatus: loggedUser,
			button: button,
		}
	}

	@Get('/userlist.html')
	@Render('userlist')
	@UseGuards(new AuthOptionalGuard())
	async userList(@Session() session: SessionContainer) {
		let loggedUser = 'Авторизация'
		if (session !== undefined) {
			loggedUser = (await this.userService.getUser(session.getUserId())).name
		}
		return {
			authorizationStatus: loggedUser,
		}
	}
	@Get('/forum.html')
	@Render('forum')
	@UseGuards(new AuthOptionalGuard())
	async forum(@Session() session: SessionContainer) {
		let loggedUser = 'Авторизация'
		let createButton = ''
		if (session !== undefined) {
			loggedUser = (await this.userService.getUser(session.getUserId())).name
			if ((await this.userService.getUserRole(session.getUserId())) == Role.ADMIN) {
				createButton =
					'<input value="Создать топик" type="button" onclick="showForm()">'
			}
		}
		return {
			authorizationStatus: loggedUser,
			createButton: createButton,
		}
	}
	@Get('/topic-:topicId')
	@Render('topic')
	@UseGuards(new AuthOptionalGuard())
	async topic(
		@Session() session: SessionContainer,
		@Param('topicId') topicId: number
	) {
		let loggedUser = 'Авторизация'
		let topicButtons = ''
		const replies = await this.replyService.getByTopicId(topicId, 1)
		const repliesAndButtons: Array<{ reply: Reply; button: string }> = []
		let sendArea = ''
		if (session !== undefined) {
			const role = await this.userService.getUserRole(session.getUserId())

			if (role == Role.ADMIN || (await this.topicService.get(topicId)).authorId == session.getUserId()) {
				topicButtons =
					'<input type="button" value="Обновить топик" onclick="updateTopic()">\n' +
					`<input type="button" value="Удалить топик" onclick="deleteTopic(${topicId})">`
			}

			loggedUser = (await this.userService.getUser(session.getUserId())).name

			for (const i in replies) {
				if (replies[i].authorId == session.getUserId() || role == Role.ADMIN) {
					repliesAndButtons.push({
						reply: replies[i],
						button:
							`<button class="icon_button" onclick="editReply(${replies[i].id})">\n` +
							'<i class="fa fa-pencil"></i>\n' +
							'</button>\n' +
							`<button class="icon_button" onclick="deleteReply(${replies[i].id})">\n` +
							'<i class="fa fa-trash"></i>\n' +
							'</button>',
					})
				} else {
					repliesAndButtons.push({ reply: replies[i], button: '' })
				}
			}

			sendArea = `<div class='topic__controls_send-text'>
				<label class="topic__controls_sendarea">
				<textarea id='topic__sendarea' rows='7' cols='75' tabindex='1'></textarea>
				</label>
				<input id="topic__controls_sendbutton" type='button' value='Отправить штуку' onclick='sendReply(${topicId})'>
				</div>`
		} else {
			for (const i in replies) {
				repliesAndButtons.push({ reply: replies[i], button: '' })
			}
		}
		const topic = await this.topicService.get(topicId)
		return {
			authorizationStatus: loggedUser,
			topicID: topicId,
			topicName: topic.title,
			topicDescription: topic.description,
			replies: repliesAndButtons,
			topicButtons: topicButtons,
			sendArea: sendArea,
		}
	}
	@Get('/category-:categoryId')
	@Render('listOfCategory')
	@UseGuards(new AuthOptionalGuard())
	async getArticles(
		@Session() session: SessionContainer,
		@Param('categoryId') categoryId: number
	) {
		let buttons = ''
		let loggedUser = ''
		const articles = await this.articleService.getByCategoryId(categoryId)
		const category = await this.categoryService.get(categoryId)
		if (session !== undefined) {
			loggedUser = (await this.userService.getUser(session.getUserId())).name
			if (
				(await this.userService.getUserRole(session.getUserId())) == Role.ADMIN
			) {
				buttons = `<button class="form__button" type="button" onclick="showForm(${categoryId})">Редактировать</button>`
			}
		}
		return {
			authorizationStatus: loggedUser,
			categoryName: category.name,
			articles: articles,
			categoryID: category.id,
			buttons: buttons,
		}
	}

	@Get('/article-:articleId')
	@Render('article')
	@UseGuards(new AuthOptionalGuard())
	async getArticle(
		@Session() session: SessionContainer,
		@Param('articleId') articleId: number
	) {
		const article = await this.articleService.getById(articleId)
		let button = ''
		let loggedUser = 'Авторизация'
		if (session !== undefined) {
			loggedUser = (await this.userService.getUser(session.getUserId())).name
			if (
				(await this.userService.getUserRole(session.getUserId())) == Role.ADMIN
			) {
				button =
					`<input type="button" value="Редактировать" onclick="showForm(${articleId})">\n`
			}
		}
		return {
			authorizationStatus: loggedUser,
			articleName: article.title,
			articleText: article.text,
			articleID: article.id,
			categoryID: article.categoryId,
			button: button,
		}
	}
}
