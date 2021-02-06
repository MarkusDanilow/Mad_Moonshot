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
        this.fullscreenEnabled = true;
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
            MoonshotApplication.INSTANCE.textureLoader.loadTextures(() => {
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
        this.textureLoader = new TextureManager();
    }

    /**
     * 
     */
    gotoMainMenu(startBgMusic = true, playEndScreen = false) {
        let scope = this;
        this.ui.hideElement($('#loading-done-screen'));
        this.ui.hideElement($('#escape-btn'));
        this.ui.hideElement($('.rendering-canvas'));
        this.hideDialogBox();
        scope.gameplayEnabled = false;
        if (startBgMusic) {
            this.sounds.playBackgroundMusic_Quiet();
        }
        let showMainMenuFn = function() {
            scope.ui.showMainMenu();
        }
        if (playEndScreen) {
            scope.sounds.playLaunchSound();
            setTimeout(() => {
                let ship = $('.space-ship');
                ship.animate({ 'margin-top': $(window).height() + 100 }, 0).show();
                ship.animate({ 'margin-top': -500 }, 5000);
                setTimeout(() => {
                    showMainMenuFn();
                }, 5000);
            }, 500);
        } else {
            showMainMenuFn();
        }
    }

    /**
     * 
     */
    startGameFromMainMenu(levelIndex = 0) {
        if (this.level < 0) return;
        this.ui.hideMainMenu();
        setTimeout(() => {
            this.ui.showElement($('#escape-btn'));
            this.levelIndex = levelIndex;
            this.storyModule.entryIndex = MoonshotStory.LevelStoryMapping[levelIndex];
            this.storyModule.continueAfterBreakpoint();
            this.ui.toggleDialogButtons(false);
            MoonshotApplication.INSTANCE.gameLoop();
            MoonshotApplication.INSTANCE.startStoryTelling();
        }, 3000);
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
            let nextStoryEntry = this.storyModule.next();
            console.log(nextStoryEntry);
            if (nextStoryEntry <= -512) {
                // end  => so we return to the start screen 
                this.gotoMainMenu(false, true);
            } else {
                this.ui.renderDialogText(nextStoryEntry);
                if (this.storyModule.isEndReached()) {
                    this.ui.toggleDialogButtons(true);
                } else {
                    this.ui.toggleDialogButtons(false);
                }
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
        this.ui.showElement($('.rendering-canvas'));
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
        if (this.level) {
            this.level.unregisterGameplayEvents();
        }
        this.level = null;

        this.ui.hideElement($('.rendering-canvas'));
        this.showDialogBox();

        if (moveOnInStory) {
            this.tryAgain = false;
            this.storyModule.continueAfterBreakpoint();
            // this.ui.renderDialogText("Great, you did it!");
            this.nextDialog();
        } else {
            this.tryAgain = true;
            this.ui.renderDialogText("I must be more careful next time!");
        }
    }

    /**
     * 
     * @param {*} min 
     * @param {*} max 
     */
    randomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min))
    }

    /**
     * 
     * @param {*} min 
     * @param {*} max 
     */
    randomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }


}

/**
 * 
 */
MoonshotApplication.INSTANCE = null;

/**
 * 
 */
MoonshotApplication.TARGET_FPS = 120;