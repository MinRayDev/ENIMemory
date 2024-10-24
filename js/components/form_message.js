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

function updateScoreDisplay(score) {
    ["weak-score", "medium-score", "strong-score"].forEach((id) => {
        const $score = document.getElementById(id);
        if ($score) {
            $score.style.backgroundColor = "var(--base)";
        }
    });
    if (score >= 1) document.getElementById("weak-score").style.backgroundColor = "var(--weak)";
    if (score >= 2) document.getElementById("medium-score").style.backgroundColor = "var(--medium)";
    if (score >= 3) document.getElementById("strong-score").style.backgroundColor = "var(--success)";
}

export {
    setIdle,
    setError,
    setSuccess,
    updateScoreDisplay
}