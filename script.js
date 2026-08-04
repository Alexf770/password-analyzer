// =========================
// HTML ELEMENTS
// =========================

// Password input
const passwordInput = document.getElementById("passwordInput");

// Show / Hide button
const togglePassword = document.getElementById("togglePassword");

// Strength bar
const strengthFill = document.getElementById("strengthFill");

// Overall strength text
const strengthText = document.getElementById("strengthText");

// Checklist items
const lengthCheck = document.getElementById("lengthCheck");
const uppercaseCheck = document.getElementById("uppercaseCheck");
const lowercaseCheck = document.getElementById("lowercaseCheck");
const numberCheck = document.getElementById("numberCheck");
const specialCheck = document.getElementById("specialCheck");

// Suggestions
const suggestionsText = document.getElementById("suggestionsText");


// =========================
// EVENT LISTENERS
// =========================

// Analyze while typing
passwordInput.addEventListener("input", updateAnalysis);

// Show / Hide password
togglePassword.addEventListener("click", togglePasswordVisibility);


// =========================
// TOGGLE PASSWORD VISIBILITY
// =========================

function togglePasswordVisibility() {

    // If the password is currently hidden...
    if (passwordInput.type === "password") {

        // Show the password
        passwordInput.type = "text";

        // Update the button text
        togglePassword.textContent = "Hide";
    }

    // Otherwise, hide the password
    else {

        passwordInput.type = "password";

        togglePassword.textContent = "Show";
    }

}

// =========================
// CHECK PASSWORD LENGTH
// =========================

function checkLength(password) {

    // Return true if the password has at least 8 characters
    return password.length >= 8;
}

// =========================
// CHECK FOR UPPERCASE LETTER
// =========================

function checkUppercase(password) {

    // Returns true if the password contains at least one uppercase letter
    return /[A-Z]/.test(password);
}

// =========================
// CHECK FOR LOWERCASE LETTER
// =========================

function checkLowercase(password) {

    // Returns true if the password contains at least one lowercase letter
    return /[a-z]/.test(password);
}

// =========================
// CHECK FOR NUMBER
// =========================

function checkNumber(password) {

    // Returns true if the password contains at least one number
    return /[0-9]/.test(password);
}

// =========================
// CHECK FOR SPECIAL CHARACTER
// =========================

function checkSpecialCharacter(password) {

    // Returns true if the password contains at least one special character
    return /[^A-Za-z0-9]/.test(password);
}

// =========================
// UPDATE PASSWORD ANALYSIS
// =========================

function updateAnalysis() {

    // Get the password entered by the user
    const password = passwordInput.value;

    // Run every security check
    const hasLength = checkLength(password);
    const hasUppercase = checkUppercase(password);
    const hasLowercase = checkLowercase(password);
    const hasNumber = checkNumber(password);
    const hasSpecial = checkSpecialCharacter(password);

    // Calculate password strength score (0-5)
    const score = 
        (hasLength ? 1 : 0) +
        (hasUppercase ? 1 : 0) +
        (hasLowercase ? 1 : 0) +
        (hasNumber ? 1 : 0) +
        (hasSpecial ? 1 : 0);

    const strengthPercentage = (score / 5) * 100;
    strengthFill.style.width = strengthPercentage + "%";

    // Update strength rating and bar color
    if (score <= 1) {
        strengthText.textContent = "Weak";
        strengthFill.style.backgroundColor = "red";
    }

    else if (score <= 3) {
        strengthText.textContent = "Medium";
        strengthFill.style.backgroundColor = "orange";
    }

    else if (score === 4) {
        strengthText.textContent = "Strong";
        strengthFill.style.backgroundColor = "green";
    }

    else {
        strengthText.textContent = "Excellent";
        strengthFill.style.backgroundColor = "blue";
    }


    // Update the checklist
    lengthCheck.textContent = hasLength 
        ? "✔ At least 8 characters"
        : "✖ At least 8 characters";

    uppercaseCheck.textContent = hasUppercase
        ? "✔ Contains an uppercase letter"
        : "✖ Contains an uppercase letter";

    lowercaseCheck.textContent = hasLowercase
        ? "✔ Contains a lowercase letter"
        : "✖ Contains a lowercase letter";

    numberCheck.textContent = hasNumber
        ? "✔ Contains a number"
        : "✖ Contains a number";

    specialCheck.textContent = hasSpecial
        ? "✔ Contains a special character"
        : "✖ Contains a special character";
}

