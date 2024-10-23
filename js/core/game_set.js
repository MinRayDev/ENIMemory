import {gameSets} from "./references.js";
import {game} from "./game.js";

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
     *
     */
    constructor(idx, id, path) {
        this.idx = idx;
        this.id = id;
        this.path = path;
        this.link = "";
        this.selected = false;
        this.found = false;
    }

    setSelected() {
        if(game.selections.length >= 2 || this.found || game.selections.includes(this.id)) {
            return false;
        }
        game.selections.push(this.id);
        this.selected = true;
        const $selfCard = document.getElementById(this.id);
        if($selfCard) {
            $selfCard.classList.add("card-selected");
            $selfCard.parentElement.classList.remove("card-hide")
        }
        return true;
    }

    static setUnSelected(id) {
        const $selfCard = document.getElementById(id);
        if($selfCard) {
            if(!game.grid[id].found) {
                $selfCard.classList.add('hideAnimation');
                $selfCard.parentElement.classList.add('hideAnimation');
                $selfCard.addEventListener('animationend', () => {
                    $selfCard.classList.remove('hideAnimation');
                    $selfCard.parentElement.classList.remove('hideAnimation');
                    $selfCard.parentElement.classList.add("card-hide")
                    $selfCard.classList.remove("card-selected");
                    const idIndex = game.selections.indexOf(id);
                    if(idIndex > -1) {
                        game.selections.splice(idIndex, 1);
                    }
                }, { once: true });
            } else {
                const idIndex = game.selections.indexOf(id);
                if (idIndex > -1) {
                    game.selections.splice(idIndex, 1);
                }
            }
        }
        game.grid[id].selected = false;
    }

    setFound() {
        this.found = true;
        const $selfCard = document.getElementById(this.id);
        $selfCard.classList.add("card-found");
        GameCard.setUnSelected(this.id)
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
    if (type in gameSets) {
        const cards = [];
        for (let i = 1; i <= gameSets[type].count; i++) {
            const card = new GameCard(i, `${i}o`, `../assets/cards/${type}/${i}.${gameSets[type].ext}`);
            cards.push(card);
        }
        return cards;
    }
}


/**
 * Twice the size of the original array. (Copying the array and adding the same card twice)
 *
 * @param {GameCard[]} cards - The array of GameCard objects to double.
 * @returns {GameCard[]} A new array with the same cards as the original array, but with each card added twice.
 */
function doubleCards(cards) {
    const newCards = [];
    for (const element of cards) {
        const oldCard = element;
        const newCard = new GameCard(oldCard.idx, `${oldCard.idx}c`, oldCard.path);
        oldCard.link = newCard.id
        newCard.link = oldCard.id
        newCards.push(oldCard)
        newCards.push(newCard)
    }
    return newCards;
}

/**
 * Shuffles the cards in the array.
 *
 * Solution inspired by https://stackoverflow.com/questions/53591691/sorting-an-array-in-random-order
 *
 * @param {GameCard[]} cards - The array of GameCard objects to shuffle.
 * @returns {GameCard[]} A new array with the same cards as the original array, but in a random order.
 */
function shuffle(cards) {
    cards.sort(() => Math.random() - 0.5);
    return cards;
}

export {
    loadSet,
    doubleCards,
    shuffle,
    GameCard
}