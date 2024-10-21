import {loadConfig} from "../utils/config.js";

function load() {
    const $elements = document.querySelectorAll("main .config-load");
    loadConfig().then(config => {
        if(!config) { return; }
        $elements.forEach(($element) => {
            const configValue = config[$element.id];
            $element.classList.remove("hide");
            if(typeof configValue === "string") {
                if($element.id.includes("image")) {
                    $element.src = configValue;
                } else {
                    $element.innerHTML = configValue;
                }
            } else {
                for(let listObject of configValue) {
                    $element.insertAdjacentHTML("beforeend", `<li>${listObject}</li>`)
                }
            }
        })
    });
}

export {
    load
}