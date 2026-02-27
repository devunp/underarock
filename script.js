window.addEventListener("DOMContentLoaded", () => {
  const key = "underarock-visitor-count";
  const current = Number(localStorage.getItem(key) || "0") + 1;
  localStorage.setItem(key, String(current));

  const countEl = document.getElementById("visitor-count");
  if (countEl) {
    countEl.textContent = String(current);
  }

  const updatedEl = document.getElementById("last-updated");
  if (updatedEl) {
    updatedEl.textContent = new Date().toLocaleDateString();
  }
});
