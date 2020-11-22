class Star extends Entity {

    /**
     * 
     */
    constructor(x, y, speed, monochromatic = false) {
        super();
        this.pos = { x: x, y: y };
        this.alpha = 1.0;
        this.up = false;
        this.adder = random(10, 40);
        this.limit = 50;

        this.size = { w: random(2, 5), h: random(2, 5) }; //variable size

        if (random(1, 2) == 2) {
            this.up = false;
        } else {
            this.up = true;
        }
        this.red = random(0, 255);
        this.green = random(0, 255);
        this.blue = random(0, 255);

        if (monochromatic) {
            this.green = this.red;
            this.blue = this.red;
        }

        this.speed = { x: 0, y: speed / 2 * 100 }

    }

    /**
     * 
     */
    update() {
        if (this.up) {
            this.adder += 1;
            if (this.adder > this.limit) {
                this.up = false;
            }

        } else {
            this.adder -= 1;
            if (this.adder < 1) {
                this.up = true;
            }

        }

        this.alpha = this.adder / this.limit;

        //move,  to left
        this.pos.y += (this.speed.y * MoonshotApplication.INSTANCE.getTimer().getDelta());
        if (this.pos.y > TransformationUtil.TARGET_RES.height + 10) {
            this.pos.y = -10;
            this.pos.x = random(0, TransformationUtil.TARGET_RES.width);
        }
    }

    /**
     * 
     * @param {*} ctx 
     */
    render(ctx) {
        if (!ctx) return;
        ctx.fillStyle = "rgba(" + this.red + "," + this.green + "," + this.blue + "," + this.alpha + ")";
        ctx.fillRect(this.pos.x, this.pos.y, this.size.w, this.size.h);
    }

}


/**
 * 
 * @param {*} min 
 * @param {*} max 
 */
function random(min, max) {
    var nMax = max;
    var nMin = min;
    var aleat = Math.floor(Math.random() * (nMax - (nMin - 1))) + nMin;
    return aleat;
}

/**
 * 
 */
class StarGenerator {

    /**
     * 
     * @param {*} numStars 
     */
    constructor(numStars, speed) {
        this.stars = [];
        for (let i = 0; i < numStars; i++) {
            this.stars.push(
                new Star(
                    random(0, TransformationUtil.TARGET_RES.width),
                    random(0, TransformationUtil.TARGET_RES.height),
                    speed
                )
            );
        }
    }

    /**
     * 
     */
    update() {
        for (let i = 0; i < this.stars.length; i++)
            this.stars[i].update();
    }

    /**
     * 
     * @param {*} ctx 
     */
    render(ctx) {
        if (!ctx) return;
        for (let i = 0; i < this.stars.length; i++)
            this.stars[i].render(ctx);
    }

}