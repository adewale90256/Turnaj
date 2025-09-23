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

setupPasswordToggle("reset-password", "toggleResetPassword");
setupPasswordToggle("reset-confirm-password", "toggleResetConfirmPassword");

const resetForm = document.getElementById("reset-form");
resetForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const identifier = document.getElementById("reset-identifier").value.trim();
  const newPassword = document.getElementById("reset-password").value;
  const confirmPassword = document.getElementById(
    "reset-confirm-password"
  ).value;

  if (!identifier || !newPassword || !confirmPassword) {
    alert("Please fill in all fields.");
    return;
  }

  if (newPassword !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    const usersRef = collection(db, "users");
    const emailQuery = query(usersRef, where("email", "==", identifier));
    const usernameQuery = query(usersRef, where("username", "==", identifier));

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

    // Update password
    const userRef = doc(db, "users", docId);
    await updateDoc(userRef, { password: newPassword });

    alert("Password updated successfully! You can now log in.");
    window.location.href = "login.html";
  } catch (error) {
    console.error("Password reset error:", error);
    alert("Failed to reset password. Please try again.");
  }
});
