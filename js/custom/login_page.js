import { closeModal, openModal, timedModal } from "../components/modal.js";
import { login } from "../core/users.js";
import { saveToken } from "../core/client.js";
import { onSubmit, redirect } from "../utils/toolbox.js";

function load() {
    const $form = document.getElementById("login-form");
    if (!$form) return;

    onSubmit($form, () => {
        const emailValue = document.getElementById("email").value.trim();
        const passwordValue = document.getElementById("password").value.trim();
        const user = login(emailValue, passwordValue);

        if (!user) {
            openModal(
                "Attention !",
                "Vous n'avez pas pu vous connecter.",
                "L'adresse email ou le mot de passe est incorrect.",
                "Fermer",
                closeModal
            );
            return;
        }

        saveToken(user.id);
        $form.reset();

        timedModal(
            "Validation",
            "Vous avez réussi à vous connecter.",
            "Redirection vers votre profil dans %start% secondes.",
            () => redirect("profile"),
            1
        );
    });
}

export { load };
