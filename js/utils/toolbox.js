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


export {
    getCurrentHtml
}