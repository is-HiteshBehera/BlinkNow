chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "blinkReminder") {
      showBlinkAnimation();
    }
  });
  
  // Function to display the blink animation
  function showBlinkAnimation() {
    // overlay div
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.zIndex = 10000;
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.opacity = 0;
    overlay.style.transition = 'opacity 0.5s';
  
    // text div
    const text = document.createElement('div');
    text.style.color = 'white';
    text.style.fontSize = '2em';
    text.textContent = 'Blink!';
  
    
    overlay.appendChild(text);
    document.body.appendChild(overlay);
  
    
    setTimeout(() => {
      overlay.style.opacity = 1;
      setTimeout(() => {
        overlay.style.opacity = 0;
        setTimeout(() => {
          document.body.removeChild(overlay);
        }, 500);
      }, 1000);
    }, 100);
  }
  