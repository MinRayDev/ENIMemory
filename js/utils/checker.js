const specialCharacters = /[!@#$%^&*()_+[\]{}|;:'",.<>?/]/
const numberPattern = /^.*\d+.*$/


/**
 * Check if a username is valid. (3 to 50 characters, alphanumeric)
 *
 * @param {string} username - The username to check.
 * @returns {string | undefined} An error message if the username is invalid, undefined otherwise.
 *
 * @example
 * // Valid usernames
 * checkUsername("user123"); // undefined
 * checkUsername("JohnDoe");  // undefined
 *
 * // Invalid usernames
 * checkUsername("ab");       // "Le nom d'utilisateur doit faire au moins 3 caractères."
 * checkUsername("abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz"); // "Le nom d'utilisateur ne doit pas dépasser 50 caractères."
 * checkUsername("user!@#");  // "Le nom d'utilisateur ne doit contenir que des lettres ou des chiffres."
 */
function checkUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9]{3,50}$/;
    if (username.length < 3) {
        return "Le nom d'utilisateur doit faire au moins 3 caractères.";
    }
    if (username.length > 50) {
        return "Le nom d'utilisateur ne doit pas dépasser 50 caractères.";
    }
    if (!usernameRegex.test(username)) {
        return "Le nom d'utilisateur ne doit contenir que des lettres ou des chiffres.";
    }
    return undefined;
}


/**
 * Check if an email is valid.
 *
 * @param {string} email - The email to check.
 * @returns {string | undefined} An error message if the email is invalid, undefined otherwise.
 */
function checkEmail(email) {
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
    return emailRegex.test(email) ? undefined : "L'adresse email n'est pas valide.";
}


/**
 * Check if a password is valid. (6 to 100 characters, with at least one number, one special character, and one letter)
 *
 * @param {string} password - The password to check.
 * @returns {string | undefined} An error message if the password is invalid, undefined otherwise.
 *
 * @example
 * // Valid passwords
 * checkPassword("SuperP@ssw0rd"); // undefined
 * checkPassword("123456!a"); // undefined

 * // Invalid passwords
 * checkPassword("12345"); // "Le mot de passe doit faire entre 6 et 100 caractères."
 * checkPassword("abcde"); // "Le mot de passe doit contenir au moins 1 chiffre."
 * checkPassword("abcdef!"); // "Le mot de passe doit contenir au moins 1 chiffre."
 * checkPassword("1a"); // "Le mot de passe doit faire entre 6 et 100 caractères."
 * checkPassword("Pass1"); // "Le mot de passe doit faire entre 6 et 100 caractères."
 * checkPassword("abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz123!"); // "Le mot de passe doit faire entre 6 et 100 caractères."
 */
function checkPassword(password) {
    if (password.length < 6 || password.length > 100) {
        return "Le mot de passe doit faire entre 6 et 100 caractères.";
    }

    if (!/[a-zA-Z]/.test(password)) {
        return "Le mot de passe doit contenir au moins 1 lettre.";
    }

    if (!numberPattern.test(password)) {
        return "Le mot de passe doit contenir au moins 1 chiffre.";
    }

    if (!specialCharacters.test(password)) {
        return "Le mot de passe doit contenir au moins un caractère spécial.";
    }

    return undefined;
}



/**
 * Check if a password is valid and if the confirmation password is the same.
 * @param {string} password - The password to check.
 * @param {string} passwordConfirmation - The confirmation password.
 * @return {string | undefined} - An error message if the password is invalid or if both passwords don't match, undefined otherwise.
 *
 * @example
 * // Valid case
 * checkPasswords("123456!a", "123456!a"); // undefined
 *
 * // Invalid cases
 * checkPasswords("123456!a", "123456a!"); // "Les mots de passe ne correspondent pas."
 * checkPasswords("abcedf", "abcedf"); // "Le mot de passe doit contenir au moins 1 chiffre."
 * checkPasswords("ab1!", "ab1!"); // "Le mot de passe doit faire au moins 6 caractères."
 */
function checkPasswords(password, passwordConfirmation) {
    if (password !== passwordConfirmation) {
        return "Les mots de passe ne correspondent pas.";
    }
    return checkPassword(password);
}


function getPasswordScore(password) {
    const hasNumber = numberPattern.test(password);
    const hasSpecialChar = specialCharacters.test(password);
    if(password.length > 9 && (hasNumber && hasSpecialChar)) {
        return 3;
    }
    if(password.length > 6 && (hasNumber || hasSpecialChar)) {
        return 2;
    }
    return 1;
}


function checkRegister() {
    const inputs = {
        username: document.getElementById("username"),
        email: document.getElementById("email"),
        password: document.getElementById("password"),
        confirmPassword: document.getElementById("confirm-password"),
    };

    const values = {};
    for (const key in inputs) {
        values[key] = inputs[key].value.trim();
    }

    const { username, email, password, confirmPassword } = values;

    const response = checkPasswords(password, confirmPassword);
    if (response) return response;

    const validators = {
        username: checkUsername,
        email: checkEmail,
        password: checkPassword,
    };

    for (const key in validators) {
        const response = validators[key](values[key]);
        if (response) return response;
    }

    return {
        username,
        email,
        passwords: password,
    };
}



export {
    checkUsername,
    checkEmail,
    checkPassword,
    checkPasswords,
    getPasswordScore,
    checkRegister
}