class EventHandler {

    /**
     * 
     */
    init() {
        $(window).resize(() => {
            MoonshotApplication.INSTANCE.getTransform().calcScreenSize();
            MoonshotApplication.INSTANCE.getBaseRenderer().initCanvasSize();
        });
        this.initClickEvents();
    }

    /**
     * 
     */
    initClickEvents() {

        $('#error-hint-reload').click((e) => {
            window.location.reload();
        });

        $('#to-main-menu-from-loading').click((e) => {
            MoonshotApplication.INSTANCE.gotoMainMenu();
        });

        $('#escape-btn').click((e) => {
            MoonshotApplication.INSTANCE.gotoMainMenu(false);
        });

        $('#story-next').click((e) => {
            let game = MoonshotApplication.INSTANCE;
            if (game.tryAgain) {
                game.switchToGameplay();
            } else {
                game.nextDialog();
            }
        });

        $('#start-game-btn').click((e) => {
            MoonshotApplication.INSTANCE.startGameFromMainMenu();
        });

        $('#show-credits-btn').click((e) => {
            let ui = MoonshotApplication.INSTANCE.getUI();
            // $('#credits-text-container').stop().animate({ top: $(window).height() });
            ui.hideElement($('#menu-level-0'), () => {
                ui.showElement($('#menu-level-1_credits'));
                //  $('#credits-text-container').stop().animate({ top: -500 }, 5000);
            });
        });

        $('#show-levels-btn').click((e) => {
            let ui = MoonshotApplication.INSTANCE.getUI();
            ui.hideElement($('#menu-level-0'), () => {
                ui.showElement($('#menu-level-1_level-selection'));
                ui.generateLevelSelection();
            });

        });

        $('#back-to-main-menu').click((e) => {
            let ui = MoonshotApplication.INSTANCE.getUI();
            ui.hideElement($('#menu-level-1_level-selection'), () => {
                ui.showElement($('#menu-level-0'));
            });
        });

        $('#back-to-main-menu-credits').click((e) => {
            let ui = MoonshotApplication.INSTANCE.getUI();
            ui.hideElement($('#menu-level-1_credits'), () => {
                ui.showElement($('#menu-level-0'));
            });
        });

        $('#back-to-main-menu-from-game').click((e) => {
            let ui = MoonshotApplication.INSTANCE.getUI();
            ui.hideDialogBox();
            ui.showMainMenu();
        });

    }

}