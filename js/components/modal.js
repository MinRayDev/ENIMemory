function openModal(title, subtitle, message, closeButton = "", buttonAction = null) {
    const button = closeButton ? `<button id="modal-close">${closeButton}</button>` : ""
    const modalHTML = `
    <div class="modal-container">
        <section class="modal">
            <div class="modal-content">
                <h1 id="modal-title">${title}</h1>
                <p id="modal-subtitle">${subtitle}</p>
                <p id="modal-message">${message}</p>
                ${button}
            </div>
        </section>
    </div>
    `;
    const mainElement = document.querySelector('main');
    if (mainElement) {
        mainElement.insertAdjacentHTML('beforebegin', modalHTML);
    }
    const $modal = document.querySelector(".modal")
    $modal.parentElement.style.display = "flex";
    $modal.classList.remove("hide");
    if (closeButton.length > 0 && buttonAction) {
        document.querySelector("#modal-close").addEventListener("click", buttonAction, {once: true});
    }
    setTimeout(() => {
        document.querySelector(".modal").classList.add("show");
    }, 10)
}

function closeModal() {
    const $modal = document.querySelector(".modal")
    $modal.classList.remove("show");
    $modal.classList.add("hide");
    setTimeout(() => {
        $modal.parentElement.style.display = "none";
    }, 500);
}

export {
    openModal,
    closeModal
}