/**
 * Sets a message and optional icon in a container based on the type. If the type is not given, the message will be displayed without an icon.
 *
 * @param {string} id - ID to locate the message and icon elements.
 * @param {"" | "error" | "success"} message - Message to display.
 * @param {string} [type=""] - Message type ("error" or "success") for styling.
 */
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

/**
 * Sets an idle message using the setMessage function.
 *
 * @param {string} id - ID to locate the message element.
 * @param {string} [message=""] - The idle message to display.
 *
 */
const setIdle = (id, message = "") => setMessage(id, message);

/**
 * Sets an error message using the setMessage function.
 *
 * @param {string} id - ID to locate the message element.
 * @param {string} message - The error message to display.
 */
const setError = (id, message) => setMessage(id, message, "error")
/**
 * Sets a success message using the setMessage function.
 *
 * @param {string} id - ID to locate the message element.
 * @param {string} message - The error message to display.
 */
const setSuccess = (id, message) => setMessage(id, message, "success")

/**
 * Updates the background color of score indicators based on the given score.
 *
 * @param {1 | 2 | 3} score - The current score.
 */
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