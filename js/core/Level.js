class Level {

    /**
     * 
     * @param {*} level 
     */
    constructor(level) {
        this.levelId = level;
        this.levelOffset = { x: 0, y: 0 };
        this.speed = 3 * level;

        this.player = new Player();

    }

    /**
     * 
     */
    update() {
        let deltaOffset = this.speed * MoonshotApplication.INSTANCE.getTimer().getDelta();
        this.levelOffset.y += deltaOffset;
    }

    /** 
     * 
     */
    render(ctx) {
        if (!ctx) return;
        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("Level " + this.levelId, 10, 30);
        this.player.render(ctx);
    }

}