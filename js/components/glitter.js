import { afterAnimation } from "../utils/toolbox.js";

/**
 * Shake animation to an element and removes it after.
 *
 * @param {HTMLElement} $node - The DOM element to apply the animation to.
 * @param {"shake" | "fast-shake"} [type="shake"] - The type of animation to apply.
 */
function shake($node, type = "shake") {
    if (!$node) {
        return;
    }
    $node.classList.add(type);
    afterAnimation($node, () => $node.classList.remove(type));
}

export { shake };
