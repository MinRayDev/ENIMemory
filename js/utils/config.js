/**
 * Loads the configuration data from a JSON file.
 *
 * @returns {Promise<any|null>} A promise that resolves to the parsed configuration data, or null if there was an error loading the data.
 *
 * @throws {Error} Throws an error if the network response is not ok.
 *
 * @example
 * loadConfig().then(config => {
 *   if(!config) {
 *      console.log("Failed to load config data.")
 *   }
 *   console.log("Config data:", config);
 * });
 */
function loadConfig() {
    return fetch('./resources/data/config.json')
        .then(res => {
            if (!res.ok) { throw new Error(`Network response was not ok: ${res.statusText}`); }
            return res.json();
        })
        .then(data => { return data; })
        .catch(error => {
            console.error(`Error loading the JSON file: ${error}`);
            return null;
        });
}


export {
    loadConfig
}
