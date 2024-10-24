import {editUser, getUserById} from "./users.js";
import {getId} from "./client.js";
import {getLocalStorage, setLocalStorage} from "../utils/storage.js";
import {openModal} from "../components/modal.js";

const game = {
    grid: {},
    selections: [],
    found: 0,
    score: 0,
    size: null,
    set: null
};

function win() {
    saveGame();
    openModal(
        "Félicitations !",
        "Vous avez réussi à résoudre le jeu !",
        "Appuyez sur `espace` pour recommencer.",
        "Rejouer",
        () => location.reload()
    );
}

function incrementScore() {
    game.score++;
    const $score = document.getElementById("score");
    $score.textContent = `${game.score}`;
}

function getCurrentGame(username) {
    const today = new Date();
    return {
        "score": game.score,
        "size": game.size,
        "set": game.set,
        "author": username,
        "date": `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`
    }
}

const getScoreboard = () => getLocalStorage("scoreboard", JSON.parse) ?? [];

const saveScoreboard = (newScoreboard) => setLocalStorage("scoreboard", newScoreboard, JSON.stringify);


function saveGame() {
    const user = getUserById(getId());
    const currentGame = getCurrentGame(user.name);
    user.history.unshift(currentGame);
    editUser(getId(), "history", user.history);

    const currentScoreboard = getScoreboard();

    /* Solution inspired by https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some */
    const shouldAdd = currentScoreboard.length === 0 || currentScoreboard.some((entry) => entry.score > currentGame.score);

    if (shouldAdd) {
        currentScoreboard.push(currentGame);
    }

    currentScoreboard.sort((a, b) => a.score - b.score);
    saveScoreboard(currentScoreboard.slice(0, 5));
}

export {
    game,
    win,
    incrementScore,
    getScoreboard,
    saveGame
}