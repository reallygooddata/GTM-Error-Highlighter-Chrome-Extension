chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    // Check if the tab has finished loading
    if (changeInfo.status === 'complete' && !tab.url.startsWith('chrome://')) {
      // Get the saved toggle state from local storage
      chrome.storage.local.get("enabled", function (data) {
        const enabled = !!data.enabled;
        if (enabled) {
          // Inject the content script into the newly loaded tab
          chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: [chrome.runtime.getURL('content.js')],
          });
        }
      });
    }
  });