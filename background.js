let timerInterval = 20;
let intervalId;


chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ timerInterval });
  startTimer(timerInterval);
});


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
  }, interval * 60000);
}


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "setTimer") {
    timerInterval = request.timerInterval;
    chrome.storage.sync.set({ timerInterval });
    clearInterval(intervalId);
    startTimer(timerInterval);
  }
});


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "restartTimer") {
    clearInterval(intervalId);
    startTimer(timerInterval);
  }
});
