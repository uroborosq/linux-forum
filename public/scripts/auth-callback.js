(async function() {
	try {
		supertokens.init({
			appInfo: {
				apiDomain: window.location.origin,
				apiBasePath: '/auth',
				appName: 'linux-forum',
			},
			recipeList: [
				supertokensSession.init(),
				supertokensThirdParty.init(),
			],
		});
		const response = await supertokensThirdParty.signInAndUp({});
		if (response.status !== 'OK') {
			console.log(response);
			alert('Это бан');
		}
		window.location.assign('/');
	} catch (err) {
		alert(err.message);
	}
})();