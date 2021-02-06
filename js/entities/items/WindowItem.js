class WindowItem extends Item {

    constructor() {
        super("Window");
        let width = MoonshotApplication.INSTANCE.randomFloat(0.15, 0.17);
        this.size = { width: width, height: width * TransformationUtil.TARGET_RES_RATIO };
        this.fillColor = "rgba(100,100,100,1)";
        this.textures = MoonshotApplication.INSTANCE.textureLoader.textureLibrary.textures['windowTexture'];
        this.selectRandomTexture();
    }
}