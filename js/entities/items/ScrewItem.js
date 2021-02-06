class ScrewItem extends Item {

    constructor() {
        super("Screw");
        let width = MoonshotApplication.INSTANCE.randomFloat(0.07, 0.09);
        this.size = { width: width, height: width * TransformationUtil.TARGET_RES_RATIO };
        this.textures = MoonshotApplication.INSTANCE.textureLoader.textureLibrary.textures['screwTexture'];
        this.selectRandomTexture();
    }

}