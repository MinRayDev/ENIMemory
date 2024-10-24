import { disconnect, getId, isConnected } from "../core/client.js";
import { editUser, getUserById } from "../core/users.js";
import { gameSets } from "../core/references.js";
import { closeModal, openModal } from "../components/modal.js";
import {loadSetSelector, loadSizeSelector } from "../components/selectors.js";
import { onClick, redirect } from "../utils/toolbox.js";

function load() {
    if (!isConnected()) redirect("login");
    const user = getUserById(getId());

    onClick(document.getElementById("disconnect"), () => { disconnect(); redirect("login"); });

    document.getElementById("username").textContent = user.name;
    document.getElementById("email").textContent = user.email;

    loadSetSelector(user.set, (value) => {
        editUser(getId(), "set", value);
        loadSizeSelector();
    });
    loadSizeSelector(false);

    const $history = document.querySelector("#history");
    $history.style.display = "block";

    const userHistory = user.history ?? [];
    userHistory.slice(0, 4).forEach(value => {
        const $div = document.createElement("article");
        $div.classList.add("history-game");
        $div.innerHTML = `<h4 class="mg0">Score ${value.score}</h4><h4 class="mg0">${value.date}</h4>`;
        $history.appendChild($div);

        onClick($div, () => {
            const sizeSupplement = value.size[2] > 0 ? ` (+${value.size[2]})` : "";
            openModal(
                `Partie de ${user.name} le ${value.date}`,
                `Score: ${value.score}`,
                `Cartes: ${gameSets[value.set]["displayName"]}, Taille: ${value.size[0]}x${value.size[1]}${sizeSupplement}`,
                "Fermer",
                closeModal
            );
        });
    });
}

export { load };
