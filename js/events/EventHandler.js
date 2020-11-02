class EventHandler {

    /**
     * 
     */
    init() {
        $(window).resize(() => {
            MoonshotApplication.INSTANCE.getBaseRenderer().initCanvasSize();
        });
    }

}