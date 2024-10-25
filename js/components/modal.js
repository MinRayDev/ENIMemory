import { onClick } from "../utils/toolbox.js";

/**
 * Opens a modal.
 *
 * @param {string} title - The title of the modal.
 * @param {string} subTitle - The subtitle (below the title).
 * @param {string} message - The main message of the modal.
 * @param {string} [buttonName=""] - Optional button text. If empty, no button is displayed.
 * @param {function|null} [buttonAction=null] - Optional function executed when the button is clicked.
 *
 */
function openModal(title, subTitle, message, buttonName = "", buttonAction = null) {
    const buttonHTML = buttonName ? `<button id="modal-close">${buttonName}</button>` : "";
    const modalHTML = `
    <div class="modal-container">
        <section class="modal">
            <div class="modal-content">
                <h1 id="modal-title">${title}</h1>
                <p id="modal-subtitle">${subTitle}</p>
                <p id="modal-message">${message}</p>
                ${buttonHTML}
            </div>
        </section>
    </div>
    `;

    const $main = document.querySelector('main');
    if ($main) {
        $main.insertAdjacentHTML('beforebegin', modalHTML);
        const $modal = document.querySelector(".modal");
        $modal.parentElement.style.display = "flex";
        if (buttonName && buttonAction) {
            onClick(document.querySelector("#modal-close"), buttonAction, true)
        }

        setTimeout(() => {
            $modal.classList.add("show");
        }, 10);
    }
}

/**
 * Closes the current modal and remove it.
 */
function closeModal() {
    const $modal = document.querySelector(".modal");
    if (!$modal) {
        return;
    }
    $modal.classList.replace("show", "hide");
    setTimeout(() => {
        $modal.parentElement.remove();
    }, 500);
}

function timedModal(title, subTitle, message, action, timeOut = 1, delay = 1) {
    openModal(
        title,
        subTitle,
        message.replace("%start%", timeOut + 1),
    );

    const $modalMessage = document.getElementById("modal-message");
    const intervalId = setInterval(() => {
        $modalMessage.textContent = message.replace("%start%", timeOut);
        timeOut--;
        if (timeOut < 0) {
            clearInterval(intervalId);
            action();
        }
    }, delay * 1000);
}

export {
    openModal,
    closeModal,
    timedModal
};
