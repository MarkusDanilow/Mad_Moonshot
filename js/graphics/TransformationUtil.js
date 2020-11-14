class TransformationUtil {

    constructor() {
        this.calcScreenSize();
        // we only allow landscape mode - quit when in portrait mode
        /*
        if (this.screenSize.height > this.screenSize.width) {
            MoonshotApplication.INSTANCE.setError("Your screen resolution must be in landscape mode, not in portrait mode! Game cannot be started!", true);
        }
        */
    }

    /**
     * 
     */
    calcScreenSize() {
        this.screenSize = { width: $(window).width(), height: $(window).height() };
        this.resolutionRatio = this.screenSize.width / this.screenSize.height;
    }

    /**
     * 
     */
    scaleCanvas(canvas) {
        if (!canvas) {
            MoonshotApplication.INSTANCE.setError("Canvas cannot be NULL! Game cannot be started!", true);
        }
        let rawCanvas = canvas[0];
        let finalRes = { width: TransformationUtil.TARGET_RES.width, height: TransformationUtil.TARGET_RES.height };
        if (finalRes.width > this.screenSize.width - 2 * TransformationUtil.BORDER_OFFSET) {
            finalRes.width = this.screenSize.width - 2 * TransformationUtil.BORDER_OFFSET;
            finalRes.height = finalRes.width / TransformationUtil.TARGET_RES_RATIO;
        }
        if (finalRes.height > this.screenSize.height - 2 * TransformationUtil.BORDER_OFFSET) {
            finalRes.height = this.screenSize.height - 2 * TransformationUtil.BORDER_OFFSET;
            finalRes.width = this.screenSize.height * TransformationUtil.TARGET_RES_RATIO;
        }
        canvas.width(finalRes.width);
        canvas.height(finalRes.height);
        rawCanvas.width = TransformationUtil.TARGET_RES.width;
        rawCanvas.height = TransformationUtil.TARGET_RES.height;
        this.canvasSize = { width: finalRes.width, height: finalRes.height };
    }

    /**
     * 
     */
    getCanvasSize() {
        return this.canvasSize;
    }

}

/**
 * This is the default resolution we're developing this game for
 */
TransformationUtil.TARGET_RES = { width: 1024, height: 768 };

TransformationUtil.TARGET_RES_RATIO = TransformationUtil.TARGET_RES.width / TransformationUtil.TARGET_RES.height;

TransformationUtil.BORDER_OFFSET = 20;