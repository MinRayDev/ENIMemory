import {
    checkEmail,
    checkPassword,
    checkPasswords,
    checkRegister,
    checkUsername,
    getPasswordScore
} from "../utils/checker.js";
import { closeModal, openModal, timedModal } from "../components/modal.js";
import { addUser } from "../core/users.js";
import { onInput, onSubmit, redirect } from "../utils/toolbox.js";
import { setError, setIdle, setSuccess, updateScoreDisplay } from "../components/form_message.js";
import { shake } from "../components/glitter.js";

function registerChecker(id, formatter, checker, idleMessage = "") {
    const $input = document.getElementById(id);
    if (!$input || !($input instanceof HTMLInputElement)) return;

    onInput($input, () => {
        const value = formatter($input.value);
        if (!value) {
            setIdle(id, idleMessage);
            return;
        }
        const result = checker(value);
        if (result) {
            setError(id, result);
            return;
        }
        setSuccess(id, "Validé.");
    });
}

function passwordRegisterChecker() {
    const $input = document.getElementById("password");
    const $inputConfirm = document.getElementById("confirm-password");

    if (!$input || !($input instanceof HTMLInputElement) || !$inputConfirm || !($inputConfirm instanceof HTMLInputElement)) {
        return;
    }

    const check = () => {
        const value = $input.value.trim();
        const valueConfirmation = $inputConfirm.value.trim();
        const score = getPasswordScore(value);

        updateScoreDisplay(score);

        if (!value) {
            setIdle("confirm-password", "");
            return;
        }

        const result = checkPasswords(value, valueConfirmation);
        if (result) {
            setError("confirm-password", result);
            return;
        }
        setSuccess("confirm-password", "Validé.");
    };
    onInput($input, check);
    onInput($inputConfirm, check);
    check();
}

function load() {
    registerChecker("username", (value) => value.trim(), checkUsername);
    registerChecker("email", (value) => value.trim(), checkEmail);
    registerChecker("password", (value) => value.trim(), checkPassword, "Au moins un symbole, un chiffre, ainsi que 6 caractères minimum.");
    passwordRegisterChecker();

    const $form = document.getElementById("register-form");
    if ($form) {
        onSubmit($form, () => {
            const response = checkRegister();

            if (typeof response === "string") {
                shake(document.querySelector("body"));
                openModal(
                    "Attention !",
                    "Vous n'avez pas pu vous inscrire.",
                    response,
                    "Fermer",
                    closeModal
                );
                return;
            }

            const addResponse = addUser(response.username, response.email, response.passwords);

            if (typeof addResponse === "string") {
                shake(document.querySelector("body"));
                openModal(
                    "Attention !",
                    "Vous n'avez pas pu vous inscrire.",
                    addResponse,
                    "Fermer",
                    closeModal
                );
                return;
            }

            $form.reset();
            timedModal(
                "Validation",
                "Vous avez réussi à vous inscrire.",
                "Redirection vers la page de connexion dans %start% secondes.",
                () => redirect("login"),
                1
            );
        });
    }
}

export { load };
