class Player extends Entity {

    constructor() {
        super();
        this.size = { width: 0.05, height: 0.05 };
        this.position = { x: 0, y: 0.85 };
        this.fillColor = "#f00";
        this.speed = 0.05;
    }

}