import { doubleCards, GameCard, loadSet, shuffle } from "../core/game_set.js";
import {game, incrementScore, win} from "../core/game.js";
import { getId } from "../core/client.js";
import { afterAnimation, computeGrid, onClick, onPress, redirect } from "../utils/toolbox.js";
import { shake } from "../components/glitter.js";
import { loadSetSelector } from "../components/selectors.js";
import { getUserById } from "../core/users.js";



function load() {
    const user = getUserById(getId());
    if (!game.set) {
        loadSetSelector(user?.set ?? "vegetables");
        onClick(document.getElementById("start"), () => {
            game.set = document.getElementById("set-selector").value;
            load();
        }, true);
        return;
    }

    document.getElementById("selection-container").style.display = "none";
    document.getElementById("game").style.display = "block";
    onClick(document.querySelector(".tooltip"), () => redirect("scoreboard"));
    onPress(window, ["space"], () => { location.reload(); });
    const cardSet = loadSet(game.set);
    if (!cardSet) return;
    const cards = shuffle(doubleCards(cardSet));
    if (!cards) return;
    const userSize = user?.size;
    if (userSize) {
        game.size = JSON.parse(user.size);
    }
    if ((!game.size) || (user?.set && (user.set !== game.set))) {
        const grid = computeGrid(cardSet.length);
        game.size = grid[Math.floor(grid.length / 2)];
    }
    const $cardSection = document.getElementById("cards");
    $cardSection.style.gridTemplateColumns = `repeat(${game.size[0]}, 1fr)`;
    $cardSection.style.gridTemplateRows = `repeat(${game.size[1]}, 1fr)`;
    for (const card of cards) {
        game.grid[card.id] = card;
        document.getElementById("cards").insertAdjacentHTML("beforeend", `<div class="card-container card-hide"><img src="${card.path}" alt="${card.id}" id="${card.id}" draggable="false"/></div>`);
        const $card = document.getElementById(card.id);
        $card.addEventListener("click", () => {
            const response = card.setSelected();
            if (response) {
                $card.classList.add('showAnimation');
                $card.parentElement.classList.add('showAnimation');
                afterAnimation($card, () => { $card.classList.remove('showAnimation'); $card.parentElement.classList.remove('showAnimation') });
                if (card.bothFound()) {
                    card.setFound();
                    card.setLinkFound();
                    incrementScore();
                } else if (game.selections.length === 2) {
                    game.selections.forEach((id) => {
                        setTimeout(() => GameCard.setUnSelected(id), 1000);
                    });
                    incrementScore();
                }
                if (Object.keys(game.grid).length === game.found) {
                    win();
                }
            } else {
                shake(document.querySelector("body"), "fast-shake");
            }
        });
    }
}

export { load };