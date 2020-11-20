class MoonshotApplication {

    /**
     * 
     */
    constructor() {
        this.gameLoopReference = null;
        this.gameplayEnabled = false;
        this.levelIndex = 0;
        this.canStartGame = false;
        this.tryAgain = false;
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
            this.ui.displayErroMessage(this.errorMessage);
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
                if (MoonshotApplication.INSTANCE.canStartGame) {
                    MoonshotApplication.INSTANCE.startGameFromMainMenu();
                } else {
                    MoonshotApplication.INSTANCE.gotoMainMenu();
                }
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
    gotoMainMenu() {
        this.ui.showMainMenu();
    }

    /**
     * 
     */
    startGameFromMainMenu() {
        this.ui.hideMainMenu();
        MoonshotApplication.INSTANCE.gameLoop();
        MoonshotApplication.INSTANCE.startStoryTelling();
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
        if (this.storyModule.isBreakpoint() && !this.storyModule.canContinueFromBreakpoint()) {
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
                // update game logic 
                game.level.update();
            }

            // render stuff
            game.baseRenderer.render();

            if (game.hasError()) {
                clearTimeout(game.gameLoopReference);
                game.printErrorAndQuit();
            } else {
                requestAnimationFrame(game.gameLoop);
            }

        }, 1000 / MoonshotApplication.TARGET_FPS)
    }

    /**
     * 
     */
    switchToGameplay() {
        this.hideDialogBox();
        if (!this.tryAgain) {
            this.levelIndex++;
        }
        // this.level = Level.createLevelByLevelIndex(this.levelIndex);
        this.level = new Level(this.levelIndex);
        this.level.registerGameplayEvents();
        this.gameplayEnabled = true;
        this.tryAgain = false;
    }

    /**
     * 
     */
    disableGameplay(moveOnInStory = true) {
        this.gameplayEnabled = false;
        this.level.unregisterGameplayEvents();
        this.level = null;

        this.showDialogBox();

        if (moveOnInStory) {
            this.tryAgain = false;
            this.storyModule.continueAfterBreakpoint();
            this.ui.renderDialogText("Great, you did it!");
        } else {
            this.tryAgain = true;
            this.ui.renderDialogText("Too bad, unfortunately you did not make it!Give it another try...");

        }
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