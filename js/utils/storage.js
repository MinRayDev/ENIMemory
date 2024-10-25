/**
 * Retrieves a value from local storage with an optional parser.
 *
 * @param {string} key - The storage key.
 * @param {function} [customLoader] - Optional parsing function.
 * @returns {any} - The parsed value if `customLoader` is used, or the raw stored string if not.
 *
 * @example
 * // Retrieves the value associated with "myKey" and parses it as JSON
 * getLocalStorage("myKey", JSON.parse);
 */
function getLocalStorage(key, customLoader) {
    const value = localStorage.getItem(key);
    if (customLoader) {
        try {
            return customLoader(value);
        } catch (err) {
            console.error(`Could not parse value for key: ${key}. Returning as string.`, err);
        }
    }
    return value;
}

/**
 * Saves a value to local storage with an optional formatter.
 *
 * @param {string} key - The storage key under which to save the value.
 * @param {any} value - The value to be stored.
 * @param {function} [customSaver] - Optional function to format the value before saving.
 *
 * @example
 * // Saves the value "hello" to local storage with key "myKey" and custom formatter
 * setLocalStorage("myKey", "hello", (value) => value.toUpperCase()); // Saves "HELLO"
 *
 */
function setLocalStorage(key, value, customSaver) {
    try {
        const toSave = customSaver ? customSaver(value) : value;
        localStorage.setItem(key, toSave);
    } catch (err) {
        console.error(`Error saving value to local storage for key: ${key}`, err);
    }
}

export {
    getLocalStorage,
    setLocalStorage
}
