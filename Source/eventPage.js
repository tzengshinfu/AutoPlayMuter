var tabLists = {};
var whiteLists = ["youtube.com", "netflix.com", "vimeo.com", "screen.yahoo.com", "dailymotion.com", "hulu.com", "vube.com", "twitch.tv", "liveleak.com", "vine.co", "ustream.tv", "break.com", "tv.com", "metacafe.com", "viewster.com", "vevo.com", "viacom.com", "video.aol.com"];

function muteTab(tab) {
  let isMuted = true;
  for (whiteList of whiteLists) {
    if (tab.url.includes(whiteList)) {
        return;
    }
  }    
    
  if (typeof tabLists[tab.id] === "undefined") {
    chrome.tabs.update(tab.id, { muted: isMuted });
  }
  else if (tabLists[tab.id] !== true) {
    chrome.tabs.update(tab.id, { muted: isMuted });
  }
  else {
    tabLists[tab.id] = false;
  }
}

chrome.tabs.onUpdated.addListener(
  function (tabId, changeInfo, tab) {
    muteTab(tab);
  }
);

chrome.tabs.onCreated.addListener(
  function (tab) {
    muteTab(tab);
  }
);

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.clicking === true) {
      tabLists[sender.tab.id] = true;
      chrome.tabs.update(sender.tab.id, { muted: false });
    }
  });