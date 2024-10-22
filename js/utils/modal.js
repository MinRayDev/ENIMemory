function openModal() {
    const $modal = document.querySelector(".modal")
    $modal.parentElement.style.display = "flex";
    $modal.classList.remove("hide");
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