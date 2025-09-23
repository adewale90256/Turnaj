import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
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

// 👁 Password Toggle
function setupPasswordToggle(inputId, buttonId) {
  const input = document.getElementById(inputId);
  const button = document.getElementById(buttonId);

  if (!input || !button) return;

  button.addEventListener("click", () => {
    const isPasswordHidden = input.type === "password";
    input.type = isPasswordHidden ? "text" : "password";

    button.innerHTML = `<i data-lucide="${
      isPasswordHidden ? "eye" : "eye-off"
    }"></i>`;
    lucide.createIcons();
  });
}

setupPasswordToggle("login-password", "toggleLoginPassword");
lucide.createIcons();

// 🔑 Login Logic
const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const identifier = document.getElementById("login-identifier").value.trim();
  const password = document.getElementById("login-password").value;

  if (!identifier || !password) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    const usersRef = collection(db, "users");
    const emailQuery = query(usersRef, where("email", "==", identifier));
    const usernameQuery = query(usersRef, where("username", "==", identifier));

    let userDoc = null;
    let docId = null;

    // Try to find user by email
    const emailSnapshot = await getDocs(emailQuery);
    if (!emailSnapshot.empty) {
      userDoc = emailSnapshot.docs[0];
      docId = userDoc.id;
    } else {
      // Try to find user by username
      const usernameSnapshot = await getDocs(usernameQuery);
      if (!usernameSnapshot.empty) {
        userDoc = usernameSnapshot.docs[0];
        docId = userDoc.id;
      }
    }

    if (!userDoc) {
      alert("User not found.");
      return;
    }

    const userData = userDoc.data();
    if (userData.password !== password) {
      alert("Incorrect password.");
      return;
    }

    // ✅ Store user info in localStorage
    localStorage.setItem(
      "userData",
      JSON.stringify({
        username: userData.username,
        email: userData.email,
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
      })
    );

    alert(`Welcome back, ${userData.firstName || userData.username}!`);
    window.location.href = "home.html";
  } catch (error) {
    console.error("Login error:", error);
    alert("Login failed. Please try again.");
  }
});

// 🔄 Forgot Password Logic
document
  .getElementById("forgot-password")
  .addEventListener("click", async () => {
    const emailOrUsername = prompt(
      "Enter your email or username to reset password:"
    );
    if (!emailOrUsername) return;

    try {
      const usersRef = collection(db, "users");
      const emailQuery = query(usersRef, where("email", "==", emailOrUsername));
      const usernameQuery = query(
        usersRef,
        where("username", "==", emailOrUsername)
      );

      let userDoc = null;
      let docId = null;

      const emailSnapshot = await getDocs(emailQuery);
      if (!emailSnapshot.empty) {
        userDoc = emailSnapshot.docs[0];
        docId = userDoc.id;
      } else {
        const usernameSnapshot = await getDocs(usernameQuery);
        if (!usernameSnapshot.empty) {
          userDoc = usernameSnapshot.docs[0];
          docId = userDoc.id;
        }
      }

      if (!userDoc) {
        alert("No account found with that email/username.");
        return;
      }

      const newPassword = prompt("Enter your new password:");
      if (!newPassword) return;

      // Update Firestore
      const userRef = doc(db, "users", docId);
      await updateDoc(userRef, { password: newPassword });

      alert(
        "Password updated successfully! You can now log in with your new password."
      );
    } catch (error) {
      console.error("Password reset error:", error);
      alert("Failed to reset password. Please try again.");
    }
  });
