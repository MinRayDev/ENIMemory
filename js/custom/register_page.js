import {
    checkEmail,
    checkPassword,
    checkPasswords,
    checkRegister,
    checkUsername,
    getPasswordScore
} from "../utils/checker.js";
import {closeModal, openModal, timedModal} from "../components/modal.js";
import {addUser, User} from "../core/users.js";
import {redirect} from "../utils/toolbox.js";
import {setError, setIdle, setSuccess} from "../components/register_input.js";
import {shake} from "../components/glitter.js";


function registerChecker(id, formatter, checker, idleMessage = "") {
    const $input= document.getElementById(id);
    if(!$input || !($input instanceof  HTMLInputElement)) { return; }
    $input.addEventListener("input", () => {
        const value = formatter($input.value);
        if (((typeof value === "string") && value.length === 0) || value == null) {
            console.log("test");
            setIdle(id, idleMessage)
            return;
        }
        const result = checker(value);
        console.log(value, result)
        if (result) {
            setError(id, result)
            return;
        }
        setSuccess(id, "Validé.")
    });
}

function passwordRegisterChecker() {
    const confirmId = "confirm-password";
    const $input= document.getElementById("password");
    const $inputConfirm= document.getElementById(confirmId);
    if(!$input || !($input instanceof  HTMLInputElement)) { return; }
    if(!$inputConfirm || !($inputConfirm instanceof  HTMLInputElement)) { return; }
    const check = () => {
        const value = $input.value.trim();
        const valueConfirmation = $inputConfirm.value.trim();
        const score = getPasswordScore(value);
        ["weak-score", "medium-score", "strong-score"].forEach((id) => {
            const $score = document.getElementById(id);
            if($score) {
                $score.style.backgroundColor = "var(--base)"
            }
        });
        if (score >= 1) {
            document.getElementById("weak-score").style.backgroundColor = "var(--weak)"
        }
        if (score >= 2) {
            document.getElementById("medium-score").style.backgroundColor = "var(--medium)"
        }
        if (score >= 3) {
            document.getElementById("strong-score").style.backgroundColor = "var(--success)"
        }
        if (((typeof value === "string") && value.length === 0) || value == null) {
            setIdle(confirmId, "")
            return;
        }
        const result = checkPasswords(value, valueConfirmation);
        console.log(value, result)
        if (result) {
            setError(confirmId, result)
            return;
        }
        setSuccess(confirmId, "Validé.")
    }
    $input.addEventListener("input", check);
    $inputConfirm.addEventListener("input", check);
    check();
}

function load() {
    registerChecker("username", (value) => value.trim(), checkUsername)
    registerChecker("email", (value) => value.trim(), checkEmail)
    registerChecker("password", (value) => value.trim(), checkPassword, "Au moins un symbole, un chiffre, ainsi que 6 caractères minimum.");
    passwordRegisterChecker()
    const $form = document.getElementById("register-form");
    if ($form) {
        $form.addEventListener("submit", function (event) {
            event.preventDefault();
            const response = checkRegister();
            if(typeof response === "string") {
                shake(document.querySelector("body"))
                openModal(
                    "Attention !",
                    "Vous n'avez pas pu vous inscrire.",
                    response,
                    "Fermer",
                    closeModal
                );
                return;
            }
            const newUser = new User(User.createId(response.username), response.username, response.email);
            const addResponse = addUser(newUser, response.passwords);
            if(typeof addResponse === "string") {
                shake(document.querySelector("body"))
                openModal(
                    "Attention !",
                    "Vous n'avez pas pu vous inscrire.",
                    addResponse,
                    "Fermer",
                    closeModal
                );
                return;
            }
            $form.reset()
            timedModal(
                "Validation",
                "Vous avez réussi à vous inscrire.",
                "Redirection vers la page de connexion dans %start% secondes.",
                () => redirect("login"),
                1,
            );
        });
    }
}

export {load}