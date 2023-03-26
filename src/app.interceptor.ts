import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class AppInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const start = Date.now();
		return next.handle().pipe(tap((data) => {
			data.serverTime = Date.now() - start;
		}));
	}
}