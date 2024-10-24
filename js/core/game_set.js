import { gameSets } from "./references.js";
import { game } from "./game.js";

/**
 * Represents a game card.
 */
class GameCard {
    /**
     * Creates an instance of a GameCard.
     *
     * @param {string} idx - The index of the card in the set.
     * @param {string} id - The unique identifier for the card.
     * @param {string} path - The path to the image associated with the card.
     */
    constructor(idx, id, path) {
        this.idx = idx;
        this.id = id;
        this.path = path;
        this.link = "";
        this.selected = false;
        this.found = false;
    }

    canBeSelected() {
        return game.selections.length < 2 && !this.found && !game.selections.includes(this.id);
    }

    setSelected() {
        if (this.canBeSelected()) {
            game.selections.push(this.id);
            this.selected = true;
            this.updateCardDisplay(true);
            return true;
        }
        return false;
    }

    updateCardDisplay(isSelected) {
        const $selfCard = document.getElementById(this.id);
        if ($selfCard) {
            $selfCard.classList.toggle("card-selected", isSelected);
            if (isSelected) {
                $selfCard.parentElement.classList.remove("card-hide");
            }
        }
    }

    static setUnSelected(id) {
        const $selfCard = document.getElementById(id);
        if ($selfCard) {
            if (!game.grid[id].found) {
                $selfCard.classList.add('hideAnimation');
                $selfCard.parentElement.classList.add('hideAnimation');

                $selfCard.addEventListener('animationend', () => {
                    $selfCard.classList.remove('hideAnimation');
                    $selfCard.parentElement.classList.remove('hideAnimation');
                    $selfCard.parentElement.classList.add("card-hide");
                    $selfCard.classList.remove("card-selected");
                    game.selections = game.selections.filter(selectedId => selectedId !== id);
                }, { once: true });
            } else {
                game.selections = game.selections.filter(selectedId => selectedId !== id);
            }
        }
        game.grid[id].selected = false;
    }

    setFound() {
        this.found = true;
        const $selfCard = document.getElementById(this.id);
        $selfCard.classList.add("card-found");
        GameCard.setUnSelected(this.id);
        game.found++;
    }

    setLinkFound() {
        game.grid[this.link].setFound();
    }

    isLinkSelected() {
        return game.grid[this.link].selected;
    }

    bothFound() {
        return this.isLinkSelected() && this.selected;
    }
}

/**
 * Loads a set of game cards based on the specified type.
 *
 * @param {string} type - The type of the game set to load (e.g., "alphabet", "animals").
 * @returns {GameCard[] | undefined} An array of GameCard objects for the specified game set. If the `type` doesn't exist in `gameSets`, it returns `undefined`.
 */
function loadSet(type) {
    if (gameSets[type]) {
        const cards = [];
        for (let i = 1; i <= gameSets[type].count; i++) {
            const card = new GameCard(i, `${i}o`, `../assets/cards/${type}/${i}.${gameSets[type].ext}`);
            cards.push(card);
        }
        return cards;
    }
}

/**
 * Doubles the size of the original array by adding each card twice.
 *
 * Solution inspired by https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap
 *
 * @param {GameCard[]} cards - The array of GameCard objects to double.
 * @returns {GameCard[]} A new array with each card added twice.
 */
function doubleCards(cards) {
    return cards.flatMap(card => {
        const newCard = new GameCard(card.idx, `${card.idx}c`, card.path);
        card.link = newCard.id;
        newCard.link = card.id;
        return [card, newCard];
    });
}

/**
 * Shuffles the cards in the array.
 *
 * Solution inspired by https://stackoverflow.com/questions/53591691/sorting-an-array-in-random-order
 *
 * @param {GameCard[]} cards - The array of GameCard objects to shuffle.
 * @returns {GameCard[]} A new array with the same cards as the original array, but in a random order.
 */
const shuffle = (cards) => cards.sort(() => Math.random() - 0.5);

export {
    loadSet,
    doubleCards,
    shuffle,
    GameCard
}
