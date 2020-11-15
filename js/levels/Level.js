class Level {

    /**
     * 
     * @param {*} level 
     */
    constructor(level) {
        this.levelId = level;
        this.changeRate = 0.03 * level;
        this.player = new Player();
        this.keysPressed = Array(256).fill(false);
        this.respawnThreshold = 3000;
        this.respawnCountDown = this.respawnThreshold;
        this.entityManager = new EntityManager(this);
        this.initSpawnableItems();
    }

    initSpawnableItems() {
        let screwProtoType = new ScrewItem().type;
        this.spawnableItems = [screwProtoType];
        this.needsToCollect = {};
        for (let i = 0; i < this.spawnableItems.length; i++) {
            this.needsToCollect[this.spawnableItems[i]] = 10;
        }
    }

    /**
     * 
     */
    getChangeRate() {
        return this.changeRate;
    }

    /**
     * 
     */
    getChangeForCurrentTick() {
        return this.changeRate * this.getDelta();
    }

    /**
     * 
     */
    getDelta() {
        return MoonshotApplication.INSTANCE.getTimer().getDelta();
    }

    /**
     * 
     */
    getDeltaRaw() {
        return MoonshotApplication.INSTANCE.getTimer().getDeltaRaw();
    }

    /**
     * This must be overridden by each level
     */
    levelWinCriteria() {
        for (let index in this.needsToCollect) {
            if (this.needsToCollect[index] > 0) {
                return false;
            }
        }
        return true;
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
    spawnNewEntity() {
        let itemType = this.spawnableItems[Math.floor(Math.random()) * this.spawnableItems.length] + "Item";
        this.entityManager.createEntity(itemType);
        this.respawnCountDown = this.respawnThreshold;
    }

    /**
     * 
     */
    updateSpawnCountDown() {
        this.respawnCountDown -= this.getDeltaRaw();
        if (this.respawnCountDown <= 0) {
            this.spawnNewEntity();
        }
    }

    /**
     * 
     * @param {*} item 
     */
    collect(item) {
        let type = item.type;
        this.needsToCollect[type]--;
    }

    /**
     * 
     */
    update() {
        this.updateSpawnCountDown();
        this.entityManager.update();

        for (let i = 0; i < this.keysPressed.length; i++) {
            if (this.keysPressed[i]) {
                if (this.eventHandlers[i]) {
                    this.eventHandlers[i]();
                }
            }
        }

        if (this.levelLostCriteria()) {
            MoonshotApplication.INSTANCE.disableGameplay(false);
        }
        if (this.levelWinCriteria()) {
            MoonshotApplication.INSTANCE.disableGameplay(true);
        }
    }

    /** 
     * 
     */
    render(ctx) {
        if (!ctx) return;
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText("Level " + this.levelId, 10, 30);
        ctx.font = "15px Arial";
        for (let i = 0; i < this.spawnableItems.length; i++) {
            let itemType = this.spawnableItems[i];
            let left = this.needsToCollect[itemType];
            ctx.fillText(itemType + "s: " + left, 10, 30 + ((i + 1) * 25));
        }
        this.entityManager.render(ctx);
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