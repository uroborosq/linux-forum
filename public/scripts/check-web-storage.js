function checkWebStorage()
{
    if (window.localStorage.getItem("login") != null)
    {
        let login = document.getElementById("rform__input_login")
        login.value = window.localStorage.getItem("login")
    }
    if (window.localStorage.getItem("email") != null)
    {
        let email = document.getElementById("rform__input_email")
        email.value = window.localStorage.getItem("email")
    }
    if (window.localStorage.getItem("country") != null)
    {
        let country = document.getElementById("rform__input_country")
        country.value = window.localStorage.getItem("country")
    }
}