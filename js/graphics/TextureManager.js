class TextureManager {

    constructor() {

    }

    loadTextures(callback) {
        let scope = this;
        scope.playerTexture = new Image();
        scope.playerTexture.onload = function() {
            if (callback) callback();
        };
        scope.playerTexture.src = 'images/aly_full.png';
    }

}