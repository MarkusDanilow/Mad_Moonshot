class Entity {

    constructor() {
        this.position = { x: 0, y: 0 };
        this.size = { width: 0, height: 0 };
        this.fillColor = "white";
        this.speed = 0;
    }

    toRectangle() {
        return {
            left: this.position.x,
            right: this.position.x + this.size.width,
            top: this.position.y,
            bottom: this.position.y + this.size.height
        };
    }

    render(ctx) {
        ctx.fillStyle = this.fillColor;
        let screenPos = MoonshotApplication.INSTANCE.getTransform().convertWorldToPixelCoords(this.position);
        let screenSize = MoonshotApplication.INSTANCE.getTransform().convertWorldToPixelSize(this.size);
        ctx.fillRect(screenPos.x, screenPos.y, screenSize.width, screenSize.height);
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
        return (this.position.y < TransformationUtil.WORLD_BOUNDS.min_y + this.size.height ||
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