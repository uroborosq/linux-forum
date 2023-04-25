import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { Response } from 'express'

@Catch(Prisma.PrismaClientValidationError)
export class PrismaValidationErrorFilter implements ExceptionFilter {
	catch(exception: Prisma.PrismaClientValidationError, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse<Response>()

		console.log(exception.message)

		response
			.status(HttpStatus.BAD_REQUEST)
			.json({
				description: 'Given data is invalid'
			})

	}
}
@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaKnownRequestFilter implements ExceptionFilter {
	catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse<Response>()
		console.log(exception.message)

		response
			.status(HttpStatus.BAD_REQUEST)
			.json({
				description: 'Given data is invalid'
			})

	}
}