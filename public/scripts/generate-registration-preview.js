(function () {

	function generateRegistrationPreview(event) {
		event.preventDefault()
		let login = document.getElementById('rform__input_login').value
		let country = document.getElementById('rform__input_country').value
		let email = document.getElementById('rform__input_email').value
		let pass = document.getElementById('rform__input_pass').value
		let confirm = document.getElementById('rform__input_passconfirm').value
		let preview = document.getElementById('preview')
		let errorString = ''
		if (login === '') {
			errorString += 'Логин не должен быть пустым<br>'
		}

		if (pass === '') {
			errorString += 'Пароль не должен быть пустым<br>'
		}

		if (pass !== confirm) {
			errorString += 'Пароли не совпадают<br>'
		}
		if (!validateEmail(email)) {
			errorString += 'Неверный формат email<br>'
		}
		if (errorString === '') {
			window.localStorage.setItem('login', login)
			window.localStorage.setItem('email', email)
			window.localStorage.setItem('country', country)
			let form = document.getElementById('rform')
			form.style.display = 'none'
			preview.outerHTML = `
        <h2>Проверьте данные учетной записи</h2>
        <div class="box">
        <p>
        Логин: ${login}
</p>
<p>
    Страна: ${country}
</p>
<p>
Email: ${email}
</p>
<button type="submit" onclick="location.href='index.html';"">Подтвердить</button> 
</div>
`
		}
		else {
			let errorLabel = document.getElementById('rform_errors')
			errorLabel.innerHTML = errorString
			errorLabel.style.color = 'red'
		}
	}

	window.addEventListener('submit', generateRegistrationPreview)
})()

const validateEmail = (email) => {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		)
}