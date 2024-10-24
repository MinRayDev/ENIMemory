import {getLocalStorage} from "../utils/storage.js";

const getId = () => sessionStorage.getItem("token");

function isConnected() {
    // I'm using user id as token because we are storing user in browser anyway lmao
    const token = getId();
    if (!token) return false;

    const localUsers = getLocalStorage("users", JSON.parse) ?? {};
    return token in localUsers;
}

const saveToken = (token) => sessionStorage.setItem("token", token);

const disconnect = () => sessionStorage.removeItem("token");

export {
    getId,
    isConnected,
    saveToken,
    disconnect
}