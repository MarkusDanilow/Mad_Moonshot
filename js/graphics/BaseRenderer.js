class BaseRenderer {

    /**
     * 
     */
    constructor() {
        this.canvas = $('#rendering-canvas');
        this.initCanvasSize();
        this.ctx = this.canvas[0].getContext('2d');
        noise.seed(Math.random());
    }

    /**
     * 
     */
    initCanvasSize() {
        MoonshotApplication.INSTANCE.getTransform().scaleCanvas(this.canvas);
    }

    /**
     * 
     */
    clearScreen() {
        let canvasSize = MoonshotApplication.INSTANCE.getTransform().getCanvasSize();
        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);
    }

    /**
     * 
     */
    render() {
        this.clearScreen();
        // this.renderStarryBackgroundOnce();
        if (MoonshotApplication.INSTANCE.getLevel()) {
            MoonshotApplication.INSTANCE.getLevel().render(this.ctx);
        }
    }

    /**
     * 
     */
    renderStarryBackgroundOnce() {
        let canvasSize = MoonshotApplication.INSTANCE.getTransform().getCanvasSize();
        this.ctx.fillStyle = "rgba(250,250,250,0.2)";
        for (var x = 0; x < canvasSize.width; x++) {
            for (var y = 0; y < canvasSize.height; y++) {
                let yp = y;
                if (MoonshotApplication.INSTANCE.getLevel()) {
                    yp += MoonshotApplication.INSTANCE.getLevel().levelOffset.y;
                }
                var value = noise.perlin2(x, yp);
                console.log(value);
                if (value > 0.9) {
                    this.ctx.beginPath();
                    this.ctx.arc(x, y, 1, 0, 2 * Math.PI);
                    this.ctx.fill();
                }
            }
        }
    }


}