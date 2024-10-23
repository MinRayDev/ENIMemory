import {getCurrentHtml} from "./utils/toolbox.js";
import {load as loadGame} from "./custom/game_page.js";
import {load as loadRegister} from "./custom/register_page.js";
import {load as loadLogin} from "./custom/login_page.js";
import {load as loadProfile} from "./custom/profile_page.js";
import {displayNav} from "./components/nav.js";


function init() {
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
    }
    displayNav(currentHtml, prefixIndex, prefixPages);

}
document.addEventListener("DOMContentLoaded", init);
