
async function loadCategories() {
	const response = await fetch('/categories')
	const categoriesArray = await response.json()
	let categoriesGraph = {0: {title: '', children: [], visited: true}}
	let obj = document.getElementById('wikiguide')
	for (const i in categoriesArray) {
		categoriesGraph[categoriesArray[i].id] = {
			title: categoriesArray[i].name,
			children: [],
			visited: true,
		}
	}
	for (const i in categoriesArray) {
		categoriesGraph[categoriesArray[i].parentId].children.push(categoriesArray[i].id)
	}
	obj.innerHTML = `<h2>Категории</h2>${traverse(categoriesGraph, 0)}`
}

function traverse(graph, index) {
	let html = ''
	if (index !== 0) {
		html = `<li><a href="/category-${index}">${graph[index].title}</a></li><ul>`
	}
	for (const i in graph[index].children) {
		html += `${traverse(graph, graph[index].children[i])}`
	}
	if (index !== 0) {
		html += '</ul>'
	}
	
	return html
}

