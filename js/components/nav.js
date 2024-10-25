import {isConnected} from "../core/client.js";

/**
 * Displays a navigation menu based on the current page and if current user is connected.
 *
 * @param {string} current - The key of the current page to highlight.
 * @param {string} prefixIndex - The URL prefix for the index (home) page.
 * @param {string} prefixPages - The URL prefix for other pages.
 */
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