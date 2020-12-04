class LevelConfigurator {

    /**
     * 
     * @param {*} levelIndex 
     */
    configure(level) {
        let scope = this;

        let levelIndex = level.levelId;

        //const changeRate = Math.pow(Math.log10(level.levelId + 1), 2) / 1.5;
        const changeRate = (Math.log(10 * (levelIndex * levelIndex))) / 50;
        level.player.speed = changeRate * 0.9;

        let config = {
            eventHandlers: scope.baseEventHandlers,
            changeRate: changeRate,
            respawnThreshold: 250 / Math.sqrt(changeRate),
            eventHandlers: {
                37: function(e) {
                    level.player.moveLeft();
                },
                39: function(e) {
                    level.player.moveRight();
                }
            },
            needsToCollect: {}
        };

        config.needsToCollect["Screw"] = {
            amount: Math.floor(levelIndex * 5 * 1.1),
            required: true
        };

        config = this.configureEventHandlers(config, level);
        config = this.configureCollectableItems(config, level);

        return config;
    }

    /**
     * 
     * @param {*} config 
     * @param {*} level 
     */
    configureEventHandlers(config, level) {
        if (!config) return;
        switch (level.levelId) {
            case 1:
                break;
        }
        return config;
    }

    /**
     * 
     * @param {*} config 
     * @param {*} level 
     */
    configureCollectableItems(config, level) {
        if (!config) return config;
        if (!level || !ItemCollectionConstants.items[level.levelId]) return config;
        config.needsToCollect = {};
        for (let item in ItemCollectionConstants.items[level.levelId]) {
            config.needsToCollect[item] = {};
            for (let i in ItemCollectionConstants.items[level.levelId][item])
                config.needsToCollect[item][i] = ItemCollectionConstants.items[level.levelId][item][i];
        }
        config.startupItems = ItemCollectionConstants.StartupItems[level.levelId];
        return config;
    }

}