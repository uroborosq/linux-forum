let currentPage = 1;
let maxPage = 1;
async function fetchUsers(pageNumber) {
	const response = await fetch(`/users/page/${pageNumber}`);
	currentPage = pageNumber;
	return await response.json();
}

async function renderUsers(pageNumber) {
	try {
		if (pageNumber <  1) {
			return;
		}
		const users = await fetchUsers(pageNumber);
		let userList = document.getElementById('userlist');

		if (users.length === 0 && pageNumber !== 1) {
			return;
		}
		console.log(users);
		let newAmazingTableWithUsers = '<tr><th>ID</th><th>Name</th><th>Role</th><th>Registration Date</th><th>Country</th></tr>';
		for (const i in users) {
			newAmazingTableWithUsers += '<tr>';
			newAmazingTableWithUsers += `<td>${users[i].id}</td>`;
			newAmazingTableWithUsers += `<td>${users[i].name}</td>`;
			newAmazingTableWithUsers += `<td>${users[i].role}</td>`;
			newAmazingTableWithUsers += `<td>${users[i].createdAt}</td>`;
			newAmazingTableWithUsers += `<td>${users[i].country}</td>`;
			newAmazingTableWithUsers += '</tr>';
		}
		newAmazingTableWithUsers = `<table>${newAmazingTableWithUsers}</table>`;
		userList.innerHTML = newAmazingTableWithUsers;
		let pageIndicator = document.getElementById('pagenumber');
		pageIndicator.innerText = currentPage.toString();
		let preload = document.getElementById('preloader');
		preload.style.display = 'none';
		userList.style.display = 'block';
	} catch (e) {
		let userList = document.getElementById('userlist');
		userList.innerText = '⚠ Что-то пошло не так';
		userList.style.textAlign = 'center';
		let preload = document.getElementById('preloader');
		preload.style.display = 'none';
		userList.style.display = 'block';
	}
}
