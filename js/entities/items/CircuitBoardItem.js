class CircuitBoardItem extends Item {

    constructor() {
        super("CircuitBoard");
        let width = MoonshotApplication.INSTANCE.randomFloat(0.09, 0.11);
        this.size = { width: width, height: width * TransformationUtil.TARGET_RES_RATIO };
        this.textures = MoonshotApplication.INSTANCE.textureLoader.textureLibrary.textures['circuitTexture'];
        this.selectRandomTexture();
    }

}