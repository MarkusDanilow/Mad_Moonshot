/**
 * 
 */
function DependencyLoader() {

    /**
     * 
     * @param {*} arr 
     * @param {*} callback 
     */
    this.loadMultipleScripts = function(arr, callback) {
        HtmlGenerator.generateComment($('head'), "the following scripts have been added automatically by the dependency loader", true);
        for (let k in arr) {
            HtmlGenerator.generateScript($('head'), '', '', true, { src: arr[k] + '?v=' + (Math.random().toString().substr(2)) });
        }
        if (callback) callback();
    }

    /**
     * 
     */
    this.loadDependencies = function(callback) {
        if (!callback) return;
        let scripts = [];
        for (let i = 0; i < DependencyLoader.DependencyOrder.length; i++) {
            let dependencyType = DependencyLoader.DependencyOrder[i];
            let directory = DependencyLoader.BaseDirectory + DependencyLoader.DependencyDirectories[dependencyType];
            let modules = DependencyLoader.DependencyModules[dependencyType];
            for (let j = 0; j < modules.length; j++) {
                let module = modules[j];
                let path = directory + module + ".js";
                scripts.push(path);
            }
        }
        this.loadMultipleScripts(scripts, () => {
            setTimeout(() => {
                callback();
            }, DependencyLoader.MIN_LOADING_TIMEOUT);
        });
    }

}

DependencyLoader.MIN_LOADING_TIMEOUT = 1000;

DependencyLoader.DependencyOrder = ["core", "graphics", "ui", "events", "story", "levels", "entities", "items"];

DependencyLoader.BaseDirectory = "js/";
DependencyLoader.DependencyDirectories = {
    core: "core/",
    graphics: "graphics/",
    ui: "ui/",
    events: "events/",
    story: "story/",
    levels: "levels/",
    entities: "entities/",
    items: "entities/items/"
};

DependencyLoader.DependencyModules = {
    core: ["TimerUtil", "SoundModule"],
    graphics: ["TransformationUtil", "TextureManager", "MadColor", "BaseRenderer", "ParticleSystem"],
    ui: ["UI"],
    events: ["EventHandler"],
    story: ["MoonshotStory"],
    levels: ["ItemCollectionConstants", "LevelConfigurator", "Level"],
    entities: ["EntityManager", "Entity", "Star", "Player"],
    items: ["Item", "ScrewItem", "BombItem", "FixWayPointItem"]
}