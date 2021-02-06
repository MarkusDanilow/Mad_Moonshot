class WireItem extends Item {

    constructor() {
        super("Wire");
        let width = MoonshotApplication.INSTANCE.randomFloat(0.09, 0.11);
        this.size = { width: width, height: width * TransformationUtil.TARGET_RES_RATIO };
        this.textures = MoonshotApplication.INSTANCE.textureLoader.textureLibrary.textures['wireTexture'];
        this.selectRandomTexture();
    }

}