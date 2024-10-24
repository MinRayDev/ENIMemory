/**
 * Gets the name of the currently loaded HTML file.
 *
 * Solution inspired by: https://stackoverflow.com/questions/16611497/how-can-i-get-the-name-of-an-html-page-in-javascript
 *
 * @returns {string} The name of the currently loaded HTML file.
 *
 * @example
 * // If the current URL is 'https://example.com/index.html'
 * const fileName = getCurrentHtml(); // Returns 'index'
 */
const getCurrentHtml = () => window.location.pathname.split("/").pop().split(".").slice(0, -1).join(".");

const redirect = (page) => window.location.href = `./${page}.html`;

function computeGrid(length) {
    // Mental breakdown (took me 1h)
    const results = [];
    const minX = 2;
    const minY = 2;
    // Avoiding overflows and underflows (i don't want more than 6 columns per row)
    const maxX = Math.min(Math.max(length / minX, minX), 6);
    const maxY = Math.floor(length / minY)

    // Columns
    for (let i = minX; i <= maxX; i++) {
        // Rows
        for (let j = minY; j <= maxY; j++) {
            // Compute x & y (> 2)
            const x = Math.max(Math.min(i, length - j), minX);
            const y = Math.max(Math.min(j, length - i), minY);

            // Compute factor (+z) (Rest, if length = 5, will be [2, 2, 0])
            const factor = length - (x * y);

            // Keep it only if factor is positive and smaller than x and y smaller than a bound (to avoid 2 giants columns)
            if (factor >= 0 && factor < x && y <= length / 3) {
                results.push([x, y, factor]);
            }
        }
    }

    return results;
}

const onClick = ($node, action, once = false) => $node.addEventListener("click", action, { once: once });
const onChange = ($node, action, once = false) => $node.addEventListener("change", action, { once: once });
const onInput = ($node, action, once = false) => $node.addEventListener("input", action, { once: once });
const afterAnimation = ($node, action, once = true) => $node.addEventListener("animationend", action, { once: once });

function onSubmit($node, action, once = false) {
    $node.addEventListener("submit", (event) => {
        event.preventDefault();
        action();
    }, { once: once });
}

function onPress($node, keys, action, once = false) {
    const keyCodes = keys.map(key => key.toUpperCase());
    $node.addEventListener("keydown", (event) => {
        if (keyCodes.includes(event.code.toUpperCase())) {
            event.preventDefault();
            action();
        }
    }, { once: once });
}

export {
    getCurrentHtml,
    redirect,
    computeGrid,
    onClick,
    onChange,
    onInput,
    afterAnimation,
    onSubmit,
    onPress,
}
