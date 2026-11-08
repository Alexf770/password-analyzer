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

// Statistics
const lengthStat = document.getElementById("lengthStat");
const uniqueStat = document.getElementById("uniqueStat");
const repeatedStat = document.getElementById("repeatedStat");
const diversityStat = document.getElementById("diversityStat");
const uppercaseStat = document.getElementById("uppercaseStat");
const lowercaseStat = document.getElementById("lowercaseStat");
const numberStat = document.getElementById("numberStat");
const specialStat = document.getElementById("specialStat");

// Breach Check
const checkBreachButton = document.getElementById("checkBreach");
const breachText = document.getElementById("breachText");

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

// Check Password Breach
checkBreachButton.addEventListener("click", checkPasswordBreach);

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
// PASSWORD STATISTICS
// =========================

function updateStatistics(password) {

    const passwordLength = password.length;

    const uniqueCharacters = new Set(password).size;

    const repeatedCharacters = password.length - uniqueCharacters;

    const characterDiversity = password.length === 0
        ? 0
        : (uniqueCharacters / password.length) * 100;

    const uppercaseCount = (password.match(/[A-Z]/g) || []).length;

    const lowercaseCount = (password.match(/[a-z]/g) || []).length;

    const numberCount = (password.match(/[0-9]/g) || []).length;

    const specialCount = (password.match(/[^A-Za-z0-9]/g) || []).length;

    lengthStat.textContent = `Password Length: ${passwordLength}`;

    uniqueStat.textContent = `Unique Characters: ${uniqueCharacters}`;

    repeatedStat.textContent = `Repeated Characters: ${repeatedCharacters}`;

    diversityStat.textContent =
        `Character Diversity: ${characterDiversity.toFixed(1)}%`;

    uppercaseStat.textContent = `Uppercase Letters: ${uppercaseCount}`;

    lowercaseStat.textContent = `Lowercase Letters: ${lowercaseCount}`;

    numberStat.textContent = `Numbers: ${numberCount}`;

    specialStat.textContent = `Special Characters: ${specialCount}`;
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
// PASSWORD BREACH CHECK
// =========================

async function checkPasswordBreach() {

    // Prevent multiple simultaneous checks
    if (checkBreachButton.disabled) {
        return;
    }

    const password = passwordInput.value;

    // Make sure the user entered a password
    if (password.length === 0) {

        breachText.className = "breach-result error";

        breachText.textContent = "Please enter a password first.";

        return;
    }

    // Check whether the browser supports secure hashing
    if (!window.crypto || !window.crypto.subtle) {

        breachText.className = "breach-result error";

        breachText.textContent =
            "Your browser does not support secure password checking.";

        return;
    }

    try {

        // Update the interface
        checkBreachButton.disabled = true;
        checkBreachButton.textContent = "Checking...";

        breachText.className = "breach-result";

        breachText.textContent = "Checking password security...";

        // Convert password into a SHA-1 hash locally
        const encoder = new TextEncoder();
        const data = encoder.encode(password);

        const hashBuffer = await crypto.subtle.digest("SHA-1", data);

        // Convert hash into hexadecimal characters
        const hashArray = Array.from(new Uint8Array(hashBuffer));

        const hash = hashArray
            .map(byte => byte.toString(16).padStart(2, "0"))
            .join("")
            .toUpperCase();

        // Separate the first 5 characters from the remaining hash
        const prefix = hash.substring(0, 5);
        const suffix = hash.substring(5);

        // Request matching hash suffixes from the API
        const response = await fetch(
            `https://api.pwnedpasswords.com/range/${prefix}`,
            {
                headers: {
                    "Add-Padding": "true"
                }
            }
        );

        if (!response.ok) {
            throw new Error("Unable to contact the breach-checking service.");
        }

        const responseText = await response.text();

        // Search the returned results locally
        const matchingLine = responseText
            .split("\n")
            .find(line => line.split(":")[0].trim() === suffix);

        // Extract the number of known exposures
        const count = matchingLine
            ? Number(matchingLine.split(":")[1].trim())
            : 0;

        // Validate the API response count
        if (!Number.isSafeInteger(count) || count < 0) {
            throw new Error("Invalid breach-checking response.");
        }

        // Make sure the password hasn't changed during the request
        if (passwordInput.value !== password) {

            breachText.className = "breach-result error";

            breachText.textContent =
                "Password changed. Run the check again.";

            return;
        }

        // Display the result
        if (count > 0) {

            breachText.className = "breach-result warning";

            breachText.textContent =
                `Warning! This password has appeared in ${count.toLocaleString()} known exposures. Choose a different password.`;

        } else {

            breachText.className = "breach-result safe";

            breachText.textContent =
                "Good news! This password was not found in the known breach database.";

        }

    } catch (error) {

        console.error("Breach check error:", error);

        breachText.className = "breach-result error";

        breachText.textContent =
            "Unable to check this password. Please try again.";

    } finally {

        checkBreachButton.disabled = false;

        checkBreachButton.textContent = "Check for Breaches";

    }
}


// =========================
// UPDATE PASSWORD ANALYSIS
// =========================

function updateAnalysis() {

    // Get the password entered by the user
    const password = passwordInput.value;
    const uniqueCharacters = new Set(password).size;
    const repeatedCharacters = password.length - uniqueCharacters;
    const hasCommonPassword = checkCommonPassword(password);

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

    // Calculate password strength score 
    let score = 0;

    // Length
    if (password.length >= 8) {
        score += 20;
    }

    if (password.length >= 12) {
        score += 10;
    }

    if (password.length >= 16) {
        score += 10;
    }

    // Character types
    if (hasUppercase) {
        score += 10;
    }

    if (hasLowercase) {
        score += 10;
    }

    if (hasNumber) {
        score += 10;
    }

    if (hasSpecial) {
        score += 15;
    }

    // Character diversity
    if (password.length > 0) {

        const diversity = uniqueCharacters / password.length;

        if (diversity >= 0.75) {
            score += 15;
        } else if (diversity >= 0.5) {
            score += 8;
        }
    }

    // Penalties
    if (repeatedCharacters > 0) {
        score -= repeatedCharacters * 2;
    }

    if (hasCommonPassword) {
        score -= 25;
    }

    // Keep score between 0 and 100
    score = Math.max(0, Math.min(score, 100));

    const strengthPercentage = score;
    strengthFill.style.width = strengthPercentage + "%";

    // Update strength rating and bar color
    if (score < 30) {
        strengthText.textContent = "Weak";
        strengthFill.style.backgroundColor = "red";
    } else if (score < 50) {
        strengthText.textContent = "Medium";
        strengthFill.style.backgroundColor = "orange";
    } else if (score < 75) {
        strengthText.textContent = "Strong";
        strengthFill.style.backgroundColor = "green";
    } else {
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

    updateStatistics(password);
}

