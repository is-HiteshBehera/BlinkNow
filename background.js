let timerInterval = 0.1667; // 10 seconds in minutes for testing purposes
let intervalId;

// Set the initial timer interval when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ timerInterval });
  startTimer(timerInterval);
});

// Function to start the timer using setInterval
function startTimer(interval) {
  intervalId = setInterval(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "blinkReminder" })
          .catch((error) => {
            console.error("Error sending message to content script:", error);
          });
      }
    });
  }, interval * 60000); // Convert minutes to milliseconds
}

// Listen for messages from the popup script to update the timer interval
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "setTimer") {
    timerInterval = request.timerInterval;
    chrome.storage.sync.set({ timerInterval });
    clearInterval(intervalId);
    startTimer(timerInterval);
  }
});

// Function to restart the timer when the alert box is closed
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "restartTimer") {
    clearInterval(intervalId);
    startTimer(timerInterval);
  }
});
