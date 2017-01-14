function checkDOM() {
	//for normal videos
	window.addEventListener("click", function () {
		chrome.runtime.sendMessage({ clicking: true });
	});

	//for iframe videos (Thanks to jaydson<https://gist.github.com/jaydson/1780598>)
	window.addEventListener("mouseover", function () {
		window.focus();
	});
	window.addEventListener("blur", function () {
		chrome.runtime.sendMessage({ clicking: true });
	});
}

checkDOM();