class EntityManager {

    constructor(level) {
        this.entities = [];
        this.levelReference = level;
    }

    /**
     * 
     */
    createEntity(type = null) {
        if (!type) return;
        let entity = eval(`new ${type}()`);
        entity.size = { width: 0.05, height: 0.05 * TransformationUtil.TARGET_RES_RATIO };
        entity.position.y = TransformationUtil.WORLD_BOUNDS.min_y + entity.size.height * 2;
        entity.position.x = Math.random() * 2 - 1;
        entity.fillColor = "green";
        this.entities.push(entity);
    }

    render(ctx) {
        if (!ctx) return;
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].render(ctx);
        }
    }

    update() {
        let delta = this.levelReference.getChangeForCurrentTick();
        let player = this.levelReference.player;
        for (let i = this.entities.length - 1; i >= 0; i--) {
            this.entities[i].moveDown(delta);
            let collected = player.collidesWith(this.entities[i]);
            // collection logic
            if (collected) {
                this.levelReference.collect(this.entities[i]);
            }
            if (this.entities[i].isOutOfBoundsY() || collected) {
                this.entities.splice(i, 1);
            }
        }
    }


}