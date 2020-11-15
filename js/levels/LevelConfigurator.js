class LevelConfigurator {

    /**
     * 
     * @param {*} levelIndex 
     */
    configure(level) {
        let scope = this;

        const changeRate = Math.pow(Math.log10(level.levelId + 1), 2) / 2;

        let config = {
            eventHandlers: scope.baseEventHandlers,
            changeRate: changeRate,
            respawnThreshold: 1000 / Math.sqrt(changeRate),
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
        if (!config) return;
        config.needsToCollect = ItemCollectionConstants.items[level.levelId];
        return config;
    }

}