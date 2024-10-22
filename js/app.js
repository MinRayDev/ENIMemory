import {getCurrentHtml} from "./utils/toolbox.js";
import {load as loadIndex} from "./custom/index_page.js";
import {load as loadGame} from "./custom/game_page.js";


function init() {
    const currentHtml = getCurrentHtml();
    const $navSelect = document.getElementById(`nav-${currentHtml}`);
    if ($navSelect) {
        $navSelect.classList.add("selected");
    }
    switch (currentHtml) {
        case "index": {
            loadIndex()
            break;
        }
        case "game": {
            loadGame()
            break;
        }
    }
}
document.addEventListener("DOMContentLoaded", init);