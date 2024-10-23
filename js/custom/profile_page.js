import {getId, isConnected} from "../core/client.js";
import {openModal} from "../utils/modal.js";
import {changeUserSet, User} from "../core/users.js";
import {gameSets} from "../core/references.js";
import {setLocalStorage} from "../utils/storage.js";


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
    document.querySelector("main > section:first-child").style.display = "flex";
    document.querySelector("main > section:last-child").style.display = "block";
    const user = User.getUserById(getId());
    const $username = document.getElementById("username");
    const $email = document.getElementById("email");
    $username.textContent = user.name;
    $email.textContent = user.email;
    const $setSelector = document.getElementById("set-selector");
    const $previewImage = document.getElementById("set-preview");
    console.log(user.set)
    for (const [key, value] of Object.entries(gameSets)) {
        const $option = document.createElement("option");
        $option.value = key
        $option.textContent = value["display_name"];
        $setSelector.appendChild($option);
    }
    $setSelector.value = user.set
    $previewImage.src = `../resources/assets/cards/previews/${user.set}.png`;
    $setSelector.addEventListener("change", () => {
        console.log($setSelector.value); // This is the entire <option> element
        // changeUserSet(getId(), $setSelector.id);
        $previewImage.src =`../resources/assets/cards/previews/${$setSelector.value}.png`;
    })
}

export {load}