function checkDOM() {
	window.addEventListener("dblclick", function () {
		chrome.runtime.sendMessage({ clicking: true });
	});
}


checkDOM();