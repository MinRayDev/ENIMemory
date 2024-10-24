function shake($node, type = "shake") {
    if (!$node) {
        return;
    }
    $node.classList.add(type);
    $node.addEventListener("animationend", () => {
        $node.classList.remove(type);
    }, { once: true });
}

export { shake };
