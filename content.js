// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "blinkReminder") {
      showBlinkAlert();
    }
  });
  
  // Function to display the blink alert
  function showBlinkAlert() {
    alert('Blink!');
    chrome.runtime.sendMessage({ action: "restartTimer" });
  }
  