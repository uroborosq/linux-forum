(function () {
    async function fetchUsers() {
        const response = await fetch("https://jsonplaceholder.typicode.com/users")
        return await response.json()
    }

    function randInt(max) {
        let array = [];
        let i = 0;
        for (; i < max; ++i) array[i] = i;
        let tmp, current, top = array.length;
        if (top) while (--top) {
            current = Math.floor(Math.random() * (top + 1));
            tmp = array[current];
            array[current] = array[top];
            array[top] = tmp;
        }
        return array
    }

    async function renderUsers() {
        try {
            const users = await fetchUsers()
            let userList = document.getElementById("userlist")
            let newAmazingTableWithUsers = `<tr><th>Login</th><th>Email</th></tr>`
            let randomIndexes = randInt(users.length).slice(0, 5)
            console.log(randomIndexes)
            console.log(users.length)
            for (const funnyIndex in randomIndexes) {
                console.log(funnyIndex)
                newAmazingTableWithUsers += `<tr>`
                newAmazingTableWithUsers += `<td>${users[randomIndexes[funnyIndex]].name}</td>`
                newAmazingTableWithUsers += `<td>${users[randomIndexes[funnyIndex]].email}</td>`
                newAmazingTableWithUsers += `</tr>`
            }
            newAmazingTableWithUsers = `<table>${newAmazingTableWithUsers}</table>`
            userList.innerHTML = newAmazingTableWithUsers
            let preload = document.getElementById("preloader")
            preload.style.display = 'none'
            userList.style.display = 'block'
        } catch (e) {
            let userList = document.getElementById("userlist")
            userList.innerText = `⚠ Что-то пошло не так`
            userList.style.textAlign = 'center'
            let preload = document.getElementById("preloader")
            preload.style.display = 'none'
            userList.style.display = 'block'
        }
    }

    window.addEventListener("DOMContentLoaded", _ => {
        setTimeout(renderUsers, 1500)
    })
})()
