import {getLocalStorage, setLocalStorage} from "../utils/storage.js";


const createId = (name) => btoa(`${name}-${Date.now()}`);


/**
 * Parse a user object from a JSON object.
 * @param {Object} jsonObject - The JSON object to parse.
 * @returns {{set: string, size: null, name: string, id: string, history: ([]|Array), email: (string)}}
 */
function parseUser(jsonObject) {
    return {
        id: jsonObject.id,
        name: jsonObject.name,
        email: jsonObject.email,
        set: jsonObject.set ?? "vegetables",
        size: jsonObject.size ?? null,
        history: jsonObject.history ?? []
    }
}

/**
 * @param {string} id - The user ID to retrieve.
 * @returns {{set: string, size: null, name: string, id: string, history: ([]|Array), email: (string)}}
 */
function getUserById(id) {
    let localUsers = getLocalStorage("users", JSON.parse);
    if(localUsers == null) localUsers = {}
    return id ? parseUser(localUsers[id]) : null;
}

/**
 * @param {string} name - The username to add.
 * @param {string} email - The user email to add.
 * @param {string} password - The user password to add.
 * @returns {string|null} - Returns an error message if the user already exists, or `null` if the user was successfully added.
 */
function addUser(name, email, password) {
    let localUsers = getLocalStorage("users", JSON.parse);
    if(localUsers == null) {
        localUsers = {}
    }
    let response;
    Object.keys(localUsers).forEach((key) => {
        if(localUsers[key].name === name) {
            response = "Ce nom est déjà utilisé."
        }
        if(localUsers[key].email === email) {
            response = "Cette adresse email est déjà utilisée."
        }
    });
    if (response) { return response; }
    const user = {
        id: createId(name),
        name: name,
        email: email,
        set: "vegetables",
        size: null,
        history: []
    }
    user["password"] = password;
    localUsers[user.id] = user;
    setLocalStorage("users", localUsers, JSON.stringify);
    return response;
}


/**
 * @param {string} userId - The user ID to edit.
 * @param {string} key - The key to edit.
 * @param {any} value - The value to edit.
 * @returns {boolean} - Returns `true` if the user was successfully edited, otherwise returns `false`.
 */
function editUser(userId, key, value) {
    let localUsers = getLocalStorage("users", JSON.parse);
    // From Sonar
    if (!localUsers?.[userId]) {
        return false;
    }
    const userJson = localUsers[userId];
    userJson[key] = value
    localUsers[userId] = userJson;
    setLocalStorage("users", localUsers, JSON.stringify);
    return true;
}

/**
 *
 * @param {string} email - The user email to use for the login.
 * @param {string} password - The user password to use for the login.
 * @returns {Object|null} - Returns the user object if the login is successful, otherwise returns `null`.
 */
function login(email, password) {
    let localUsers = getLocalStorage("users", JSON.parse);
    if(localUsers == null) {
        localUsers = {}
    }
    let user;
    Object.keys(localUsers).forEach((key) => {
        const localUser = localUsers[key];
        if(localUser.email === email) {
            if(localUser.password === password) {
                user = parseUser(localUser);
            }
        }
    });
    return user;
}


export {
    createId,
    getUserById,
    addUser,
    editUser,
    login
}