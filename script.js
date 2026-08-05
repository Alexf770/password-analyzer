// =========================
// HTML ELEMENTS
// =========================

// Password input
const passwordInput = document.getElementById("passwordInput");

// Password Length
const passwordLength = document.getElementById("passwordLength");
const lengthValue = document.getElementById("lengthValue");

// Generate Secure Password
const generatePassword = document.getElementById("generatePassword");

// Show / Hide button
const togglePassword = document.getElementById("togglePassword");

// Strength bar
const strengthFill = document.getElementById("strengthFill");

// Overall strength text
const strengthText = document.getElementById("strengthText");

// Entropy Calculator
const entropyText = document.getElementById("entropyText");

// Entropy Interpretation
const entropyLevel = document.getElementById("entropyLevel");

// Password Crack Time
const crackTime = document.getElementById("crackTime");

// Checklist items
const lengthCheck = document.getElementById("lengthCheck");
const uppercaseCheck = document.getElementById("uppercaseCheck");
const lowercaseCheck = document.getElementById("lowercaseCheck");
const numberCheck = document.getElementById("numberCheck");
const specialCheck = document.getElementById("specialCheck");

// Suggestions
const suggestionsText = document.getElementById("suggestionsText");

// Common passwords
const commonPasswords = [
    "password",
    "123456",
    "qwerty",
    "admin",
    "letmein",
    "welcome"
];

// Character sets for password generation
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const specialCharacters = "!@#$%^&*()-_=+[]{};:,.<>?";

const allCharacters =
    uppercaseLetters +
    lowercaseLetters + 
    numbers +
    specialCharacters;


// =========================
// EVENT LISTENERS
// =========================

// Analyze while typing
passwordInput.addEventListener("input", updateAnalysis);

// Show / Hide password
togglePassword.addEventListener("click", togglePasswordVisibility);

// Password Length
passwordLength.addEventListener("input", updatePasswordLength);

// Password generator
generatePassword.addEventListener("click", generateSecurePassword);


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
// UPDATE PASSWORD LENGTH
// =========================

function updatePasswordLength() {

    lengthValue.textContent = passwordLength.value;
}

// =========================
// GENERATE SECURE PASSWORD
// =========================

function generateSecurePassword() {

    let generatedPassword = [];
    const desiredLength = Number(passwordLength.value);

    generatedPassword.push(getRandomCharacter(uppercaseLetters));
    generatedPassword.push(getRandomCharacter(lowercaseLetters));
    generatedPassword.push(getRandomCharacter(numbers));
    generatedPassword.push(getRandomCharacter(specialCharacters));

    while (generatedPassword.length < desiredLength) {
        generatedPassword.push(getRandomCharacter(allCharacters));
    }

    // Shuffle the password characters
    for (let i = generatedPassword.length - 1; i > 0; i--) {

        const randomIndex = Math.floor(Math.random() * (i + 1));
        const temp = generatedPassword[i];
        generatedPassword[i] = generatedPassword[randomIndex];
        generatedPassword[randomIndex] = temp;
    }

    generatedPassword = generatedPassword.join("");
    passwordInput.value = generatedPassword;
    updateAnalysis();
}

// =========================
// GET RANDOM CHARACTER
// =========================

function getRandomCharacter(characters) {

    const randomIndex = Math.floor(Math.random() * characters.length);

    return characters[randomIndex];

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
// CHECK COMMON PASSWORDS
// =========================

function checkCommonPassword(password) {
    const lowerPassword = password.toLowerCase();

    return commonPasswords.some(common =>
        lowerPassword.includes(common)
    );
}

// =========================
// CALCULATE PASSWORD ENTROPY
// =========================

function calculateEntropy(password) {

    if (password.length === 0) {
        return 0;
    }

    let poolSize = 0;

    // Check for lowercase letters
    if (/[a-z]/.test(password)) {

        poolSize += 26;

    }

    // Check for uppercase letters
    if (/[A-Z]/.test(password)) {

        poolSize += 26;

    }

    // Check for numbers
    if (/[0-9]/.test(password)) {

        poolSize += 10;

    }

    // Check for special characters
    if (/[^A-Za-z0-9]/.test(password)) {

        poolSize += 32;

    }

    // Calculate entropy
    const entropy = password.length * Math.log2(poolSize);

    return Math.round(entropy);

}

// =========================
// GET ENTROPY SECURITY LEVEL
// =========================

function getEntropyLevel(entropy) {

    if (entropy < 30) {

        return "Very Weak";

    }

    else if (entropy < 50) {

        return "Weak";

    }

    else if (entropy < 70) {

        return "Strong";

    }

    else {

        return "Very Strong";

    }

}

// =========================
// ESTIMATE CRACK TIME
// =========================

function estimateCrackTime(entropy) {

    if (entropy < 30) {

        return "Instantly";

    }

    else if (entropy < 50) {

        return "A few minutes";

    }

    else if (entropy < 70) {

        return "Several years";

    }

    else if (entropy < 90) {

        return "Centuries";

    }

    else {

        return "Practically impossible with today's technology";

    }

}

// =========================
// UPDATE PASSWORD ANALYSIS
// =========================

function updateAnalysis() {

    // Get the password entered by the user
    const password = passwordInput.value;

    // Reset display if password is empty
    if (password.length === 0) {
        strengthText.textContent = "";
        strengthFill.style.width = "0%";
        suggestionsText.textContent = "";
        entropyText.textContent = "";
        entropyLevel.textContent = "";
        crackTime.textContent = "";

        return;
    }

    // Run every security check
    const hasLength = checkLength(password);
    const hasUppercase = checkUppercase(password);
    const hasLowercase = checkLowercase(password);
    const hasNumber = checkNumber(password);
    const hasSpecial = checkSpecialCharacter(password);
    const hasCommonPassword = checkCommonPassword(password);

    // Calculate password entropy
    const entropy = calculateEntropy(password);

    // Display entropy only when password exists
    if (password.length === 0) {
        entropyText.textContent = "";
    }

    else {
        entropyText.textContent = `Password Entropy: ${entropy} bits`;
        entropyLevel.textContent = ` 🔒 Security Level: ${getEntropyLevel(entropy)}`;
        crackTime.textContent = ` ⏱️ Estimated Crack Time: ${estimateCrackTime(entropy)}`;
    }

    // Store password improvement suggestions
    const suggestions = [];

    // Check if password needs more characters
    if (!hasLength) {
        suggestions.push("Add at least 8 characters");
    }

    if (!hasUppercase) {
        suggestions.push("Add an uppercase letter");
    }

    if (!hasLowercase) {
        suggestions.push("Add a lowercase letter");
    }

    if (!hasNumber) {
        suggestions.push("Add a number");
    }

    if (!hasSpecial) {
        suggestions.push("Add a special character");
    }

    // Check for common passwords
    if (hasCommonPassword) {
        suggestions.push("Avoid using common passwords");
    }

    // Display suggestions
    if (suggestions.length === 0) {
        suggestionsText.textContent = "Your password meets all requirements!";
    }

    else {
        suggestionsText.innerHTML = suggestions
            .map(suggestion => `• ${suggestion}`)
            .join("<br>");
    }

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

