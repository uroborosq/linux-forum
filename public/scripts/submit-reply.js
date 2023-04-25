async function sendReply(topicID) {
	event.preventDefault()
	const text = document.getElementById('topic__sendarea').value

	let reply = {
		text: text,
		topicId: Number(topicID),
	}

	const response = await fetch('/replies', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(reply),
	})

	if (response.status !== 200 && response.status !== 201 && response.status !== 401) {
		const text = await response.text()
		alert('Ты ошибся' + text)
	} else if (await CheckRefresh(response)) {
		const response = await fetch('/replies', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(reply),
		})
		if (response.status !== 200 && response.status !== 201 && response.status !== 401) {
			const text = await response.text()
			alert('Ты ошибся по второму разу' + text)
		} else {
			await loadMaxPageNumber(topicID)
			loadReplies(maxPage, topicID)
		}
	}
	else {
		await loadMaxPageNumber(topicID)
		loadReplies(maxPage, topicID)
	}
}
