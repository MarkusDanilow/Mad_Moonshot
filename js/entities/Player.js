class Player extends Entity {

    constructor() {
        super();
        this.size = { width: 0.1, height: 0.1 * TransformationUtil.TARGET_RES_RATIO };
        this.position = { x: 0, y: 0.85 };
        this.fillColor = "#0af";
        this.speed = 0.1;

        this.health = 100;

    }

}