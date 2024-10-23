function displayNav(current, prefixIndex, prefixPages) {
    const $body = document.querySelector(`body`);
    const navNodes = `
    <nav>
        <div id="nav-index"><a href="${prefixIndex}index.html">Accueil</a></div>
        <div id="nav-register"><a href="${prefixPages}register.html">S'inscrire</a></div>
        <div id="nav-login"><a href="${prefixPages}login.html">Se connecter</a></div>
        <div id="nav-profile"><a href="${prefixPages}profile.html">Profil</a></div>
        <div id="nav-game"><a href="${prefixPages}game.html">Jouer</a></div>
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