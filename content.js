let video = null;
let autopauseEnabled = true;

// current toggle state
chrome.storage.sync.get(["autopauseEnabled"], (data) => {
  autopauseEnabled = data.autopauseEnabled ?? true;
  init();
});

// setting changes in real time
chrome.storage.onChanged.addListener((changes) => {
  if (changes.autopauseEnabled) {
    autopauseEnabled = changes.autopauseEnabled.newValue;
  }
});

function init() {
  const findVideoInterval = setInterval(() => {
    const foundVideo = document.querySelector("video");
    if (foundVideo) {
      video = foundVideo;
      clearInterval(findVideoInterval);
      setupAutoPausePlay();
      observeVideoChanges();
    }
  }, 500);
}

function setupAutoPausePlay() {
  document.addEventListener("visibilitychange", () => {
    if (!video || !autopauseEnabled) return;

    if (document.visibilityState === "hidden") {
      if (!video.paused) video.pause();
    } else if (document.visibilityState === "visible") {
      if (video.paused) video.play().catch(() => {});
    }
  });
}

function observeVideoChanges() {
  const observer = new MutationObserver(() => {
    const newVideo = document.querySelector("video");
    if (newVideo && newVideo !== video) {
      video = newVideo;
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}
