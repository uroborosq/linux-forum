async function showForm(articleID) {
	const response = await fetch(`/categories/${articleID}`)
	const article = await response.json()
	document.getElementById('category_title').value = article.name
	document.getElementById('category_parent').value = article.parentId
	document.getElementById('category__form').style.display = 'block'
}

function hideForm() {
	document.getElementById('category__form').style.display = 'none'
}

async function updateCategory(categoryId) {
	const form = document.querySelector('#category__form')
	const titleInput = form.querySelector('#category_title')
	const articleInput = Number(form.querySelector('#category_parent').value)

	const categoryData = {
		name: titleInput.value,
		categoryId: articleInput,
	}

	try {
		const response = await fetch(`/categories/${categoryId}`, {
			method: 'PATCH',
			body: JSON.stringify(categoryData),
			headers: {
				'Content-Type': 'application/json',
			},
		})

		if (response.status === 200) {
			location.reload()
		} else if (await CheckRefresh(response)) {
			const response = await fetch(`/categories/${categoryId}`, {
				method: 'PATCH',
				body: JSON.stringify(categoryData),
				headers: {
					'Content-Type': 'application/json',
				},
			})

			if (response.status === 200) {
				location.reload()
			} else {
				const text = await response.text()
				alert('Ты ошибся' + text)
			}
		} else {
			const text = await response.text()
			alert('Ты ошибся' + text)
		}
	} catch (error) {
		console.error('Error updating category:', error)
	}
}
async function deleteCategory(categoryId) {
	const response = await fetch(`/categories/${categoryId}`, {
		method: 'DELETE',
	})
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`)
	}
	if (response.status === 200) {
		window.location.href = '/wiki.html'
	} else if (await CheckRefresh(response)) {
		const response = await fetch(`/categories/${categoryId}`, {
			method: 'DELETE',
		})
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}
		if (response.status === 200) {
			window.location.href = '/wiki.html'
		} 
	}
}
