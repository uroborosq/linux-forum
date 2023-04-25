function initSocket() {
	let socket = io(window.location.origin)
	socket.on('news', (data) => {
		let existingArticles = document.getElementsByClassName('news__article')
		if (existingArticles.length === 0) {
			document.getElementById('news__list').innerHTML = `
			<div class="news__article">
			<div class="news__article_title">${data.title}</div>
			<div class="news__article_text">${data.text}</div>
			<div class="news__article_date">${compactDate(data.date)}</div>
			</div>`
		} else if (existingArticles.length < 5) {
			document.getElementById('news__list').innerHTML = `
			<div class="news__article">
			<div class="news__article_title">${data.title}</div>
			<div class="news__article_text">${data.text}</div>
			<div class="news__article_date">${compactDate(data.date)}</div>
			</div>
			${document.getElementById('news__list').innerHTML}`
		} else {
			console.log(existingArticles)
			for (let i = 4; i > 0; i--) {
				existingArticles[i].innerHTML = existingArticles[i - 1].innerHTML
			}
			existingArticles[0].innerHTML = `
			<div class="news__article_title">${data.title}</div>
			<div class="news__article_text">${data.text}</div>
			<div class="news__article_date">${compactDate(data.date)}</div>
			`
		}
	})
}

function compactDate(dateString) {
	const date = new Date(dateString)
	const offsetMs = date.getTimezoneOffset() * 60 * 1000
	const dateLocal = new Date(date.getTime() - offsetMs)
	return dateLocal
		.toISOString()
		.slice(0, 19)
		.replace(/-/g, '/')
		.replace('T', ' ')
}