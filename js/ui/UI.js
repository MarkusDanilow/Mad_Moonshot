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
     * @param {*} fn 
     */
    showElement(el, fn) {
        if (el) el.fadeIn(UI.FADING_TIME, () => {
            if (fn) fn();
        });
    }

    /**
     * 
     * @param {*} el 
     * @param {*} fn 
     */
    hideElement(el, fn) {
        if (el) el.fadeOut(UI.FADING_TIMEE, () => {
            if (fn) fn();
        });
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

    /**
     * 
     * @param {*} message 
     */
    displayErroMessage(message) {
        this.hideDialogBox();
        let scope = this;
        this.hideElement($('#rendering-canvas'), () => {
            scope.showElement($('#error-box'));
            $('#error-box-text').text(message);
        });
    }

    /**
     * 
     */
    showMainMenu() {
        this.showElement($('#main-menu-container'));
    }

    /**
     * 
     */
    hideMainMenu() {
        this.hideElement($('#main-menu-container'));
    }

}

/**
 * 
 */
UI.FADING_TIME = 200;