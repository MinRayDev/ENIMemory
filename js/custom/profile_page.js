import {getId, isConnected} from "../core/client.js";
import {openModal} from "../components/modal.js";
import {editUser, User} from "../core/users.js";
import {gameSets} from "../core/references.js";
import {computeGrid} from "../utils/toolbox.js";


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
            console.log("Size from user", user.size);
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
        openModal();
        let start = 1;
        const $modalMessage = document.getElementById("modal-message")
        if($modalMessage) {
            $modalMessage.textContent = `Redirection vers la page de connexion dans ${start+1} secondes.`;
        }
        const intervalId = setInterval(() => {
            const $modalMessage = document.getElementById("modal-message")
            if($modalMessage) {
                $modalMessage.textContent = `Redirection vers la page de connexion dans ${start} secondes.`;
            }
            start--;
        }, 1000)
        setTimeout(() => {
            window.location.href = `./login.html`;
            clearInterval(intervalId);
        }, (start+1) * 1000);
        return;
    }
    document.querySelector("#profile > section:first-child").style.display = "flex";
    document.querySelector("#profile > section:nth-child(2)").style.display = "block";
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
        $option.textContent = value["display_name"];
        $setSelector.appendChild($option);
    }
    $setSelector.value = user.set
    $previewImage.src = `../resources/assets/cards/previews/${user.set}.png`;
    $setSelector.addEventListener("change", () => {
        editUser(getId(), "set", $setSelector.value);
        $previewImage.src =`../resources/assets/cards/previews/${$setSelector.value}.png`;
        loadSize();
    });
    loadSize(false);
    const $history = document.querySelector("#history");
    $history.style.display = "block";
    let userHistory = user.history;
    if (!userHistory) {
        userHistory = [];
    }
    Object.values(userHistory).slice(0, 4).forEach(value => {
        const $div = document.createElement("div");
        $div.innerHTML = `<div class="historyGame"><h4>Score ${value.score}</h4><h4>${value.date}</h4><h6>${value.set}</h6><h7>${value.size}</h7></div>`;
        $history.appendChild($div);
    });
}

export {load}