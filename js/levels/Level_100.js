class Level_100 extends Level {

    constructor(level) {
        super(level);
        let scope = this;
        this.eventHandlers = {
            37: function(e) {
                scope.player.moveLeft();
            },
            39: function(e) {
                scope.player.moveRight();
            }
        };
    }

    update() {
        // ... custom update stuff
        super.update();
    }

    render(ctx) {
        // if (!ctx) return;
        super.render(ctx);
        // ... do custom rendering stuff for this particular level
    }

    levelLostCriteria() {
        return false;
    }

    levelWinCriteria() {
        return false;
    }

}