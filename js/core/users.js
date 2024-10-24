import {getLocalStorage, setLocalStorage} from "../utils/storage.js";


const createId = (name) => btoa(`${name}-${Date.now()}`);

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

function getUserById(id) {
    let localUsers = getLocalStorage("users", JSON.parse);
    if(localUsers == null) localUsers = {}
    return id ? parseUser(localUsers[id]) : null;
}

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