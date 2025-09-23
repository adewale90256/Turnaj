import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB7nqasWnBCFyUbG4Dd9chPLlwVsDaYQ18",
  authDomain: "turnaj-auth.firebaseapp.com",
  projectId: "turnaj-auth",
  storageBucket: "turnaj-auth.firebasestorage.app",
  messagingSenderId: "495243897521",
  appId: "1:495243897521:web:1fb5394f4058b13e2f5090",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const signupForm = document.getElementById("signup-form");

// auth.js
function setupPasswordToggle(inputId, buttonId) {
  const input = document.getElementById(inputId);
  const button = document.getElementById(buttonId);

  if (!input || !button) return;

  button.addEventListener("click", () => {
    const isPasswordHidden = input.type === "password";
    input.type = isPasswordHidden ? "text" : "password";

    // Remove old icon completely
    button.innerHTML = `<i data-lucide="${
      isPasswordHidden ? "eye" : "eye-off"
    }"></i>`;
    lucide.createIcons();
  });
}

// Apply to both password fields
setupPasswordToggle("password", "togglePassword");
setupPasswordToggle("confirmPassword", "toggleConfirmPassword");

// Render icons initially
lucide.createIcons();

// 📝 Form Submit
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userData = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
    confirmPassword: document.getElementById("confirmPassword").value,
    phone: document.getElementById("phone").value,
    gender: document.getElementById("gender").value,
    dob: document.getElementById("dob").value,
    createdAt: new Date().toISOString(),
  };

  if (userData.password !== userData.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    await addDoc(collection(db, "users"), userData);
    alert("Account created successfully!");

    signupForm.reset();

    // ✅ Redirect to login page after successful signup
    window.location.href = "login.html";
  } catch (error) {
    console.error("Error adding document: ", error);
    alert("Failed to create account. Please try again.");
  }
});
