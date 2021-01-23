class AsteroidItem extends Item {

    constructor() {
        super("Asteroid");
        let width = MoonshotApplication.INSTANCE.randomFloat(0.1, 0.17);
        this.size = { width: width, height: width * TransformationUtil.TARGET_RES_RATIO };
        this.fillColor = "rgba(100,100,100,1)";
        this.damage = 10;
        this.textures = MoonshotApplication.INSTANCE.textureLoader.textureLibrary.textures['asteroidTexture'];
        this.selectedTexture = MoonshotApplication.INSTANCE.randomInt(0, this.textures.length);
    }
}