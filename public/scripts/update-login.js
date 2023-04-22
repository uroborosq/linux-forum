let isLogged = false;


(async () => {


	async function update() {
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
		console.log(window.location.hostname);
		let obj = document.getElementById('top__navbar_lc');
		if (await supertokensSession.doesSessionExist()) {
			let userId = await supertokensSession.getUserId();
			const response = await fetch(`/users/${userId}`);
			const user = await response.json();
			obj.innerText = user.name;
			isLogged = true;
		} else {
			obj.innerText = 'Авторизация';
			isLogged = false;
		}
	}
	window.addEventListener('load', _ => {update();});

})();

