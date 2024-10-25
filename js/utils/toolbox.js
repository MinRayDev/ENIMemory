/**
 * Gets the name of the currently loaded HTML file.
 *
 * Solution inspired by: https://stackoverflow.com/questions/16611497/how-can-i-get-the-name-of-an-html-page-in-javascript
 *
 * @returns {string} The name of the currently loaded HTML file.
 *
 * @example
 * // If the current URL is "https://example.com/index.html"
 * const fileName = getCurrentHtml(); // Returns "index"
 */
const getCurrentHtml = () => window.location.pathname.split("/").pop().split(".").slice(0, -1).join(".");

/**
 * Redirects to a page.
 *
 * @param {string} page - The name of the page (without ext).
 */
const redirect = (page) => window.location.href = `./${page}.html`;

/**
 * Computes mutiple way to organize elements through x columns and y rows with a remainder if needed.
 *
 * @param {number} length - Number of elements.
 * @returns {Array<[number, number, number]>} - Array of possible grid configurations ([columns (x), rows (y), remainder (factor)]).
 */
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

/**
 * @param {HTMLElement} $node - The DOM element to attach the event listener to.
 * @param {Function} action - The function to execute when the event is triggered.
 * @param {boolean} [once=false] - Whether the event listener should be removed after the first execution.
 */
const onClick = ($node, action, once = false) => $node.addEventListener("click", action, { once: once });
/**
 * @param {HTMLElement} $node - The DOM element to attach the event listener to.
 * @param {Function} action - The function to execute when the event is triggered.
 * @param {boolean} [once=false] - Whether the event listener should be removed after the first execution.
 */
const onChange = ($node, action, once = false) => $node.addEventListener("change", action, { once: once });
/**
 * @param {HTMLElement} $node - The DOM element to attach the event listener to.
 * @param {Function} action - The function to execute when the event is triggered.
 * @param {boolean} [once=false] - Whether the event listener should be removed after the first execution.
 */
const onInput = ($node, action, once = false) => $node.addEventListener("input", action, { once: once });
/**
 * @param {HTMLElement} $node - The DOM element to attach the event listener to.
 * @param {Function} action - The function to execute when the event is triggered.
 * @param {boolean} [once=true] - Whether the event listener should be removed after the first execution.
 */
const afterAnimation = ($node, action, once = true) => $node.addEventListener("animationend", action, { once: once });

/**
 * @param {HTMLElement} $node - The DOM element to attach the event listener to.
 * @param {Function} action - The function to execute when the event is triggered.
 * @param {boolean} [once=false] - Whether the event listener should be removed after the first execution.
 */
function onSubmit($node, action, once = false) {
    $node.addEventListener("submit", (event) => {
        event.preventDefault();
        action();
    }, { once: once });
}

/**
 * @param {HTMLElement} $node - The DOM element to attach the event listener to.
 * @param {Function} action - The function to execute when the event is triggered.
 * @param {Array<string>} keys - The keys to listen to.
 * @param {boolean} [once=false] - Whether the event listener should be removed after the first execution.
 */
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
