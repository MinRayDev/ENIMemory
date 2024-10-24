import {doubleCards, GameCard, loadSet, shuffle} from "../core/game_set.js";
import {game, saveGame} from "../core/game.js";
import {openModal} from "../components/modal.js";
import {getId} from "../core/client.js";
import { User} from "../core/users.js";
import {computeGrid, redirect} from "../utils/toolbox.js";
import {gameSets} from "../core/references.js";
import {shake} from "../components/glitter.js";


function win() {
    saveGame()
    openModal(
        "Félicitations !",
        "Vous avez réussi à résoudre le jeu !",
        "Appuyez sur `espace` pour recommencer.",
        "Rejouer",
        () => location.reload()
    )
}

function incrementScore() {
    game.score++;
    const $score = document.getElementById("score");
    $score.textContent = `${game.score}`
}

export function load() {
    const user = User.getUserById(getId());
    if(!game.set) {
        const $setSelector = document.getElementById("set-selector");
        const $previewImage = document.getElementById("set-preview");
        for (const [key, value] of Object.entries(gameSets)) {
            const $option = document.createElement("option");
            $option.value = key
            $option.textContent = value["displayName"];
            $setSelector.appendChild($option);
        }
        $setSelector.value = user?.set ?? "vegetables";
        $previewImage.src = `../assets/cards/previews/${$setSelector.value}.png`;
        $setSelector.addEventListener("change", () => {
            $previewImage.src =`../assets/cards/previews/${$setSelector.value}.png`;
        });
        const $startButton = document.getElementById("start");
        $startButton.addEventListener("click", () => {
            const $setSelector = document.getElementById("set-selector");
            game.set = $setSelector.value;
            load();
        },  {"once": true})
        return;
    }
    document.getElementById("selection-container").style.display = "none";
    document.getElementById("game").style.display = "block";
    document.querySelector(".tooltip").addEventListener("click", () => {
        redirect("scoreboard")
    })
    window.addEventListener("keydown", function(event) {
        if (event.code === "Space") {
            event.preventDefault();
            location.reload();
        }
    });
    const cardSet = loadSet(game.set);
    if(!cardSet) {
        console.error("Couldn't load card set");
        return;
    }
    const cards = shuffle(doubleCards(cardSet));
    if(!cards) {
        console.error("Couldn't shuffle cards");
        return;
    }
    const userSize = user?.size;
    if (userSize) {
        game.size = JSON.parse(user.size);
    }
    if(!game.size) {
        const grid = computeGrid(cardSet.length);
        game.size = grid[Math.floor(grid.length/2)];
    }
    const $cardSection = document.getElementById("cards");
    $cardSection.style.gridTemplateColumns = `repeat(${game.size[0]}, 1fr)`
    $cardSection.style.gridTemplateRows = `repeat(${game.size[1]}, 1fr)`
    for(const card of cards) {
        game.grid[card.id] = card;
        document.getElementById("cards").insertAdjacentHTML("beforeend", `<div class="card-container card-hide"><img src="${card.path}" alt="${card.id}" id="${card.id}" draggable="false"/></div>`);
        const $card = document.getElementById(card.id);
        $card.addEventListener("click", () => {
            const response = card.setSelected();
            if(response) {
                $card.classList.add('showAnimation');
                $card.parentElement.classList.add('showAnimation');
                $card.addEventListener('animationend', () => {
                    $card.classList.remove('showAnimation');
                    $card.parentElement.classList.remove('showAnimation');
                }, { once: true });
                if(card.bothFound()) {
                    card.setFound()
                    card.setLinkFound()
                    incrementScore();
                } else if (game.selections.length === 2) {
                    game.selections.forEach((id) => {
                        setTimeout(() => GameCard.setUnSelected(id), 1000)
                    })
                    incrementScore();
                }
                if(Object.keys(game.grid).length === game.found) {
                    win()
                }
            } else {
                shake(document.querySelector("body"), "fast-shake");
            }
        });
    }
}