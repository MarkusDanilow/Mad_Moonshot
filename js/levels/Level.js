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
        for (let startupItemKey in this.startupItems) {
            let item = this.startupItems[startupItemKey]
            for (let i = 0; i < item.amount; i++) {
                let position = item.positions[i];
                this.entityManager.createEntity(startupItemKey + "Item", position);
            }
        }
        // check for timer ==> time to survive
        if (config.timer && config.timer > 0) {

        }

        // store config in level instance
        this.config = config;
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
        if (this.config.timer) {
            return this.config.remainingTime <= 0;
        }
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
        let spawnableItems = [];
        let keys = Object.keys(this.needsToCollect);
        for (let i = 0; i < keys.length; i++) {
            if (!this.needsToCollect[keys[i]].fixed) {
                spawnableItems.push(keys[i]);
            }
        }
        if (spawnableItems.length > 0) {
            let itemType = spawnableItems[Math.floor(Math.random() * spawnableItems.length)] + "Item";
            this.entityManager.createEntity(itemType);
            this.respawnCountDown = this.respawnThreshold;
        }
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
        this.player.update();

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

        if (this.config.timer) {
            let delta = MoonshotApplication.INSTANCE.getTimer().getDeltaRaw() / 1000;
            this.config.remainingTime -= delta;
        }

    }

    /** 
     * 
     */
    render(ctx) {
        if (!ctx) return;
        this.stars.render(ctx);
        this.entityManager.render(ctx);
        this.player.render(ctx);

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
                ctx.fillText(item + "s: " + amount, 10, 105 + (i * 30));
                i++;
            }
        }

        // render timer if needed
        if (this.config.timer) {
            let time = Math.round(this.config.remainingTime);
            let minutes = Math.round(time / 60);
            let seconds = Math.round(time % 60);
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            ctx.fillText("Time remaining: " + minutes + ":" + seconds, 10, 75);
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