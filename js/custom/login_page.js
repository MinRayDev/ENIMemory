import {closeModal, openModal, timedModal} from "../components/modal.js";
import {login} from "../core/users.js";
import {saveToken} from "../core/client.js";
import {redirect} from "../utils/toolbox.js";


function load() {
    const $form = document.getElementById("login-form");
    if ($form) {
        $form.addEventListener("submit", function (event) {
            event.preventDefault();
            const $emailInput = document.getElementById("email");
            const $passwordInput = document.getElementById("password");

            const emailValue = $emailInput.value.trim()
            const passwordValue = $passwordInput.value.trim()
            const user = login(emailValue, passwordValue);
            if(user == null) {
                openModal(
                    "Attention !",
                    "Vous n'avez pas pu vous connecter.",
                    "L'adresse email ou le mot de passe est incorrect.",
                    "Fermer",
                    closeModal
                );
                return;
            }
            saveToken(user.id)
            $form.reset()
            timedModal(
                "Validation",
                "Vous avez réussi à vous connecter.",
                "Redirection vers votre profil dans %start% secondes.",
                () => redirect("profile"),
                1,
            );
        });
    }
}

export {load}