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
        entity.position.y = TransformationUtil.WORLD_BOUNDS.min_y;
        entity.position.x = Math.random() * 2 - 1;
        entity.size = { width: 0.015, height: 0.015 };
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
        for (let i = this.entities.length - 1; i >= 0; i--) {
            this.entities[i].moveDown(delta);
            if (this.entities[i].isOutOfBoundsY()) {
                this.entities.splice(i, 1);
            }
        }
    }


}