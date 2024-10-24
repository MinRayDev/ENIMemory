import { getScoreboard } from "../core/game.js";
import { closeModal, openModal } from "../components/modal.js";
import { gameSets } from "../core/references.js";
import {onClick} from "../utils/toolbox.js";

function load() {
    const scores = getScoreboard();
    const $scoreboard = document.querySelector("#scoreboard");

    scores.forEach((value, index) => {
        const sizeSupplement = value.size[2] > 0 ? ` (+${value.size[2]})` : "";

        const $tr = document.createElement("tr");
        $tr.classList.add("sb-row");
        $tr.innerHTML = `
            <th>${index + 1}</th>
            <th>${value.author}</th>
            <th>${value.score}</th>
            <th>${value.date}</th>
            <th>${gameSets[value.set]["displayName"]}</th>
            <th>${value.size[0]}x${value.size[1]}${sizeSupplement}</th>
        `;
        onClick($tr,
            () => {
                openModal(
                    `Partie de ${value.author} le ${value.date}`,
                    `Score: ${value.score}`,
                    `Cartes: ${gameSets[value.set]["displayName"]}, Taille: ${value.size[0]}x${value.size[1]}${supp}`,
                    "Fermer",
                    closeModal
                );
            }
        )
        $scoreboard.appendChild($tr);
    });
}

export { load };
