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
