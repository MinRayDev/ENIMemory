function openModal(title, subTitle, message, buttonName = "", buttonAction = null) {
    console.log("First message", message)
    const button = buttonName ? `<button id="modal-close">${buttonName}</button>` : ""
    const modalHTML = `
    <div class="modal-container">
        <section class="modal">
            <div class="modal-content">
                <h1 id="modal-title">${title}</h1>
                <p id="modal-subtitle">${subTitle}</p>
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
    if (buttonName.length > 0 && buttonAction) {
        document.querySelector("#modal-close").addEventListener("click", buttonAction, {once: true});
    }
    setTimeout(() => {
        document.querySelector(".modal").classList.add("show");
    }, 10)
}

function closeModal() {
    const $modal = document.querySelector(".modal");
    $modal.classList.remove("show");
    $modal.classList.add("hide");
    setTimeout(() => {
        $modal.parentElement.remove();
    }, 500);
}

function timedModal(title, subTitle, message, action, timeOut = 1, delay = 1) {
    openModal(
        title,
        subTitle,
        message.replace("%start%", timeOut+1),
    );
    const intervalId = setInterval(() => {
        const $modalMessage = document.getElementById("modal-message")
        $modalMessage.textContent = message.replace("%start%", timeOut);
        timeOut--;
    }, delay*1000)
    setTimeout(() => { clearInterval(intervalId); action()}, (timeOut+1) * 1000);
}

export {
    openModal,
    closeModal,
    timedModal
}