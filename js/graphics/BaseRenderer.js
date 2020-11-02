class BaseRenderer {

    /**
     * 
     */
    constructor() {
        this.canvas = $('#rendering-canvas');
        this.initCanvasSize();
    }

    /**
     * 
     */
    initCanvasSize() {
        this.canvasSize = { width: $(window).width(), height: $(window).height() };
        this.canvas.width(this.canvasSize.width);
        this.canvas.height(this.canvasSize.height);
        this.ctx = this.canvas[0].getContext('2d');
    }

    /**
     * 
     */
    clearScreen() {
        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(0, 0, this.canvasSize.width, this.canvasSize.height);
    }

    /**
     * 
     */
    render() {
        this.clearScreen();
    }


}