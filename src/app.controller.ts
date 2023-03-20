import { Controller, Get, Render, UseInterceptors } from "@nestjs/common";
import { AppService } from './app.service';
import { AppInterceptor } from "./app.interceptor";

@Controller()
@UseInterceptors(AppInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {
  }
  @Get()
  @Render("index")
  root() {
    return {news: this.appService.getLatestNews(5),
            authorizationStatus: "Не авторизован"}
  }

  @Get("/index.html")
  @Render('index')
  index() {
    return {news: this.appService.getLatestNews(5),authorizationStatus: "Не авторизован"}
  }

  @Get("/wiki.html")
  @Render('wiki')
  wiki() {
    return {authorizationStatus: "Не авторизован"}
  }

  @Get("/lc.html")
  @Render("lc")
  lc() {
    return {authorizationStatus: "Не авторизован"}
  }

  @Get("/registration.html")
  @Render("registration")
  registration() {
    return {authorizationStatus: "Не авторизован"}
  }

  @Get("/userlist.html")
  @Render("userlist")
  userList() {
    return {authorizationStatus: "Не авторизован"}
  }

  @Get("/forum.html")
  @Render("forum")
  forum() {
    return {
      authorizationStatus: "Не авторизован"
    }
  }
}
