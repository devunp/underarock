window.addEventListener("DOMContentLoaded", () => {
  const pageName = window.location.pathname.split("/").pop() || "index.html";
  console.log(`Loaded ${pageName}`);
});
