class Player extends Entity {

    constructor() {
        super();
        this.size = { width: 0.1, height: 0.2 * TransformationUtil.TARGET_RES_RATIO };
        this.position = { x: 0, y: 0.7 };
        this.fillColor = "#rgba(250,250,250,0.7)";
        this.speed = 0.1;

        this.health = 100;

        this.particles = new ParticleSystem(this.getCenter(), 12, 450, MadColor.fromString(this.fillColor));

    }

    update() {
        super.update();
        this.particles.update();
    }

    render(ctx) {
        this.particles.render(ctx);
        let screenPos = MoonshotApplication.INSTANCE.getTransform().convertWorldToPixelCoords(this.position);
        let screenSize = MoonshotApplication.INSTANCE.getTransform().convertWorldToPixelSize(this.size);
        ctx.drawImage(MoonshotApplication.INSTANCE.textureLoader.playerTexture,
            screenPos.x, screenPos.y, screenSize.width, screenSize.height);
    }


}