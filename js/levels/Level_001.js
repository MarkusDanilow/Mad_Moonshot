class Level_001 extends Level {

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
        this.respawnThreshold = 2000;
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

}