import {getLocalStorage} from "../utils/storage.js";

/**
 * Get the user ID (token) from the session storage.
 *
 * @returns {string|null} - The user ID (token) if exists, otherwise null.
 */
const getId = () => sessionStorage.getItem("token");

/**
 * Checks if the user is connected. (Checks if the user ID token exists in local storage.)
 *
 * @returns {boolean} - Returns true if the user is connected, otherwise false.
 */
function isConnected() {
    // I'm using user id as token because we are storing user in browser anyway lmao
    const token = getId();
    if (!token) return false;

    const localUsers = getLocalStorage("users", JSON.parse) ?? {};
    return token in localUsers;
}

/**
 * Saves a token to session storage.
 *
 * @param {string} token - The token (user ID) to save in the session storage.
 */
const saveToken = (token) => sessionStorage.setItem("token", token);


/**
 * Removes the token from the session storage.
 */
const disconnect = () => sessionStorage.removeItem("token");

export {
    getId,
    isConnected,
    saveToken,
    disconnect
}