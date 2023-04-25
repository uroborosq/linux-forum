import { Module } from '@nestjs/common'
import { CategoryController } from './category.controller'
import { CategoryService } from './category.service'
import { UserService } from '../user/user.service'

@Module({
	imports: [],
	controllers: [CategoryController],
	providers: [CategoryService, UserService]
})
export class CategoryModule {
}