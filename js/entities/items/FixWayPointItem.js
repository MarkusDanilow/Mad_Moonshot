class FixWayPointItem extends Item {

    constructor() {
        super("FixWayPoint");
        this.isFixed = true;
        this.fillColor = "rgba(10, 150, 250, 0.7)";
        this.size = { width: 0.07, height: 0.07 };
        this.scaleUp = true;
    }

    update() {
        if (this.size.width < 0.08 && this.scaleUp) {
            this.size.width += 0.001 * this.getDelta();
            this.scaleUp = this.size.width < 0.08;
        } else if (this.size.width > 0.07 && !this.scaleUp) {
            this.size.width -= 0.001 * this.getDelta();
            this.scaleUp = this.size.width <= 0.07;
        }
    }

    render(ctx) {
        if (!ctx) return;
        let screenPos = this.getScreenPos();
        let screenSize = this.getScreenSize();

        ctx.beginPath();
        ctx.fillStyle = "rgba(10, 150, 250, 0.35)";
        ctx.arc(screenPos.x, screenPos.y, screenSize.width / 2 - 10, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.strokeStyle = this.fillColor;
        ctx.lineWidth = 3;
        ctx.arc(screenPos.x, screenPos.y, screenSize.width / 2, 0, Math.PI * 2);
        ctx.stroke();


    }

}