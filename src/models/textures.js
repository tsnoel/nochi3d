import * as BABYLON from 'babylonjs';

class Textures {

    constructor() {
        this.all = {};
    }

    addTexture(config) {
        this.all[config.name] = this.setupTexture(config);

        return this.all[config.name];
    }

    setAsset(texture, config) {
        texture.diffuseTexture = new BABYLON.Texture(config.asset, config.scene);
    }

    setupTexture(config) {
        let txt = new BABYLON.StandardMaterial(this.name, this.scene);

        if (config.asset) {
            this.setAsset(txt, config);
        }

        return txt;
    }
}

const textures = new Textures();

export default textures;
