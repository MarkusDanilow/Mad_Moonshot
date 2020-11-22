class Level {

    /**
     * 
     * @param {*} level 
     */
    constructor(level) {
        this.levelId = level;
        this.player = new Player();
        this.keysPressed = Array(256).fill(false);
        this.entityManager = new EntityManager(this);
        this.initConfiguration();
        this.stars = new StarGenerator(100, this.changeRate);
    }

    /**
     * 
     */
    initConfiguration() {
        let config = new LevelConfigurator().configure(this);
        for (let key in config) {
            this[key] = config[key];
        }
        this.respawnCountDown = this.respawnThreshold;
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
        for (let item in this.needsToCollect) {
            if (this.needsToCollect[item].amount > 0 && this.needsToCollect[item].required) {
                return false;
            }
        }
        return true;
    }

    /**
     * This must also be overridden by each level
     */
    levelLostCriteria() {
        return this.player.health <= 0;
    }

    /**
     * 
     */
    spawnNewEntity() {
        let keys = Object.keys(this.needsToCollect);
        let itemType = keys[Math.floor(Math.random() * keys.length)] + "Item";
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
        if (item.isDangerous()) {
            $('#rendering-canvas').effect("shake");
            MoonshotApplication.INSTANCE.getSounds().playExplosionSound();
            this.player.health -= item.damage;
        } else {
            MoonshotApplication.INSTANCE.getSounds().playCollectSound();
            let type = item.type;
            this.needsToCollect[type].amount--;
        }
    }

    /**
     * 
     */
    update() {
        this.updateSpawnCountDown();
        this.entityManager.update();
        this.stars.update();

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
        this.entityManager.render(ctx);
        this.player.render(ctx);
        this.stars.render(ctx);

        const font = "Lucida Console";
        const baseFontSize = 25;

        ctx.fillStyle = "#fff";
        ctx.font = baseFontSize + "px " + font;
        ctx.fillText("Level " + this.levelId, 10, 30);
        ctx.font = (baseFontSize - 5) + "px " + font;
        let i = 1;
        for (let item in this.needsToCollect) {
            if (this.needsToCollect[item].required) {
                let amount = this.needsToCollect[item].amount;
                ctx.fillText(item + "s: " + amount, 10, 45 + (i * 30));
                i++;
            }
        }

        ctx.fillStyle = "#0af";
        ctx.fillText("Health: " + this.player.health, TransformationUtil.TARGET_RES.width - 200, 75);

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
        this.stars = null;
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