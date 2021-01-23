class TextureManager {

    /**
     * 
     */
    constructor() {
        this.textureLibrary = {
            basePath: 'images/',
            fileType: '.png',
            textureSources: {
                playerTexture: ['aly_full'],
                asteroidTexture: ['asteroid1', 'asteroid2', 'asteroid3']
            },
            textures: {

            },
            count: 4
        };
        this.texturesLoaded = 0;
    }

    /**
     * 
     * @param {*} finalCallback 
     */
    textureLoadingCallback(finalCallback, texture, textureName) {
        this.texturesLoaded++;
        if (texture && textureName) {
            if (!this.textureLibrary.textures[textureName]) {
                this.textureLibrary.textures[textureName] = [texture];
            } else {
                this.textureLibrary.textures[textureName].push(texture);
            }
        }
        if (!finalCallback) return;
        if (this.texturesLoaded >= this.textureLibrary.count) {
            finalCallback();
        }
    }

    /**
     * 
     * @param {*} callback 
     */
    loadTextures(callback) {
        let scope = this;
        for (var prop in scope.textureLibrary.textureSources) {
            if (Object.prototype.hasOwnProperty.call(scope.textureLibrary.textureSources, prop)) {
                if (scope.textureLibrary.textureSources[prop]) {
                    let sources = scope.textureLibrary.textureSources[prop];
                    for (let i = 0; i < sources.length; i++) {
                        let img = new Image();
                        ((p) => {
                            img.onload = function(ev) {
                                scope.textureLoadingCallback(callback, ev.path[0], p);
                            }
                        })(prop)
                        img.src = scope.textureLibrary.basePath + sources[i] + scope.textureLibrary.fileType;
                    }
                }
            }
        }
    }

}