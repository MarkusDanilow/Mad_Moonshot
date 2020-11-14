class MoonshotApplication {

    /**
     * 
     */
    constructor() {
        this.gameLoopReference = null;
        this.gameplayEnabled = false;
        this.levelIndex = 0;
    }

    /**
     * 
     * @param {*} message 
     * @param {*} errorFlag 
     */
    setError(message = "", errorFlag = false) {
        this.errorMessage = message;
        this.errorFlag = errorFlag;
    }

    /**
     * 
     */
    hasError() {
        return this.errorFlag;
    }

    /**
     * 
     */
    printErrorAndQuit() {
        if (this.hasError()) {
            alert(this.errorMessage);
        }
    }

    /**
     * 
     * @param {*} doneCallback 
     */
    start(doneCallback) {
        MoonshotApplication.INSTANCE = this;
        let dl = new DependencyLoader();
        dl.loadDependencies(() => {
            MoonshotApplication.INSTANCE.setError(null, false);
            MoonshotApplication.INSTANCE.initComponents();
            if (MoonshotApplication.INSTANCE.errorFlag) {
                MoonshotApplication.INSTANCE.printErrorAndQuit();
            } else {
                if (doneCallback) doneCallback();
                MoonshotApplication.INSTANCE.ui.hideLoadingScreen();
                MoonshotApplication.INSTANCE.gameLoop();
                MoonshotApplication.INSTANCE.startStoryTelling();
            }
        });
    }

    /**
     * 
     */
    initComponents() {
        this.transform = new TransformationUtil();
        this.baseRenderer = new BaseRenderer();
        this.ui = new UI();
        this.eventHandler = new EventHandler();
        this.eventHandler.init();
        this.storyModule = new MoonshotStory();
        this.timer = new TimerUtil();
        this.level = null;
    }

    /**
     * 
     */
    showDialogBox() {
        this.ui.showDialogBox();
    }

    /**
     * 
     */
    hideDialogBox() {
        this.ui.hideDialogBox();
    }

    /**
     * 
     */
    nextDialog() {
        this.ui.resetDialogAnimation();
        if (this.storyModule.isBreakpoint()) {
            this.hideDialogBox();
            /*
            let gameplay = this.storyModule.switchToGameplay();
            gameplay();
            */
            this.switchToGameplay();
        } else {
            this.showDialogBox();
            this.ui.renderDialogText(this.storyModule.next());
        }
    }

    /**
     * 
     */
    startStoryTelling() {
        this.nextDialog();
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
    getUI() {
        return this.ui;
    }

    /**
     * 
     */
    getStoryModule() {
        return this.storyModule;
    }

    /**
     * 
     */
    getTimer() {
        return this.timer;
    }

    /**
     * 
     */
    getLevel() {
        return this.level;
    }

    /**
     * 
     */
    getTransform() {
        return this.transform;
    }

    /**
     * 
     */
    gameLoop() {

        let game = MoonshotApplication.INSTANCE;

        game.gameLoopReference = setTimeout(() => {

            game.timer.update();

            if (game.gameplayEnabled) {
                // get input 
                // update game logic 
                game.level.update();
            }

            // render stuff
            game.baseRenderer.render();

            requestAnimationFrame(game.gameLoop);

        }, 1000 / MoonshotApplication.TARGET_FPS)
    }

    /**
     * 
     */
    switchToGameplay() {
        this.levelIndex++;
        this.level = new Level(this.levelIndex);
        this.gameplayEnabled = true;
    }

    /**
     * 
     */
    startFirstLevel() {

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