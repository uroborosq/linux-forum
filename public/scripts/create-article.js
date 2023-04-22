function showArticleCreate() {
	let area = document.getElementById('wiki__createarea');
	area.innerHTML = `<form id="wiki__createarea_form">
    <fieldset>
    <legend>Введите данные статьи</legend>
    <p>
        <label>Введите название статьи</label>
        <input type="text" tabindex="1" id="wiki__createarea_form_title">
    </p>
    <p>
        <label>Введите ID категории, потому что мне лень делать поиск по названию</label>
        <input type="text" tabindex="2" id="wiki__createarea_form_category">
    </p>
    <p>
        <label>Введите текст статьи</label>
        <label><textarea id='wiki__sendarea' rows='7' cols='75' tabindex='3'></textarea></label>
    </p>
    </fieldset>
    <label id="wiki__createarea_form_output"></label>
    <input type="button" value="Создать" onclick="createArticle()">
    <input type="button" value="Закрыть" onclick="hideArticleCreate()">
    </form>`;
}

function hideArticleCreate() {
	document.getElementById('wiki__createarea').innerHTML =
		'<input type="button" value="Создать новую статью" onclick="showArticleCreate()">';
}

async function createArticle() {
	const text = document.getElementById('wiki__sendarea').value;
	const title = document.getElementById('wiki__createarea_form_title').value;
	const category = document.getElementById(
		'wiki__createarea_form_category'
	).value;

	const response = await fetch('/articles', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			text: text,
			title: title,
			categoryId: Number(category),
			mainternersIds: [],
		}),
	});


	if (response.status === 200 || response.status === 201) {
		document.getElementById('wiki__createarea_form_output').innerText =
			'Статья успешно создана';
	} else if (await CheckRefresh(response)) {
		const response = await fetch('/articles', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				text: text,
				title: title,
				categoryId: Number(category),
				mainternersIds: [],
			}),
		});
		if (response.status === 200 || response.status === 201) {
			document.getElementById('wiki__createarea_form_output').innerText =
				'Статья успешно создана';
		} else {
			const funnyText = await response.text();
			document.getElementById('wiki__createarea_form_output').innerText =
				'Статья успешно не создана' + funnyText;
		}
	} else {
		const funnyText = await response.text();
		document.getElementById('wiki__createarea_form_output').innerText =
			'Статья успешно не создана' + funnyText;
	}
}

function showCategoryCreate() {
	let area = document.getElementById('wiki__createcategory');
	area.innerHTML = `<form id="wiki__createcategory_form">
    <fieldset>
    <legend>Введите данные статьи</legend>
    <p>
        <label>Введите название категории</label>
        <input type="text" tabindex="1" id="wiki__createcategory_form_title">
    </p>
    <p>
        <label>Введите ID родительской категории</label>
        <input type="text" tabindex="2" id="wiki__createcategory_form_category">
    </p>
    </fieldset>
    <label id="wiki__createcategory_form_output"></label>
    <input type="button" value="Создать" onclick="createCategory()">
    <input type="button" value="Закрыть" onclick="hideCategoryCreate()">
    </form>`;
}

function hideCategoryCreate() {
	document.getElementById('wiki__createcategory').innerHTML =
		'<input type="button" value="Создать новую категорию" onclick="showCategoryCreate()">';
}

async function createCategory() {
	const title = document.getElementById('wiki__createcategory_form_title').value;
	const category = Number(document.getElementById(
		'wiki__createcategory_form_category'
	).value);

	const response = await fetch('/categories', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			name: title,
			parentId: category,
		}),
	});

	if (response.status === 200 || response.status === 201) {
		document.getElementById('wiki__createcategory_form_output').innerText =
			'Категория успешно создана';
		location.reload();
	} else if (await CheckRefresh(response)) {
		const response = await fetch('/categories', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: title,
				parentId: category,
			}),
		});
		if (response.status === 200 || response.status === 201) {
			document.getElementById('wiki__createcategory_form_output').innerText =
				'Категория успешно создана';
			location.reload();
		} else {
			const funnyText = await response.text();
			document.getElementById('wiki__createcategory_form_output').innerText =
				'Категория успешно не создана' + funnyText;
		}
	} else {
		const funnyText = await response.text();
		document.getElementById('wiki__createcategory_form_output').innerText =
			'Категория успешно не создана' + funnyText;
	}
}
