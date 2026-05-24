const APK_URL = "app-release.apk";
const fileSizeEl = document.getElementById("fileSize");
const btn = document.getElementById("downloadBtn");
const btnText = btn.querySelector("span");

function formatBytes(bytes) {
  if (!bytes && bytes !== 0) return "Unknown";
  const units = ["B", "KB", "MB", "GB"];
  let i = 0;
  let size = bytes;
  while (size >= 1024 && i < units.length - 1) {
    size /= 1024;
    i++;
  }
  return size.toFixed(2) + " " + units[i];
}

fetch(APK_URL, { method: "HEAD" })
  .then((res) => {
    const len = res.headers.get("Content-Length");
    fileSizeEl.textContent = len ? formatBytes(parseInt(len, 10)) : "Unknown";
  })
  .catch(() => {
    fileSizeEl.textContent = "Unknown";
  });

btn.addEventListener("click", () => {
  btn.classList.add("downloading");
  const original = btnText.textContent;
  btnText.textContent = "Downloading...";
  setTimeout(() => {
    btnText.textContent = "Download Started!";
    setTimeout(() => {
      btnText.textContent = original;
      btn.classList.remove("downloading");
    }, 1800);
  }, 600);
});
