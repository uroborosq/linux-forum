import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { Session } from './session.decorator';
import { AuthGuard } from './auth.guard';
import UserMetadata from 'supertokens-node/recipe/usermetadata';
import { ApiCookieAuth, ApiOAuth2 } from '@nestjs/swagger';


@Controller('/auth')
export class AuthController {
	@Get('sessioninfo')
	@UseGuards(new AuthGuard())
	@ApiCookieAuth()
	async getSessionInfo(@Session() session: SessionContainer) {
		UserMetadata.init();
		return {
			sessionHandle: session!.getHandle(),
			userId: session!.getUserId(),
			accessTokenPayload: session!.getAccessTokenPayload(),
			smth: session.getSessionData(),
			sdf: session.getTimeCreated(),
			expiry: session.getExpiry(),
			meta: await UserMetadata.getUserMetadata(session.getUserId())
		};
	}
	@Get('/callback/github')
	@Render('auth')
	// @UseGuards(new AuthGuard())
	async providerGitHub() {
		return {
			// authorizationStatus: session.getUserId()
		};
	}
	@Get('/login')
	@Render('auth')
	async relogin() {
		return;
	}
}