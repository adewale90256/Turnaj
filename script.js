document.addEventListener("DOMContentLoaded", () => {
  // ✅ Load Navbar dynamically
  fetch("navbar.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("navbar").innerHTML = data;
      if (window.lucide) lucide.createIcons();

      // ✅ Attach Sidebar Toggle AFTER navbar loads
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
      }

      // ✅ Attach Dropdown Logic AFTER navbar loads
      const blogsMenu = document.getElementById("blogsMenu");
      const blogsDropdown = document.getElementById("blogsDropdown");
      const blogSubmenuBtn = document.getElementById("blogSubmenuBtn");
      const blogSubmenu = document.getElementById("blogSubmenu");

      let dropdownTimeout, submenuTimeout;

      function showDropdown() {
        clearTimeout(dropdownTimeout);
        blogsDropdown.classList.remove("hidden");
        setTimeout(
          () => blogsDropdown.classList.remove("opacity-0", "translate-y-2"),
          10
        );
      }

      function hideDropdown() {
        dropdownTimeout = setTimeout(() => {
          blogsDropdown.classList.add("opacity-0", "translate-y-2");
          setTimeout(() => blogsDropdown.classList.add("hidden"), 200);
        }, 150);
      }

      function showSubmenu() {
        clearTimeout(submenuTimeout);
        blogSubmenu.classList.remove("hidden");
        setTimeout(
          () => blogSubmenu.classList.remove("opacity-0", "translate-x-2"),
          10
        );
      }

      function hideSubmenu() {
        submenuTimeout = setTimeout(() => {
          blogSubmenu.classList.add("opacity-0", "translate-x-2");
          setTimeout(() => blogSubmenu.classList.add("hidden"), 200);
        }, 150);
      }

      if (blogsMenu && blogsDropdown) {
        blogsMenu.addEventListener("mouseenter", showDropdown);
        blogsMenu.addEventListener("mouseleave", hideDropdown);
        blogsDropdown.addEventListener("mouseenter", showDropdown);
        blogsDropdown.addEventListener("mouseleave", hideDropdown);
      }

      if (blogSubmenuBtn && blogSubmenu) {
        blogSubmenuBtn.addEventListener("mouseenter", showSubmenu);
        blogSubmenuBtn.addEventListener("mouseleave", hideSubmenu);
        blogSubmenu.addEventListener("mouseenter", showSubmenu);
        blogSubmenu.addEventListener("mouseleave", hideSubmenu);
      }

      // ✅ Show Username & Email if available
      const displayUsername = document.getElementById("displayUsername");
      const displayEmail = document.getElementById("displayEmail");
      const logoutBtn = document.getElementById("logoutBtn");

      const userData = JSON.parse(localStorage.getItem("userData"));

      if (userData && displayUsername && displayEmail) {
        displayUsername.textContent = userData.username;
        displayEmail.textContent = userData.email;
      }

      if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
          localStorage.removeItem("userData");
          window.location.href = "login.html";
        });
      }
    })
    .catch((err) => console.error("Failed to load navbar:", err));

  // ✅ Hero Section Background Slider (works even if navbar fails to load)
  const hero = document.getElementById("hero");
  if (hero) {
    const images = [
      "./images/bg-1.jpg",
      "./images/chealsea.jpg",
      "./images/bacca.jpeg",
      "./images/haaland.jpg",
      "./images/man-u.jpg",
      "./images/messi.avif",
      "./images/as-player.webp",
      "./images/ronaldo.webp",
      "./images/arsenal.jpg",
    ];
    let index = 0;
    setInterval(() => {
      index = (index + 1) % images.length;
      hero.style.backgroundImage = `url(${images[index]})`;
    }, 5000);
  }

  // ✅ Always set background colors (no scroll logic)
  const topNav = document.getElementById("topNav");
  const mainNav = document.getElementById("mainNav");

  if (topNav) {
    topNav.classList.remove("bg-transparent");
    topNav.classList.add("bg-purple-700");
  }

  if (mainNav) {
    mainNav.classList.remove("bg-transparent");
    mainNav.classList.add("bg-blue-600");
  }
});

// ✅ Function for Mobile Sidebar Submenus (still works globally)
function toggleSubmenu(id) {
  const submenu = document.getElementById(id);
  if (submenu) submenu.classList.toggle("hidden");
}
