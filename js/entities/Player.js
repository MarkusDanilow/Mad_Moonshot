class Player extends Entity {

    constructor() {
        super();
        this.size = { width: 20, height: 20 };
        this.position = { x: 100, y: 100 };
    }

    render(ctx) {
        if (!ctx) return;
        ctx.fillStyle = "white";
        ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
    }

}