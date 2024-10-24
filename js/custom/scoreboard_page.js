import {getScoreboard} from "../core/game.js";
import {closeModal, openModal} from "../components/modal.js";
import {gameSets} from "../core/references.js";

function load() {
    const scores = getScoreboard()

    scores.forEach((value, index) => {
        let supp = "";
        if (value.size[2] > 0) {
            supp = ` (+${value.size[2]})`;
        }
        const $tr = document.createElement("tr");
        $tr.classList.add("sb-row");
        $tr.innerHTML = `
        <th>${index + 1}</th>
        <th>
            ${value.author}
        </th>
        <th>
            ${value.score}
        </th>
        <th>
            ${value.date}
        </th>
        <th>
            ${gameSets[value.set]["displayName"]}
        </th>
        <th>
            ${value.size[0]}x${value.size[1]}${supp}
        </th>
        `;
        $tr.addEventListener("click", () => {

            openModal(
                `Partie de ${value.author} le ${value.date}`,
                `Score: ${value.score}`,
                `Cartes: ${gameSets[value.set]["displayName"]}, Taille: ${value.size[0]}x${value.size[1]}${supp}`,
                "Fermer",
                closeModal
            )
        });
        document.querySelector("#scoreboard").appendChild($tr);
    });
}

export {load}