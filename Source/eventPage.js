var tabLists = {};

function muteTab(tab) {
  if (typeof tabLists[tab.id] === "undefined") {
    chrome.tabs.update(tab.id, { muted: true });
  }
  else if (tabLists[tab.id] !== true) {
    chrome.tabs.update(tab.id, { muted: true });
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