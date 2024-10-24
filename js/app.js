import {getCurrentHtml} from "./utils/toolbox.js";
import {load as loadGame} from "./custom/game_page.js";
import {load as loadRegister} from "./custom/register_page.js";
import {load as loadLogin} from "./custom/login_page.js";
import {load as loadProfile} from "./custom/profile_page.js";
import {load as loadScoreboard} from "./custom/scoreboard_page.js";
import {displayNav} from "./components/nav.js";


function init() {
    const $meta = document.querySelector("meta[name='navref']")
    let navRef;
    if ($meta) {
        navRef = $meta.content;
    }
    const currentHtml = getCurrentHtml();
    let prefixIndex = "../";
    let prefixPages = "./";
    switch (currentHtml) {
        case "index": {
            prefixIndex = "./";
            prefixPages = "./pages/";
            break;
        }
        case "game": {
            loadGame();
            break;
        }
        case "register": {
            loadRegister();
            break;
        }
        case "login": {
            loadLogin();
            break;
        }
        case "profile": {
            loadProfile();
            break;
        }
        case "scoreboard": {
            loadScoreboard();
            break;
        }
    }
    console.log(navRef ?? currentHtml)
    displayNav(navRef ?? currentHtml, prefixIndex, prefixPages);

}
document.addEventListener("DOMContentLoaded", init);
