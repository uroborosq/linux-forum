async function showForm(articleID) {
	const response = await fetch(`/articles/${articleID}`);
	const article = await response.json();
	document.getElementById('article_title').value = article.title;
	document.getElementById('article_text').value = article.text;
	document.getElementById('article_category').value = article.categoryId;
	document.getElementById('article__form').style.display = 'block';
}

function hideForm() {
	document.getElementById('article__form').style.display = 'none';
}

async function updateArticle(articleId) {
	const form = document.querySelector('#article__form');
	const titleInput = form.querySelector('#article_title');
	const textInput = form.querySelector('#article_text');
	const articleInput = Number(form.querySelector('#article_category').value);

	const articleData = {
		title: titleInput.value,
		text: textInput.value,
		categoryId: articleInput,
	};

	try {
		const response = await fetch(`/articles/${articleId}`, {
			method: 'PATCH',
			body: JSON.stringify(articleData),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (response.status === 200) {
			location.reload();
		} else if (await CheckRefresh(response)) {
			const response = await fetch(`/articles/${articleId}`, {
				method: 'PATCH',
				body: JSON.stringify(articleData),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (response.status === 200) {
				location.reload();
			} else {
				const text = await response.text();
				alert('Ты ошибся' + text);
			}
		} else {
			const text = await response.text();
			alert('Ты ошибся' + text);
		}
	} catch (error) {
		console.error('Error updating article:', error);
	}
}
async function deleteArticle(articleId, categoryId) {
	const response = await fetch(`/articles/${articleId}`, {
		method: 'DELETE',
	});
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	if (response.status === 200) {
		window.location.href = `/category-${categoryId}`;
	} else if (await CheckRefresh(response)) {
		const response = await fetch(`/articles/${articleId}`, {
			method: 'DELETE',
		});
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		if (response.status === 200) {
			window.location.href = `/category-${categoryId}`;
		} else {
			alert('Ты ошибся');
		}
	} else {
		alert('Ты ошибся');
	}
}
