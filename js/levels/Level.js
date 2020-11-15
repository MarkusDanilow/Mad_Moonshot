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
        this.keysPressed = Array(256).fill(false);
    }

    /**
     * This must be overridden by each level
     */
    levelWinCriteria() {
        return false;
    }

    /**
     * This must also be overridden by each level
     */
    levelLostCriteria() {
        return false;
    }

    /**
     * 
     */
    update() {
        let deltaOffset = this.speed * MoonshotApplication.INSTANCE.getTimer().getDelta();
        this.levelOffset.y += deltaOffset;
        for (let i = 0; i < this.keysPressed.length; i++) {
            if (this.keysPressed[i]) {
                if (this.eventHandlers[i]) {
                    this.eventHandlers[i]();
                }
            }
        }
        if (this.levelLostCriteria()) {

        } else if (this.levelWinCriteria()) {

        }
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

    registerGameplayEvents() {
        let scope = this;
        $(window).keydown(function(e) {
            scope.keysPressed[e.which] = true;
        });
        $(window).keyup(function(e) {
            scope.keysPressed[e.which] = false;
        });
    }

    unregisterGameplayEvents() {
        $(window).unbind("keydown");
        $(window).unbind("keyup");
    }

}

/**
 * This creates a level dynamically by its level index
 * @param {integer} levelIndex 
 */
Level.createLevelByLevelIndex = function(levelIndex) {
    let normalizedIndex = (levelIndex).toString();
    let levelBaseName = "Level_";
    if (normalizedIndex.length < 2) normalizedIndex = "00" + normalizedIndex;
    else if (normalizedIndex.length < 3) normalizedIndex = "0" + normalizedIndex;
    else if (normalizedIndex.length > 3) return null;
    let levelName = levelBaseName + normalizedIndex;
    let levelInstance = eval("new " + levelName + "(" + levelIndex + ")");
    return levelInstance;
}