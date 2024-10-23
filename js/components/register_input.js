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
    $messageHolder.insertAdjacentHTML("beforebegin", `<img src="../assets/error.svg" alt="error-svg" id="${id}-icon"/>`)
}

function setSuccess(id, message) {
    setIdle(id)
    const $messageHolder = document.getElementById(`subto-${id}`);
    $messageHolder.textContent = message;
    $messageHolder.classList.add("success-message")
    $messageHolder.insertAdjacentHTML("beforebegin", `<img src="../assets/check.svg" alt="check-svg" id="${id}-icon"/>`)
}

export {
    setIdle,
    setError,
    setSuccess
}