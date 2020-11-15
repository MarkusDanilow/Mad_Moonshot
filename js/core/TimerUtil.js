class TimerUtil {

    /**
     * 
     */
    constructor() {
        this.now = this.getNow();
        this.delta = 0;
    }

    /**
     * 
     */
    update() {
        let now = this.getNow();
        this.delta = now - this.now;
        this.now = now;
    }

    /**
     * 
     */
    getDelta() {
        return this.delta / TimerUtil.DELTA_TICK_MODIFIER;
    }

    /**
     * 
     */
    getDeltaRaw() {
        return this.delta;
    }

    /**
     * 
     */
    getNow() {
        return Date.now();
    }

}

/**
 * 
 */
TimerUtil.DELTA_TICK_MODIFIER = 100;