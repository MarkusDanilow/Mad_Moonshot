class Entity {

    constructor() {
        this.position = { x: 0, y: 0 };
        this.size = { width: 0, height: 0 };
        this.fillColor = "white";
        this.speed = 0;
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
        return timer.getDelta() / 100;
    }

    checkPositionX() {
        if (this.position.x < TransformationUtil.WORLD_BOUNDS.min_x) this.position.x = TransformationUtil.WORLD_BOUNDS.min_x;
        else if (this.position.x > TransformationUtil.WORLD_BOUNDS.max_x - this.size.width * 2)
            this.position.x = TransformationUtil.WORLD_BOUNDS.max_x - this.size.width * 2;
    }

    moveLeft() {
        this.position.x -= this.speed * this.getDelta();
        this.checkPositionX();
    }

    moveRight() {
        this.position.x += this.speed * this.getDelta();
        this.checkPositionX();
    }

}