chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "blinkReminder") {
      showBlinkAlert();
    }
  });
  
  function showBlinkAlert() {
    alert('Blink!');
    chrome.runtime.sendMessage({ action: "restartTimer" });
  }
  