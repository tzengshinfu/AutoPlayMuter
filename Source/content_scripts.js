function checkDOM() {
	window.addEventListener("click", function () {
		//triple clicks 
		if (event.detail === 3) {
			chrome.runtime.sendMessage({ clicking: true });
		}
	});
}


checkDOM();