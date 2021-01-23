class EntityManager {

    constructor(level) {
        this.entities = [];
        this.particles = [];
        this.levelReference = level;
    }

    /**
     * 
     */
    createEntity(type = null, position = null, size = null) {
        if (!type) return;
        let entity = eval(`new ${type}()`);
        if (!entity.size) {
            if (!size) {
                entity.size = { width: 0.05, height: 0.05 * TransformationUtil.TARGET_RES_RATIO };
            } else {
                entity.size = size;
            }
        }
        if (!position) {
            entity.position.y = TransformationUtil.WORLD_BOUNDS.min_y;
            entity.position.x = Math.random() * 2 - TransformationUtil.WORLD_BOUNDS.max_x;
        } else {
            entity.position = position;
        }
        if (entity.position.x >= TransformationUtil.WORLD_BOUNDS.max_x - entity.size.width) {
            entity.position.x = TransformationUtil.WORLD_BOUNDS.max_x - entity.size.width;
        }
        this.entities.push(entity);
    }

    render(ctx) {
        if (!ctx) return;
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].render(ctx);
        }
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].render(ctx);
        }
    }

    update() {
        let delta = this.levelReference.getChangeForCurrentTick();
        let player = this.levelReference.player;
        for (let i = this.entities.length - 1; i >= 0; i--) {
            this.entities[i].update();
            if (!this.entities[i].isFixed) {
                this.entities[i].moveDown(delta);
            }
            let collected = player.collidesWith(this.entities[i]);
            // collection logic
            if (collected) {
                this.levelReference.collect(this.entities[i]);
                this.particles.push(
                    new ParticleSystem(player.getCenter(), 12, 450,
                        MadColor.fromString(this.entities[i].fillColor))
                );
            }
            if (this.entities[i].isOutOfBoundsY() || collected) {
                this.entities.splice(i, 1);
            }
        }
        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].update();
            if (this.particles[i].isDone()) {
                this.particles.splice(i, 1);
            }
        }
    }


}