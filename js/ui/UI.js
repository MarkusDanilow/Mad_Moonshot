class UI {

    /**
     * 
     */
    hideLoadingScreen() {
        $('#loading-screen').fadeOut(UI.FADING_TIME);
    }

}

/**
 * 
 */
UI.FADING_TIME = 200;