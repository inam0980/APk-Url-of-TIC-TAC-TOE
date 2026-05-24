const APK_URL = "app-release.apk";
const fileSizeEl = document.getElementById("fileSize");
const btn = document.getElementById("downloadBtn");
const btnText = btn.querySelector("span");

const cacheBuster = "v=" + Date.now();
const APK_URL_FRESH = APK_URL + "?" + cacheBuster;
btn.href = APK_URL_FRESH;

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

async function loadFileSize() {
  try {
    const headRes = await fetch(APK_URL_FRESH, { method: "HEAD", cache: "no-store" });
    const len = headRes.headers.get("Content-Length");
    if (len && parseInt(len, 10) > 0) {
      fileSizeEl.textContent = formatBytes(parseInt(len, 10));
      return;
    }
  } catch (e) {}

  try {
    const getRes = await fetch(APK_URL_FRESH, { cache: "no-store" });
    const len = getRes.headers.get("Content-Length");
    if (len && parseInt(len, 10) > 0) {
      fileSizeEl.textContent = formatBytes(parseInt(len, 10));
      return;
    }
    const blob = await getRes.blob();
    fileSizeEl.textContent = blob.size ? formatBytes(blob.size) : "Unknown";
  } catch (e) {
    fileSizeEl.textContent = "Unknown";
  }
}

loadFileSize();

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
