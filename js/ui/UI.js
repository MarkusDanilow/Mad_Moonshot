class UI {

    /**
     * 
     */
    constructor() {
        this.dialogAnimationInterval = null;
    }

    /**
     * 
     * @param {*} el 
     */
    showElement(el) {
        if (el) el.fadeIn(UI.FADING_TIME);
    }

    /**
     * 
     * @param {*} el 
     */
    hideElement(el) {
        if (el) el.fadeOut(UI.FADING_TIME);
    }

    /**
     * 
     */
    hideLoadingScreen() {
        this.hideElement($('#loading-screen'));
    }

    /**
     * 
     */
    hideDialogBox() {
        this.hideElement($('#dialog-box'));
    }

    /**
     * 
     */
    showDialogBox() {
        this.showElement($('#dialog-box'));
    }

    /**
     * 
     */
    clearDialogBox() {
        $('#dialog-box-text').text("");
    }

    /**
     * 
     * @param {*} text 
     */
    renderDialogText(text, renderTime = -1) {
        if (!text) return;
        this.clearDialogBox();
        let delta_i = renderTime > -1 ? (renderTime / text.length) : 20;
        let scope = this;
        this.dialogAnimationInterval = setInterval(() => {
            let currentText = $('#dialog-box-text').text();
            let newText = text.substr(0, currentText.length + 1);
            $('#dialog-box-text').text(newText);
            if (newText.length >= text.length) {
                scope.resetDialogAnimation();
            }
        }, delta_i);
    }

    /**
     * 
     */
    resetDialogAnimation() {
        clearInterval(this.dialogAnimationInterval);
    }

}

/**
 * 
 */
UI.FADING_TIME = 200;