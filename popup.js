// Store the toggle state in local storage
function saveToggleState(value) {
  chrome.storage.local.set({ enabled: value });
}

// Perform the script injection when the checkbox is toggled
function onToggle() {
  const checkbox = document.getElementById('toggleCheckbox');
  const enabled = checkbox.checked;
  saveToggleState(enabled);

  // Get the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const activeTabId = tabs[0].id;

    chrome.scripting.executeScript({
      target: { tabId: activeTabId },
      files: ['content.js'],
    });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const checkbox = document.getElementById('toggleCheckbox');

  // Load the toggle state from local storage
  chrome.storage.local.get("enabled", function (data) {
    checkbox.checked = data.enabled !== false;
  });

  checkbox.addEventListener('change', onToggle);
});
