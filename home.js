document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const menuBtn = document.getElementById("menuBtn");
  const closeSidebar = document.getElementById("closeSidebar");

  if (menuBtn && sidebar) {
    menuBtn.addEventListener("click", () => {
      sidebar.classList.remove("-translate-x-full");
    });
  }

  if (closeSidebar && sidebar) {
    closeSidebar.addEventListener("click", () => {
      sidebar.classList.add("-translate-x-full");
    });

    const displayUsername = document.getElementById("displayUsername");
    const displayEmail = document.getElementById("displayEmail");

    const userData = JSON.parse(localStorage.getItem("userData"));

    if (userData && displayUsername && displayEmail) {
      displayUsername.textContent = userData.username;
      displayEmail.textContent = userData.email;
    }
  }

  // ✅ Logout
  const logoutBtns = document.querySelectorAll("#logoutBtn, #logoutBtnMobile");
  logoutBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      localStorage.removeItem("userData");
      window.location.href = "login.html";
    });
  });
});

function toggleSubmenu(id) {
  const submenu = document.getElementById(id);
  if (submenu) submenu.classList.toggle("hidden");
}
