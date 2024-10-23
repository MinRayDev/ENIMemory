import {
    checkEmail,
    checkPassword,
    checkPasswords,
    checkRegister,
    checkUsername,
    getPasswordScore
} from "../utils/checker.js";
import {closeModal, openModal} from "../components/modal.js";
import {addUser, User} from "../core/users.js";
import {redirect} from "../utils/toolbox.js";


function setIdle(id, message = "") {
    console.log("set idle")
    const $messageHolder = document.getElementById(`subto-${id}`);
    $messageHolder.textContent = message;
    $messageHolder.classList.remove("error-message", "success-message")
    const $messageIcon = document.getElementById(`${id}-icon`)
    if ($messageIcon) {
        $messageIcon.remove()
    }
}

function setError(id, message) {
    setIdle(id)
    const $messageHolder = document.getElementById(`subto-${id}`);
    $messageHolder.textContent = message;
    $messageHolder.classList.add("error-message");
    $messageHolder.insertAdjacentHTML("beforebegin", `<img src="../resources/assets/error.svg" alt="error-svg" id="${id}-icon"/>`)
}

function setSuccess(id, message) {
    setIdle(id)
    const $messageHolder = document.getElementById(`subto-${id}`);
    $messageHolder.textContent = message;
    $messageHolder.classList.add("success-message")
    $messageHolder.insertAdjacentHTML("beforebegin", `<img src="../resources/assets/check.svg" alt="check-svg" id="${id}-icon"/>`)
}

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
                $score.style.backgroundColor = "#0d1117"
            }
        });
        if (score >= 1) {
            document.getElementById("weak-score").style.backgroundColor = "#d75c13"
        }
        if (score >= 2) {
            document.getElementById("medium-score").style.backgroundColor = "#fff051"
        }
        if (score >= 3) {
            document.getElementById("strong-score").style.backgroundColor = "#14e614"
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
}

function load() {
    registerChecker("username", (value) => value.trim(), checkUsername)
    registerChecker("email", (value) => value.trim(), checkEmail)
    registerChecker("password", (value) => value.trim(), checkPassword, "Au moins un symbole, un chiffre, ainsi que 6 caractères minimum.");
    passwordRegisterChecker()
    const $form = document.getElementById("register-form");
    if ($form) {
        const $closeModal = document.getElementById("modal-close");
        $closeModal.addEventListener("click", () => {
            closeModal();
        })
        $form.addEventListener("submit", function (event) {
            event.preventDefault();
            const response = checkRegister();
            if(typeof response === "string") {
                const $body = document.querySelector("body");
                $body.classList.add("shake");
                $body.addEventListener('animationend', () => {
                    $body.classList.remove('shake');
                }, { once: true });
                document.getElementById("modal-title").textContent = "Attention !";
                document.getElementById("modal-subtitle").textContent = "Vous n'avez pas pu vous inscrire.";
                const $modalMessage = document.getElementById("modal-message");
                if($modalMessage) {
                    $modalMessage.textContent = response;
                }
                openModal();
                return;
            }
            const newUser = new User(User.createId(response.username), response.username, response.email);
            const addResponse = addUser(newUser, response.passwords);
            if(typeof addResponse === "string") {
                const $body = document.querySelector("body");
                $body.classList.add("shake");
                $body.addEventListener('animationend', () => {
                    $body.classList.remove('shake');
                }, { once: true });
                const $modalMessage = document.getElementById("modal-message");
                if($modalMessage) {
                    document.getElementById("modal-title").textContent = "Attention !";
                    document.getElementById("modal-subtitle").textContent = "Vous n'avez pas pu vous inscrire.";
                    $modalMessage.textContent = addResponse;
                }
                openModal();
            } else {
                $form.reset()
                const $modalMessage = document.getElementById("modal-message");
                if($modalMessage) {
                    document.getElementById("modal-title").textContent = "Validation";
                    document.getElementById("modal-subtitle").textContent = "Vous avez réussi à vous inscrire.";
                    $modalMessage.textContent = "Vous allez être redirigé vers la page de connexion.";
                    document.getElementById("modal-close").style.display = "none";

                }
                openModal();
                redirect("login");
            }
        });
    }
}

export {load}