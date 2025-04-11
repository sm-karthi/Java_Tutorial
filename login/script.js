document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");
    const logoutBtn = document.getElementById("logoutBtn");

    // Signup Form Submission
    if (signupForm) {
        signupForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            try {
                const response = await fetch("http://localhost:8080/api/auth/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name, email, password }),
                });

                if (response.ok) {
                    alert("Signup successful! Please login.");
                    window.location.href = "login.html";
                } else {
                    alert("Signup failed. Please try again.");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("An error occurred.");
            }
        });
    }

    // Login Form Submission
    if (loginForm) {
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;

            try {
                const response = await fetch("http://localhost:8080/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                });

                const responseText = await response.text(); // Get raw response text
                console.log("Raw Response:", responseText);

                // Check if the response is valid JSON
                let data;
                try {
                    data = JSON.parse(responseText);
                } catch (error) {
                    console.error("Failed to parse JSON:", error);
                    alert("Invalid response from server.");
                    return;
                }

                if (response.ok) {
                    // Store user data in localStorage
                    const userName = data.name || "User"; // Fallback to "User" if name is not available
                    localStorage.setItem("userName", userName);
                    localStorage.setItem("userEmail", email);

                    alert("Login successful! Welcome " + userName);
                    window.location.href = "dashboard.html"; // Redirect to the dashboard
                } else {
                    alert("Login failed: " + (data.message || "Invalid credentials"));
                }
            } catch (error) {
                console.error("Error:", error);
                alert("An error occurred. Check the console for details.");
            }
        });
    }

   
});
