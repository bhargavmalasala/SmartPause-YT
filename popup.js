const toggle = document.getElementById("toggle");

chrome.storage.sync.get(["autopauseEnabled"], (data) => {
  toggle.checked = data.autopauseEnabled ?? true;
});

toggle.addEventListener("change", () => {
  chrome.storage.sync.set({ autopauseEnabled: toggle.checked });
});
