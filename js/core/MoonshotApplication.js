class MoonshotApplication {

    /**
     * 
     */
    constructor() {
        this.gameLoopReference = null;
    }

    /**
     * 
     * @param {*} doneCallback 
     */
    start(doneCallback) {
        MoonshotApplication.INSTANCE = this;
        let dl = new DependencyLoader();
        dl.loadDependencies(() => {
            MoonshotApplication.INSTANCE.initComponents();
            MoonshotApplication.INSTANCE.ui.hideLoadingScreen();
            if (doneCallback) doneCallback();
            MoonshotApplication.INSTANCE.gameLoop();
        });
    }

    /**
     * 
     */
    initComponents() {
        this.baseRenderer = new BaseRenderer();
        this.ui = new UI();
        this.eventHandler = new EventHandler();
        this.eventHandler.init();
    }

    /**
     * 
     */
    getBaseRenderer() {
        return this.baseRenderer;
    }

    /**
     * 
     */
    gameLoop() {
        MoonshotApplication.INSTANCE.gameLoopReference = setTimeout(() => {

            // get input 

            // update game logic 

            // render stuff
            MoonshotApplication.INSTANCE.baseRenderer.render();

            requestAnimationFrame(MoonshotApplication.INSTANCE.gameLoop);

        }, 1000 / MoonshotApplication.TARGET_FPS)
    }

}

/**
 * 
 */
MoonshotApplication.INSTANCE = null;

/**
 * 
 */
MoonshotApplication.TARGET_FPS = 30;