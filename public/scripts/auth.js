

async function GitHubClicked(){
	await supertokens.init({
		appInfo: {
			apiDomain: window.location.origin,
			apiBasePath: '/auth',
			appName: 'linux-forum',
		},
		recipeList: [
			supertokensSession.init(),
			supertokensThirdParty.init(),
		],
	})
	try {
		const authUrl = await supertokensThirdParty.getAuthorisationURLWithQueryParamsAndSetState({
			providerId: 'github',
			authorisationURL: window.location.origin+'/auth/callback/github',
		})
		window.location.assign(authUrl)
	} catch (err) {
		if (err.isSuperTokensGeneralError === true) {
			window.alert(err.message)
		} else {
			window.alert(err.message)
			window.alert('Oops! Something went wrong.')
		}
	}
}

async function handleGitHubCallback() {
	try {
		const response = await signInAndUp()
		if (response.status === 'OK') {
			window.location.assign('/')
		} else {
			window.alert('No email provided by social login. Please use another form of login')
			window.location.assign('/lc.html')
		}
	} catch (err) {
		if (err.isSuperTokensGeneralError === true) {
			window.alert(err.message)
		} else {
			window.alert('Oops! Something went wrong.')
		}
	}
}