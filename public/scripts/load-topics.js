let currentPage = 1;

async function changePage(pageNumber) {
	if (pageNumber < 1) {
		return;
	}
	const response = await fetch(`/topics/page/${pageNumber}`);
	const topics = await response.json();

	if (topics.length === 0 && pageNumber !== 1) {
		return;
	}
	currentPage = pageNumber;
	let topicList = '<h3>Темы</h3>';
	console.log(topics);
	for (const i in topics) {
		topicList += ` <div class="topic"><a href="/topic-${topics[i].id}">${topics[i].title}</a></div> `;
	}
	let pageIndicator = document.getElementById('pagenumber');
	pageIndicator.innerText = currentPage.toString();
	let obj = document.getElementById('topics');
	obj.innerHTML = topicList;
}

async function sendTopic() {
	const topicName = document.getElementById('topic-name').value;
	const topicText = document.getElementById('topic-text').value;

	const data = {
		title: topicName,
		description: topicText,
	};

	const response = await fetch('/topics', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	if (response.status === 201 || response.status === 200) {
		hideForm();
		changePage(currentPage);
	} else if (await ChechRefresh(response)) {
		const response = await fetch('/topics', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (response.status === 201 || response.status === 200) {
			hideForm();
			changePage(currentPage);
		} else {
			alert('Ты ошибся');
		}
	}
	else {
		alert('Ты ошибся');
	}
}

function showForm() {
	document.getElementById('forum__create').style.display = 'block';
}

function hideForm() {
	document.getElementById('forum__create').style.display = 'none';
}