import {disconnect, getId, isConnected} from "../core/client.js";
import {editUser, User} from "../core/users.js";
import {gameSets} from "../core/references.js";
import {computeGrid, redirect} from "../utils/toolbox.js";
import {closeModal, openModal} from "../components/modal.js";


function loadSize(eventLoad = true) {
    const user = User.getUserById(getId());
    const $sizeSelector = document.getElementById("size-selector");
    const grid = computeGrid(gameSets[user.set].count*2);
    $sizeSelector.innerHTML = "";
    for (const value of grid) {
        const $option = document.createElement("option");
        $option.value = JSON.stringify(value);
        console.log($option.value)
        let supp = "";
        if (value[2] > 0) {
            supp = ` (+${value[2]})`;
        }
        $option.textContent = `${value[0]}x${value[1]}${supp}`;
        $sizeSelector.appendChild($option);
    }
    if (!user.size) {
        $sizeSelector.value = JSON.stringify(grid[0]);
        console.log("Auto set", $sizeSelector.value)
        editUser(getId(), "size", $sizeSelector.value);
    }
    if(!eventLoad) {
        if (user.size) {
            $sizeSelector.value = user.size;
        }
        $sizeSelector.addEventListener("change", () => {
            const value = $sizeSelector.value;
            editUser(getId(), "size", value);
        });
    }
}

function load() {
    if(!isConnected()) {
        redirect("login")
    }
    const $disconnectButton = document.getElementById("disconnect");
    $disconnectButton.addEventListener("click", () => {
        disconnect();
        redirect("login")
    });
    const user = User.getUserById(getId());
    const $username = document.getElementById("username");
    const $email = document.getElementById("email");
    $username.textContent = user.name;
    $email.textContent = user.email;
    const $setSelector = document.getElementById("set-selector");
    const $previewImage = document.getElementById("set-preview");
    for (const [key, value] of Object.entries(gameSets)) {
        const $option = document.createElement("option");
        $option.value = key
        $option.textContent = value["displayName"];
        $setSelector.appendChild($option);
    }
    $setSelector.value = user.set
    $previewImage.src = `../assets/cards/previews/${user.set}.png`;
    $setSelector.addEventListener("change", () => {
        editUser(getId(), "set", $setSelector.value);
        $previewImage.src =`../assets/cards/previews/${$setSelector.value}.png`;
        loadSize();
    });
    loadSize(false);
    const $history = document.querySelector("#history");
    $history.style.display = "block";
    let userHistory = user.history;
    if (!userHistory) {
        userHistory = [];
    }
    userHistory.slice(0, 8).forEach(value => {
        const $div = document.createElement("article");
        $div.classList.add("history-game");
        $div.innerHTML = `<h4 class="mg0">Score ${value.score}</h4><h4 class="mg0">${value.date}</h4>`;
        $history.appendChild($div);
        $div.addEventListener("click", () => {
            let supp = "";
            if (value.size[2] > 0) {
                supp = ` (+${value.size[2]})`;
            }
            openModal(
                `Partie de ${user.name} le ${value.date}`,
                `Score: ${value.score}`,
                `Cartes: ${gameSets[value.set]["displayName"]}, Taille: ${value.size[0]}x${value.size[1]}${supp}`,
                "Fermer",
                closeModal
            )
        });
    });
}

export {load}