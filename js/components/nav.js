import {isConnected} from "../core/client.js";

function displayNav(current, prefixIndex, prefixPages) {
    const $body = document.querySelector(`body`);
    const navNodes = `
    <nav>
        <div id="nav-index" class="nav-content"><a href="${prefixIndex}index.html">Accueil</a></div>
        <div id="nav-profile" class="nav-content"><a href="${prefixPages}profile.html">${isConnected() ? "Profil" : "Se Connecter"}</a></div>
        <div id="nav-game" class="nav-content"><a href="${prefixPages}game.html">Jouer</a></div>
    </nav>
    `
    $body.insertAdjacentHTML("afterbegin", navNodes)
    const $navSelect = document.getElementById(`nav-${current}`);
    if ($navSelect) {
        $navSelect.classList.add("selected");
    }
}

export {
    displayNav
}