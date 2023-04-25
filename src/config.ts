import ThirdParty from 'supertokens-node/recipe/thirdparty'
import Session from 'supertokens-node/recipe/session'
import { PrismaClient } from '@prisma/client'
import * as process from 'process'

export const appInfo = {
	appName: 'linux-forum',
	apiDomain: process.env.HOST,
	websiteDomain: process.env.HOST,
	apiBasePath: '/auth',
	websiteBasePath: '/index.html'
}

export const connectionUri = process.env.CONNECTION_URI

export const recipeList = [
	ThirdParty.init({
		signInAndUpFeature: {
			providers: [
				ThirdParty.Github({
					clientId: process.env.GITHUB_CLIENT_ID,
					clientSecret: process.env.GITHUB_SECRET,
				}),
			]
		},
		override: {
			apis: (originalImplementation) => {
				return {
					...originalImplementation,
					signInUpPOST: async function(input) {
						if (originalImplementation.signInUpPOST === undefined) {
							throw Error('Should never come here')
						}
						const response = await originalImplementation.signInUpPOST(input)
						console.log(response)
						if (response.status === 'OK') {
							const { id, email } = response.user
							const client = new PrismaClient()
							if (await client.user.findUnique({ where: { id: id } }) == null) {
								await client.user.create({
									data: {
										id: id,
										email: email,
										name: email
									}
								})
							}
						}
						return response
					}
				}
			}
		},}
	),
	Session.init(),
]
