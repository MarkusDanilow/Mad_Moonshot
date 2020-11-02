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
            }, 1000);
        });
    }

}

DependencyLoader.DependencyOrder = ["graphics", "ui", "events"];

DependencyLoader.BaseDirectory = "js/";
DependencyLoader.DependencyDirectories = {
    graphics: "graphics/",
    ui: "ui/",
    events: "events/"
};

DependencyLoader.DependencyModules = {
    graphics: ["BaseRenderer"],
    ui: ["UI"],
    events: ["EventHandler"]
}

DependencyLoader.DisplayInSidebar = [

]