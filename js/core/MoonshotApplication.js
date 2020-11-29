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
                    this.ui.showElement($('#loading-done-screen'));
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
        this.sounds = new SoundModule();
        this.level = null;
    }

    /**
     * 
     */
    gotoMainMenu(startBgMusic = true) {
        this.ui.hideElement($('#loading-done-screen'));
        this.ui.hideElement($('#escape-btn'));
        if (startBgMusic) {
            this.sounds.playBackgroundMusic();
        }
        this.ui.showMainMenu();
    }

    /**
     * 
     */
    startGameFromMainMenu(levelIndex = 0) {
        if (this.level < 0) return;
        this.ui.hideMainMenu();
        this.ui.showElement($('#escape-btn'));
        this.levelIndex = levelIndex;
        this.storyModule.entryIndex = MoonshotStory.LevelStoryMapping[levelIndex];
        this.storyModule.continueAfterBreakpoint();
        this.ui.toggleDialogButtons(false);
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
            if (this.storyModule.isEndReached()) {
                this.ui.toggleDialogButtons(true);
            } else {
                this.ui.toggleDialogButtons(false);
            }
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
    getSounds() {
        return this.sounds;
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
            this.ui.renderDialogText("Too bad, unfortunately you did not make it! Give it another try...");

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