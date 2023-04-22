function decorateNavbar() {

	let currentPage = document.location.pathname.split('/').pop();
	let element = undefined;
	switch (currentPage) {
	case '':
		element = document.getElementById('top__navbar_main');
		break;
	case 'index.html':
		element = document.getElementById('top__navbar_main');
		break;
	case 'wiki.html':
		element = document.getElementById('top__navbar_wiki');
		break;
	case 'forum.html':
		element = document.getElementById('top__navbar_forum');
		break;
	case 'lc.html':
		element = document.getElementById('top__navbar_lc');
		break;
	case 'userlist.html':
		element = document.getElementById('top__navbar_users');
		break;
	}
	if (element) {
		element.style.fontStyle = 'bold';
		element.style.textDecoration = 'underline';
	} else {
		console.log(document);
	}


}
