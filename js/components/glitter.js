function shake($node, type = "shake") {
    $node.classList.add(type);
    $node.addEventListener("animationend", () => {
        $node.classList.remove(type);
    }, { once: true });
}

export {
    shake
}