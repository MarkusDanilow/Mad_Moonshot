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
        $('#story-next').click((e) => {
            MoonshotApplication.INSTANCE.nextDialog();
        });
    }

}