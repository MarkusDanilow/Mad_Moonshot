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
        let canvas = $('#main-menu-canvas')[0];
        canvas.width = TransformationUtil.TARGET_RES.width;
        canvas.height = TransformationUtil.TARGET_RES.height;
        let ctx = canvas.getContext("2d");
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    /**
     * 
     */
    hideMainMenu() {
        this.hideElement($('#main-menu-container'));
    }

    /**
     * 
     */
    generateLevelSelection() {
        let parent = $('#level-selection-container');
        parent.empty();
        let keys = Object.keys(MoonshotStory.LevelStoryMapping);
        for (let j in keys) {
            let i = parseInt(j);
            let levelCol = HtmlGenerator.generateDiv(parent, 'level-selection_level-' + i, 'col-12 col-sm-6 col-lg-4 text-center', true);
            let card = HtmlGenerator.generateDiv(levelCol, '', 'card m-3 level-card', true, { 'mad-level-index': i });
            let body = HtmlGenerator.generateDiv(card, '', 'card-body', true);
            let cardText = (i >= keys.length - 1) ? 'The End' : ('Level ' + (i + 1));
            HtmlGenerator.generateHeading(body, '', '', true, { type: 'h3', text: cardText });
            card.click(function(e) {
                let level = parseInt($(this).attr('mad-level-index'));
                MoonshotApplication.INSTANCE.startGameFromMainMenu(level);
            });
        }
    }

    toggleDialogButtons(isEnd = false) {
        if (isEnd) {
            $('#story-next').addClass("d-none");
            $('#back-to-main-menu-from-game').removeClass('d-none');
        } else {
            $('#story-next').removeClass("d-none");
            $('#back-to-main-menu-from-game').addClass('d-none');
        }
    }

}

/**
 * 
 */
UI.FADING_TIME = 200;