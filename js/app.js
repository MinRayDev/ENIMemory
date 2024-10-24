import { getCurrentHtml } from "./utils/toolbox.js";
import { load as loadGame } from "./custom/game_page.js";
import { load as loadRegister } from "./custom/register_page.js";
import { load as loadLogin } from "./custom/login_page.js";
import { load as loadProfile } from "./custom/profile_page.js";
import { load as loadScoreboard } from "./custom/scoreboard_page.js";
import { displayNav } from "./components/nav.js";

function init() {
    const navRef = document.querySelector("meta[name='navref']")?.content;
    const currentHtml = getCurrentHtml();

    const pageLoaders = {
        game: loadGame,
        register: loadRegister,
        login: loadLogin,
        profile: loadProfile,
        scoreboard: loadScoreboard,
    };

    const prefixConfig = {
        index: { prefixIndex: "./", prefixPages: "./pages/" },
        default: { prefixIndex: "../", prefixPages: "./" },
    };

    const { prefixIndex, prefixPages } = prefixConfig[currentHtml] ?? prefixConfig.default;

    if (currentHtml in pageLoaders) {
        pageLoaders[currentHtml]();
    }
    displayNav(navRef ?? currentHtml, prefixIndex, prefixPages);
}

document.addEventListener("DOMContentLoaded", init);
