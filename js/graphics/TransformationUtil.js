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

    /**
     * 
     */
    getWorldBoundsRange() {
        return {
            x: TransformationUtil.WORLD_BOUNDS.max_x - TransformationUtil.WORLD_BOUNDS.min_x,
            y: TransformationUtil.WORLD_BOUNDS.max_y - TransformationUtil.WORLD_BOUNDS.min_y
        };
    }

    /**
     * 
     * @param {*} worldCoords 
     */
    convertWorldToPixelCoords(worldCoords) {
        if (!worldCoords) return { x: 0, y: 0 };
        let wc = { x: worldCoords.x, y: worldCoords.y };
        wc.x += Math.abs(TransformationUtil.WORLD_BOUNDS.min_x);
        wc.y += Math.abs(TransformationUtil.WORLD_BOUNDS.min_y);
        let worldBoundsRatio = this.getWorldBoundsRange();
        let ratioX = TransformationUtil.TARGET_RES.width / worldBoundsRatio.x;
        let ratioY = TransformationUtil.TARGET_RES.height / worldBoundsRatio.y;
        return { x: wc.x * ratioX, y: wc.y * ratioY };
    }

    /**
     * 
     * @param {*} worldSize 
     */
    convertWorldToPixelSize(worldSize) {
        if (!worldSize) return { width: 0, height: 0 };
        let worldBoundsRatio = this.getWorldBoundsRange();
        let ws = { width: worldSize.width / worldBoundsRatio.x, height: worldSize.height / worldBoundsRatio.y };
        return { width: ws.width * TransformationUtil.TARGET_RES.width, height: ws.height * TransformationUtil.TARGET_RES.height };
    }

    /**
     * 
     * @param {*} r1 
     * @param {*} r2 
     */
    intersectRect(r1, r2) {
        // no horizontal overlap
        if (r2.left >= r1.right || r2.right <= r1.left) return false;
        // no vertical overlap
        if (r2.top >= r1.bottom || r2.bottom <= r1.top) return false;
        return true;
    }

}

/**
 * This is the default resolution we're developing this game for
 */
TransformationUtil.TARGET_RES = { width: 1024, height: 768 };

TransformationUtil.TARGET_RES_RATIO = TransformationUtil.TARGET_RES.width / TransformationUtil.TARGET_RES.height;

TransformationUtil.BORDER_OFFSET = 20;

TransformationUtil.WORLD_BOUNDS = { min_x: -1, max_x: 1, min_y: -1, max_y: 1 };