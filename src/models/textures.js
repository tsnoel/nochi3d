import * as BABYLON from 'babylonjs';

class Texture {

    constructor(config) {
        this.name = config.name;
        this.scene = config.scene;

        this.asset = config.asset || '';

        this.texture = undefined;

        this.setup();

        if (this.asset) {
            this.setAsset();
        }
    }

    setup() {
        this.texture = new BABYLON.StandardMaterial(this.name, this.scene);
    }

    setAsset() {
        this.texture.diffuseTexture = new BABYLON.Texture(this.asset, this.scene);
    }

}

class Textures {

    constructor() {
        this.all = {};
    }

    addTexture(config) {
        const newTexture = new Texture(config);

        this.all[config.name] = newTexture;

        return newTexture;
    }
}

const textures = new Textures();

export default textures;
