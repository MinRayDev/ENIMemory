import { afterAnimation } from "../utils/toolbox.js";

function shake($node, type = "shake") {
    if (!$node) {
        return;
    }
    $node.classList.add(type);
    afterAnimation($node, () => $node.classList.remove(type));
}

export { shake };
