class Entity {

    constructor() {
        this.position = { x: 0, y: 0 };
        this.size = { width: 0, height: 0 };
        this.fillColor = "white";
        this.speed = 0;
        this.textures = [];
        this.selectedTexture = -1;
        this.rotationAngle = 0;

        let r = MoonshotApplication.INSTANCE.randomInt(0, 10);
        this.rotationMultiplier = r < 5 ? -1 : 1;
    }

    selectRandomTexture() {
        this.selectedTexture = MoonshotApplication.INSTANCE.randomInt(0, this.textures.length);
    }

    toRectangle() {
        return {
            left: this.position.x,
            right: this.position.x + this.size.width,
            top: this.position.y,
            bottom: this.position.y + this.size.height
        };
    }

    getCenter() {
        return {
            x: this.position.x + this.size.width / 2,
            y: this.position.y + this.size.height / 2
        }
    }

    render(ctx) {
        let screenPos = this.getScreenPos();
        let screenSize = this.getScreenSize();

        let angleInRadians = (this.rotationAngle * Math.PI) / 180.0 * this.rotationMultiplier;
        ctx.translate(screenPos.x, screenPos.y);
        ctx.rotate(angleInRadians);

        if (this.textures && this.textures.length > 0 && this.selectedTexture > -1) {
            ctx.drawImage(this.textures[this.selectedTexture], -screenSize.width / 2, -screenSize.height / 2, screenSize.width, screenSize.height);
        } else {
            ctx.fillStyle = this.fillColor;
            ctx.fillRect(0, 0, screenSize.width, screenSize.height);
        }

        ctx.rotate(-angleInRadians);
        ctx.translate(-screenPos.x, -screenPos.y);

    }

    getScreenSize() {
        return MoonshotApplication.INSTANCE.getTransform().convertWorldToPixelSize(this.size);
    }

    getScreenPos() {
        return MoonshotApplication.INSTANCE.getTransform().convertWorldToPixelCoords(this.position);
    }

    update() {}

    getDelta() {
        let timer = MoonshotApplication.INSTANCE.getTimer();
        return timer.getDelta();
    }

    checkPositionX() {
        if (this.position.x < TransformationUtil.WORLD_BOUNDS.min_x)
            this.position.x = TransformationUtil.WORLD_BOUNDS.min_x;
        else if (this.position.x > TransformationUtil.WORLD_BOUNDS.max_x - this.size.width)
            this.position.x = TransformationUtil.WORLD_BOUNDS.max_x - this.size.width;
    }

    moveLeft() {
        this.position.x -= this.speed * this.getDelta();
        this.checkPositionX();
    }

    moveRight() {
        this.position.x += this.speed * this.getDelta();
        this.checkPositionX();
    }

    moveUp(delta) {
        this.position.y -= delta;
    }

    moveDown(delta) {
        this.position.y += delta;
    }

    isOutOfBoundsY() {
        return (this.position.y < TransformationUtil.WORLD_BOUNDS.min_y - this.size.height ||
            this.position.y > TransformationUtil.WORLD_BOUNDS.max_y);
    }

    collidesWith(entity) {
        if (entity && entity.position && entity.size) {
            let r1 = this.toRectangle();
            let r2 = entity.toRectangle();
            return MoonshotApplication.INSTANCE.getTransform().intersectRect(r1, r2);
        }
        return false;
    }

}