import {getLocalStorage, setLocalStorage} from "../utils/storage.js";

class User {
    constructor(id, name, email, set = "vegetables") {
        this.id = id;
        this.name = name;
        this.email = email;
        this.set = set
    }

    toJson() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            set: this.set
        }
    }

    static parseUser(jsonObject) {
        return new User(jsonObject["id"], jsonObject["name"], jsonObject["email"], jsonObject["set"]);
    }

    static createId(name) {
        return btoa(`${name}-${Date.now()}`);
    }

    static getUserById(id) {
        let localUsers = getLocalStorage("users", JSON.parse);
        if(localUsers == null) {
            localUsers = {}
        }
        return localUsers[id];
    }
}


function addUser(user, password) {
    let localUsers = getLocalStorage("users", JSON.parse);
    if(localUsers == null) {
        localUsers = {}
    }
    let response;
    Object.keys(localUsers).forEach((key) => {
        console.log("Names", localUsers[key].name, user.name)
        console.log("Mails", localUsers[key].email, user.email)
        if(localUsers[key].name === user.name) {
            response = "Ce nom est déjà utilisé."
        }
        if(localUsers[key].email === user.email) {
            response = "Cette adresse email est déjà utilisée."
        }
    });
    if (response) { return response; }
    const userJson = user.toJson();
    userJson["password"] = password;
    localUsers[user.id] = userJson;
    setLocalStorage("users", localUsers, JSON.stringify);
    return response;
}

function changeUserSet(userId, newSet) {
    let localUsers = getLocalStorage("users", JSON.parse);
    // From Sonar
    if (!localUsers?.[userId]) {
        return false;
    }
    const userJson = localUsers[userId];
    console.log(userJson)
    userJson.set = newSet;
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
        console.log(localUser.email, email)
        console.log(localUser.password, password)
        if(localUser.email === email) {
            if(localUser.password === password) {
                user = User.parseUser(localUser);
            }
        }
    });
    return user;
}


export {
    User,
    addUser,
    changeUserSet,
    login
}