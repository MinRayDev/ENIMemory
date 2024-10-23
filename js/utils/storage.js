function getLocalStorage(key, customLoader) {
    const value = localStorage.getItem(key);
    if (value === null) {
        console.log(`No value found for key: ${key}`);
        return null;
    }
    if(customLoader == null) {
        return value;
    }
    try {
        return customLoader(value);
    } catch (err) {
        console.error(`Could not parse value for key: ${key}. Returning as string.`);
        return value;
    }
}

function setLocalStorage(key, value, customSaver) {
    if (customSaver == null) {
        localStorage.setItem(key, value);
    }
    try {
        localStorage.setItem(key, customSaver(value));
    } catch (err) {
        console.error(`Error saving value to local storage for key: ${key}`, err);
    }
}

export {
    getLocalStorage,
    setLocalStorage
}