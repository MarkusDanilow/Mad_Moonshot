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

        $('#story-next').click((e) => {
            let game = MoonshotApplication.INSTANCE;
            if (game.tryAgain) {
                game.switchToGameplay();
            } else {
                game.nextDialog();
            }
        });
    }

}