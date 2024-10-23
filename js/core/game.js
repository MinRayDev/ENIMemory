import {editUser, User} from "./users.js";
import {getId} from "./client.js";
import {getLocalStorage, setLocalStorage} from "../utils/storage.js";

const game = {
    "grid": {},
    "selections": [],
    "found": 0,
    "score": 0,
    "size": null,
    "set": null
}

function getScoreboard() {
    const scoreboard = getLocalStorage("scoreboard", JSON.parse);
    if(!scoreboard) {
        return [];
    }
    return scoreboard;
}

function saveScoreboard(newScoreboard) {
    setLocalStorage("scoreboard", newScoreboard, JSON.stringify);
}

function saveGame() {
    const user = User.parseUser(User.getUserById(getId()));
    const today = new Date()
    const currentGame = {
        "score": game.score,
        "size": game.size,
        "set": game.set,
        "author": user.name,
        "date": `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`
    }
    user.history.unshift(currentGame);
    editUser(getId(), "history", user.toJson().history);
    const currentScoreboard = getScoreboard();
    let shouldAdd = false;
    if(currentScoreboard.length > 0) {
        currentScoreboard.forEach(value => {
            if(value.score <= currentGame.score) {
                shouldAdd = true;
            }
        });
    } else {
        shouldAdd = true;
    }

    if(shouldAdd) {
        currentScoreboard.push(currentGame)
    }
    currentScoreboard.sort((a, b) => a.score - b.score);
    saveScoreboard(currentScoreboard.slice(0, 5));
}

export {saveGame, game}