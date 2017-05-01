var tabLists = {};
var whiteLists = ["youtube.com", "netflix.com", "vimeo.com", "screen.yahoo.com", "dailymotion.com", "hulu.com", "vube.com", "twitch.tv", "liveleak.com", "vine.co", "ustream.tv", "break.com", "tv.com", "metacafe.com", "viewster.com", "vevo.com", "viacom.com", "video.aol.com"];

function muteTab(tab) {
  //not blank page
  if (tab.url !== "chrome://newtab/") {
    for (whiteList of whiteLists) {
      if (tab.url.includes(whiteList)) {
        tabLists[tab.id] = true;
        chrome.tabs.update(tab.id, { muted: false });
        return;
      }
    }

    if (typeof tabLists[tab.id] === "undefined") {
      chrome.tabs.update(tab.id, { muted: true });
    }
    else if (tabLists[tab.id] !== true) {
      chrome.tabs.update(tab.id, { muted: true });
    }
  }
}

chrome.tabs.onUpdated.addListener(
  function (tabId, changeInfo, tab) {
    muteTab(tab)
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
      if (tabLists[sender.tab.id] === true) {
        tabLists[sender.tab.id] = false;
        chrome.tabs.update(sender.tab.id, { muted: true });
      }
      else {
        tabLists[sender.tab.id] = true;
        chrome.tabs.update(sender.tab.id, { muted: false });
      }
    }
  });