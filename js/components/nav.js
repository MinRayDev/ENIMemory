import {isConnected} from "../core/client.js";

function displayNav(current, prefixIndex, prefixPages) {
    const navContents = {
        index: "Accueil",
        profile: isConnected() ? "Profil" : "Se Connecter",
        game: "Jouer",
    };
    const $body = document.querySelector(`body`);
    const navNode = [`<nav>`]
    for (const [key, title] of Object.entries(navContents)) {
        const prefix = key === 'index' ? prefixIndex : prefixPages;
        const selectClass = key === current ? ' selected' : '';
        navNode.push(`<div id="nav-${key}" class="nav-content${selectClass}"><a href="${prefix}${key}.html">${title}</a></div>`);
    }
    navNode.push("</nav>");
    $body.insertAdjacentHTML("afterbegin", navNode.join(""));
}

export { displayNav }