import {gameSets} from "../core/references.js";
import {computeGrid, onChange} from "../utils/toolbox.js";
import {editUser, getUserById} from "../core/users.js";
import {getId} from "../core/client.js";


/**
 * Loads a <select> element with game sets and a preview image.
 *
 * @param {string} defaultValue - The default value to set as selected in the dropdown.
 * @param {function|null} changeCallback - Optional callback function (change).
 * @returns {HTMLSelectElement} - Returns <select> element.
 */
function loadSetSelector(defaultValue, changeCallback) {
    const $setSelector = document.getElementById("set-selector");
    const $previewImage = document.getElementById("set-preview");

    for (const [key, value] of Object.entries(gameSets)) {
        const $option = document.createElement("option");
        $option.value = key;
        $option.textContent = value["displayName"];
        $setSelector.appendChild($option);
    }

    $setSelector.value = defaultValue;
    $previewImage.src = `../assets/cards/previews/${$setSelector.value}.png`;

    onChange($setSelector, () => {
        if (changeCallback) changeCallback($setSelector.value);
        $previewImage.src = `../assets/cards/previews/${$setSelector.value}.png`;
    });
    return $setSelector;
}

/**
 * Loads a <select> element with sizes.
 *
 * @param {boolean} [eventLoad=true] - If the function is called by an event listener or not.
 */
function loadSizeSelector(eventLoad = true) {
    const user = getUserById(getId());
    const $sizeSelector = document.getElementById("size-selector");
    const grid = computeGrid(gameSets[user.set].count * 2);

    $sizeSelector.innerHTML = "";
    grid.forEach(value => {
        const $option = document.createElement("option");
        $option.value = JSON.stringify(value);
        const sizeSupplement = value[2] > 0 ? ` (+${value[2]})` : "";
        $option.textContent = `${value[0]}x${value[1]}${sizeSupplement}`;
        $sizeSelector.appendChild($option);
    });

    if ((!user.size) || (!grid.includes(JSON.parse(user.size)))) {
        $sizeSelector.value = JSON.stringify(grid[0]);
        editUser(getId(), "size", $sizeSelector.value);
    }
    if (!eventLoad) {
        if (user.size) { $sizeSelector.value = user.size; }
        onChange($sizeSelector, () => editUser(getId(), "size", $sizeSelector.value));
    }
}

export  { loadSetSelector, loadSizeSelector }