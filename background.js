let timerInterval = 20; // default


chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ timerInterval });
  createAlarm(timerInterval);
});


function createAlarm(interval) {
  chrome.alarms.create('blinkReminder', { periodInMinutes: interval });
}


chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'blinkReminder') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "blinkReminder" });
    });
  }
});


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "setTimer") {
    timerInterval = request.timerInterval;
    chrome.storage.sync.set({ timerInterval });
    chrome.alarms.clear('blinkReminder', () => {
      createAlarm(timerInterval);
    });
  }
});
