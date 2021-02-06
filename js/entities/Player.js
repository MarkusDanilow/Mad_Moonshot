class Player extends Entity {

    constructor() {
        super();
        this.size = { width: 0.1, height: 0.2 * TransformationUtil.TARGET_RES_RATIO };
        this.position = { x: 0, y: 0.85 };
        this.fillColor = "#rgba(250,250,250,0.7)";
        this.speed = 0.1;
        this.health = 100;
        this.textures = MoonshotApplication.INSTANCE.textureLoader.textureLibrary.textures['playerTexture']
        this.selectedTexture = 0;
    }

}