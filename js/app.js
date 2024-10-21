import {getCurrentHtml} from "./utils/toolbox.js";
import {load} from "./custom/index_page.js";


function init() {
    const currentHtml = getCurrentHtml();
    const $navSelect = document.getElementById(`nav-${currentHtml}`);
    if ($navSelect) {
        $navSelect.classList.add("selected");
    }
    switch (currentHtml) {
        case "index": {
            load()
        }
    }
}
document.addEventListener("DOMContentLoaded", init);