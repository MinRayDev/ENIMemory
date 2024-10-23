import {closeModal, openModal} from "../utils/modal.js";
import {login} from "../core/users.js";
import {client} from "../core/client.js";
import {redirect} from "../utils/toolbox.js";


function load() {
    const $form = document.getElementById("login-form");
    if ($form) {
        const $closeModal = document.getElementById("modal-close");
        $closeModal.addEventListener("click", () => {
            closeModal();
        })
        $form.addEventListener("submit", function (event) {
            event.preventDefault();
            const $emailInput = document.getElementById("email");
            const $passwordInput = document.getElementById("password");

            const emailValue = $emailInput.value.trim()
            const passwordValue = $passwordInput.value.trim()
            const user = login(emailValue, passwordValue);
            if(user == null) {
                const $modalMessage = document.getElementById("modal-message");
                if($modalMessage) {
                    document.getElementById("modal-title").textContent = "Attention !";
                    document.getElementById("modal-subtitle").textContent = "Vous n'avez pas pu vous connecter.";
                    $modalMessage.textContent = "L'adresse email ou le mot de passe est incorrect.";
                }
                openModal();
                return;
            }
            client.user = user;
            $form.reset()

            const $modalMessage = document.getElementById("modal-message");
            if($modalMessage) {
                document.getElementById("modal-title").textContent = "Validation";
                document.getElementById("modal-subtitle").textContent = "Vous avez réussi à vous connecter.";
                $modalMessage.textContent = "Vous allez être redirigé vers votre profil.";
                document.getElementById("modal-close").style.display = "none";
            }
            openModal();
            console.log("log", client.user)
            redirect("profile");

        });
    }
}

export {load}