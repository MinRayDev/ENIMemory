import {doubleCards, GameCard, loadSet, shuffle} from "../core/game_set.js";
import {game} from "../core/game.js";
import {closeModal, openModal} from "../utils/modal.js";
import {getId} from "../core/client.js";
import {User} from "../core/users.js";


function win() {
    const $main = document.querySelector("main")
    if(!$main) {
        return
    }
    openModal()
}

export function load() {
    window.addEventListener("keydown", function(event) {
        if (event.code === "Space") {
            event.preventDefault();
            location.reload();
        }
    });
    const user = User.getUserById(getId())
    const cardSet = loadSet(user?.set ?? "vegetables");
    if(!cardSet) {
        console.error("Couldn't load card set");
        return;
    }
    const cards = shuffle(doubleCards(cardSet));
    if(!cards) {
        console.error("Couldn't shuffle cards");
        return;
    }
    for(const card of cards) {
        game.grid[card.id] = card;
        document.getElementById("cards").insertAdjacentHTML("beforeend", `<div class="card-container card-hide"><img src="${card.path}" alt="${card.id}" id="${card.id}" draggable="false"></div>`);
        const $closeModal = document.getElementById("modal-close");
        $closeModal.addEventListener("click", () => {
            location.reload();
        })
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
                } else if (game.selections.length === 2) {
                    game.selections.forEach((id) => {
                        setTimeout(() => GameCard.setUnSelected(id), 1000)
                    })
                }
                if(Object.keys(game.grid).length === game.found) {
                    win()
                }
            }
        });
    }
}