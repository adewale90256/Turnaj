// navbar.js
document.addEventListener("DOMContentLoaded", () => {
  fetch("navbar.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("navbar").innerHTML = data;
      if (window.lucide) lucide.createIcons(); // re-render icons safely
    })
    .catch((err) => console.error("Failed to load navbar:", err));
});
