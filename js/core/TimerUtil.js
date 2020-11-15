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
        console.log(now, this.now);
        this.delta = now - this.now;
        this.now = now;
    }

    /**
     * 
     */
    getDelta() {
        return this.delta;
    }

    /**
     * 
     */
    getNow() {
        return Date.now();
    }

}