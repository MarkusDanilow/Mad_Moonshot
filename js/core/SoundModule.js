class SoundModule {

    constructor() {
        this.collectSound = $('#collect-sound')[0];
        this.explosionSound = $('#explosion-sound')[0];
        this.bgMusicInspiration = $('#background-music-inspiration')[0];
        this.bgMusicQuiet = $('#background-music-quiet')[0];
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

    playBackgroundMusic_Inspiration() {
        this.playSound(this.bgMusicInspiration);
    }

    stopBackgroundMusic_Inspiration() {
        this.stopSound(this.bgMusicInspiration);
    }

    playBackgroundMusic_Quiet() {
        this.playSound(this.bgMusicQuiet);
    }

    stopBackgroundMusic_Quiet() {
        this.stopSound(this.bgMusicQuiet);
    }


}