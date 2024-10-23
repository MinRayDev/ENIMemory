import {getLocalStorage} from "../utils/storage.js";

function getId() { return sessionStorage.getItem("token") }

function isConnected() {
    // I'm using user id as token because we are storing user in browser anyway lmao
    const token = getId();
    if(!token) { return false; }
    let localUsers = getLocalStorage("users", JSON.parse);
    return Object.keys(localUsers).includes(token);
}

function saveToken(token) { sessionStorage.setItem("token", token); }


export {getId, isConnected, saveToken}