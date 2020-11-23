class SoundModule {

    constructor() {
        this.collectSound = $('#collect-sound')[0];
        this.explosionSound = $('#explosion-sound')[0];
        this.bgMusic = $('#background-music')[0];
    }

    playSound(sound) {
        if (!sound) return;
        this, this.stopSound(sound);
        sound.play();
    }

    stopSound(sound) {
        if (!sound) return;
        sound.pause();
        sound.currentTime = 0;
    }

    playExplosionSound() {
        this.playSound(this.explosionSound);
    }

    playCollectSound() {
        this.playSound(this.collectSound);
    }

    playBackgroundMusic() {
        this.playSound(this.bgMusic);
    }

}