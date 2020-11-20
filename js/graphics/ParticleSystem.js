class ParticleSystem {

    /**
     * 
     * @param {*} position 
     * @param {*} particles 
     * @param {*} duration 
     * @param {*} color 
     */
    constructor(position, particles, duration, color) {
        this.start = { x: position.x, y: position.y };
        this.particles = particles;
        this.duration = duration;
        this.timePassed = 0;
        this.color = color;
        this.init();
    }

    /**
     * 
     */
    init() {
        this.peTargetPositions = [];
        this.pePositions = [];
        let angle = 0;
        for (let i = 0; i < this.particles; i++) {
            let rad = this.d2r(angle);
            let x = Math.cos(rad) * (0.05 + Math.random() / 100);
            let y = Math.sin(rad) * (0.05 + Math.random() / 100);
            this.peTargetPositions.push({ x: this.start.x + x, y: this.start.y + y });
            this.pePositions.push({ x: this.start.x, y: this.start.y });
            angle += 360 / this.particles;
        }

    }

    /**
     * 
     * @param {*} x 
     */
    r2d(x) {
        return x / (Math.PI / 180);
    }

    /**
     * 
     * @param {*} x 
     */
    d2r(x) {
        return x * (Math.PI / 180);
    }

    /**
     * 
     */
    update() {
        this.timePassed += MoonshotApplication.INSTANCE.getTimer().getDeltaRaw();

        // update particle positions 
        let ratio = this.timePassed / this.duration;
        for (let i = 0; i < this.particles; i++) {
            let target = this.peTargetPositions[i];
            let deltaX = (target.x - this.start.x) * ratio;
            let deltaY = (target.y - this.start.y) * ratio;
            this.pePositions[i].x += deltaX;
            this.pePositions[i].y += deltaY;
        }
    }

    /**
     * 
     */
    isDone() {
        return this.timePassed >= this.duration;
    }

    /**
     * 
     * @param {*} ctx 
     */
    render(ctx) {
        if (!ctx) return;

        let ratio = this.timePassed / this.duration;
        let opacity = 1 - ratio;
        this.color.a = opacity;

        let transform = MoonshotApplication.INSTANCE.getTransform();

        ctx.fillStyle = this.color.toString();
        for (let i = 0; i < this.particles; i++) {

            let pixelSize = transform.convertWorldToPixelSize({ width: 0.01, height: 0.01 });
            let pixelPos = transform.convertWorldToPixelCoords(this.pePositions[i]);

            ctx.beginPath();
            ctx.arc(pixelPos.x, pixelPos.y, pixelSize.width, 0, Math.PI * 2);
            ctx.fill();
        }
    }

}