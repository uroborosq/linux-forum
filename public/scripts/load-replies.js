let currentPage = 1;
let maxPage = 1;

async function loadReplies(pageNumber, topicID) {
	supertokens.init({
		appInfo: {
			apiDomain: 'http://localhost:3000',
			apiBasePath: '/auth',
			appName: 'linux-forum',
		},
		recipeList: [
			supertokensSession.init(),
			supertokensThirdParty.init(),
		],
	});
	let isAdmin = false;
	let userId = '01';
	if (await supertokensSession.doesSessionExist()) {
		userId = await supertokensSession.getUserId();
		const response = await fetch(`/users/role/${userId}`);
		const user = await response.text();
		isAdmin = user === 'ADMIN';
	}

	const addButton = function (reply)  {
		if (reply.authorId === userId || isAdmin) {
			return `<button class="icon_button" onclick="editReply(${reply.id})">\n` +
				'<i class="fa fa-pencil"></i>\n' +
				'</button>\n' +
				`<button class="icon_button" onclick="deleteReply(${reply.id})">\n` +
				'<i class="fa fa-trash"></i>\n' +
				'</button>';
		} else {
			return '';
		}
	};

	const response = await fetch(
		`/replies/topic/${topicID.toString()}/page/${pageNumber.toString()}`
	);
	const replies = await response.json();
	let obj = document.getElementById('topic__box');
	let html = '';
	for (const i in replies) {
		html += `<div class='reply'>
			<div class='reply__left'>
				<div class='reply__author'>${replies[i].author.name}</div>
				<div class='reply__date'>${compactDate(replies[i].updatedAt)}</div>
			</div>
			<div class='reply__right'>
				<div class='reply__text'>${replies[i].text}</div>
				${addButton(replies[i])}
			</div>
		</div>`;
	}
	html = `<div class='topic__replies-table'>${html}</div>`;
	currentPage = pageNumber;
	let pageIndicator = document.getElementById('pagenumber');
	pageIndicator.innerText = currentPage.toString();
	obj.innerHTML = html;
	await checkPagesNumber();
}

async function loadMaxPageNumber(topicId) {
	const response = await fetch(`/replies/pages/${topicId}`);
	maxPage = Number(await response.text());
	console.log(maxPage);
	await checkPagesNumber();
}

async function checkPagesNumber() {
	console.log(maxPage);
	if (currentPage > 1) {
		document.getElementById('backward_page').style.display = 'inline';
	} else {
		document.getElementById('backward_page').style.display = 'none';
	}
	if (currentPage < maxPage) {
		document.getElementById('forward_page').style.display = 'inline';
	} else {
		document.getElementById('forward_page').style.display = 'none';
	}
}

function compactDate(dateString) {
	const date = new Date(dateString);
	const offsetMs = date.getTimezoneOffset() * 60 * 1000;
	const dateLocal = new Date(date.getTime() - offsetMs);
	return dateLocal
		.toISOString()
		.slice(0, 19)
		.replace(/-/g, '/')
		.replace('T', ' ');
}

async function editReply(id) {
	let obj = document.getElementById(`reply__text-${id}`);
	let text = obj.innerText;
	obj.innerHTML = `<textarea cols=100 id="reply__text-${id}-edit">${text}</textarea><p><input type="button" value="Подтвердить" onclick=sendEdittedReply(${id})></p>`;
	// obj.innerText = '';
	// document.getElementById(`reply__text_${id}-edit`).value = text;
}

async function deleteReply(id) {
	const resp = await fetch(`/replies/${id}`, {
		method: 'DELETE',
	});

	if (resp.status === 200) {
		location.reload();
	} else if (CheckRefresh(resp)) {
		const resp = await fetch(`/replies/${id}`, {
			method: 'DELETE',
		});
		if (resp.status === 200) {
			location.reload();
		} else {
			alert('NOOOOOO');
		}
	} else {
		alert('NOOOOOO');
	}
}

async function sendEdittedReply(id) {
	const text = document.getElementById(`reply__text-${id}-edit`).value;
	const response = await fetch(`/replies/text/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ text: text }),
	});

	if (response.status === 200) {
		location.reload();
	} else if (CheckRefresh(response)) {
		const response = await fetch(`/replies/text/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ text: text }),
		});
		if (response.status === 200) {
			location.reload();
		} else {
			const reply = await response.text();
			alert('Ты ошибся' + reply);
		}
	} else {
		const reply = await response.text();
		alert('Ты ошибся' + reply);
	}
}
async function sendTopic(id) {
	const topicName = document.getElementById('topic-name').value;
	const topicText = document.getElementById('topic-text').value;

	const data = {
		title: topicName,
		description: topicText,
	};

	const response = await fetch(`/topics/${id}`, {
		method: 'PUT',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	if (response.status === 201 || response.status === 200) {
		location.reload();
	} else if (await CheckRefresh(response)) {
		const response = await fetch(`/topics/${id}`, {
			method: 'PUT',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (response.status === 201 || response.status === 200) {
			location.reload();
		} else {
			alert('Ты ошибся');
		}
	} else {
		alert('Ты ошибся');
	}
}

async function deleteTopic(id) {
	const response = await fetch(`/topics/${id.toString()}`, {
		method: 'DELETE',
	});
	if (response.status === 200) {
		window.location.href = '/forum.html';
	} else if (await CheckRefresh(response)) {
		const response = await fetch(`/topics/${id.toString()}`, {
			method: 'DELETE',
		});
		if (response.status === 200) {
			window.location.href = '/forum.html';
		} else {
			alert('Не работает');
		}
	} else {
		alert('Не работает');
	}
}

function updateTopic() {
	document.getElementById('topic__create').style.display = 'block';
}
