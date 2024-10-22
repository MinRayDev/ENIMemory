import {checkEmail, checkPassword, checkPasswords, checkRegister, checkUsername} from "../utils/checker.js";
import {openModal} from "../utils/modal.js";


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
        if (((typeof value === "string") && value.length === 0) || value == null) {
            console.log("test");
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
            const $modal = document.querySelector(".modal")
            $modal.classList.remove("show");
            $modal.classList.add("hide");
            setTimeout(() => {
                $modal.parentElement.style.display = "none";
            }, 500);
        })
        $form.addEventListener("submit", function (event) {
            event.preventDefault();
            const response = checkRegister();
            if(response) {
                const $modalMessage = document.getElementById("modal-message");
                if($modalMessage) {
                    $modalMessage.textContent = response;
                }
                openModal();
            }
            // TODO: register
        });
    }
}

export {load}