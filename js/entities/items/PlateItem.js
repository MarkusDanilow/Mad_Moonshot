class PlateItem extends Item {

    constructor() {
        super("Plate");
        let width = MoonshotApplication.INSTANCE.randomFloat(0.1, 0.13);
        this.size = { width: width, height: width * TransformationUtil.TARGET_RES_RATIO };
        this.textures = MoonshotApplication.INSTANCE.textureLoader.textureLibrary.textures['plateTexture'];
        this.selectRandomTexture();
    }

}