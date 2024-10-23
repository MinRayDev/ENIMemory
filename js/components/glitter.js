function shake($node) {
    $node.classList.add("shake");
    $node.addEventListener('animationend', () => {
        $node.classList.remove('shake');
    }, { once: true });
}

export {
    shake
}