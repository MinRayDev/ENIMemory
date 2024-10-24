/**
 * Gets the name of the currently loaded HTML file.
 *
 * Solution inspired by: https://stackoverflow.com/questions/16611497/how-can-i-get-the-name-of-an-html-page-in-javascript
 *
 * @returns {string} The name of the currently loaded HTML file.
 *
 * @example
 * // If the current URL is 'http://example.com/index.html'
 * const fileName = getCurrentHtml(); // Returns 'index'
 */
function getCurrentHtml() {
    return window.location.pathname.split("/").pop().split(".").slice(0, -1).join(".");
}

function redirect(page) {
    window.location.href = `./${page}.html`;
}

function computeGrid(length) {
    // Mental breakdown (took me 1h)
    const results = [];
    const minX = 2;
    const minY = 2;
    // Avoiding overflows and underflows (i don't want more than 6 columns per row)
    const maxX = Math.min(Math.max(length / minX, minX), 6);

    for (let i = minX; i <= maxX; i++) {
        for (let j = minY; j <= length / minY; j++) {
            const x = Math.max(Math.min(i, length - j), minX);
            const y = Math.max(Math.min(j, length - i), minY);
            const factor = length - (x * y);
            if (factor >= 0 && factor < x && y <= length/3) {
                results.push([x, y, factor]);
            }
        }
    }
    return results;
}


export {
    getCurrentHtml,
    redirect,
    computeGrid
}
