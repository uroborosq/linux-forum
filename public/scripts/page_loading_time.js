(function ()
{
    let start = new Date().getTime();

    function calculateLoadTime()
    {
        let current = new Date().getTime();
        let loadTime = (current - start) / 1000
        let statsObject = document.getElementById("interestingstats")
        statsObject.innerText = "Загрузка страницы заняла " + loadTime + "сек"
    }

    window.addEventListener("DOMContentLoaded", _ => {calculateLoadTime()})
 })()