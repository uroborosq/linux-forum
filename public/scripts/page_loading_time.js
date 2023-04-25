(function ()
{
	let start = new Date().getTime();

	function calculateLoadTime()
	{
		let current = new Date().getTime();
		let loadTime = (current - start);
		let statsObject = document.getElementById('interestingstats');
		statsObject.innerText += ` + ${loadTime}ms (клиент)`;
	}

	window.addEventListener('DOMContentLoaded', _ => {calculateLoadTime();});
})()