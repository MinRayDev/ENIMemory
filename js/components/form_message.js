function setMessage(id, message = "", type = "") {
    const $messageHolder = document.getElementById(`subto-${id}`);
    const $messageIcon = document.getElementById(`${id}-icon`);

    $messageHolder.classList.remove("error-message", "success-message");
    $messageIcon?.remove();
    if (type) {
        const iconSrc = type === "error" ? "error.svg" : "check.svg";
        $messageHolder.classList.add(`${type}-message`);
        $messageHolder.insertAdjacentHTML("beforebegin", `<img src="../assets/${iconSrc}" alt="${type}-svg" id="${id}-icon" draggable="false"/>`);
    }
    $messageHolder.textContent = message;
}

const setIdle = (id, message = "") => setMessage(id, message);
const setError = (id, message) => setMessage(id, message, "error")
const setSuccess = (id, message) => setMessage(id, message, "success")

export {
    setIdle,
    setError,
    setSuccess
}