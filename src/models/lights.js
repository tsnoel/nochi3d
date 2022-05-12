import * as BABYLON from 'babylonjs';

class Lights {

    constructor() {
        this.all = {};
    }

    addLight(config) {
        this.all[config.name] = this.setupLight(config);

        return this.all[config.name];
    }

    setupLight(config) {
        // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
        return new BABYLON.HemisphericLight(
            config.name,
            new BABYLON.Vector3(0, 1, 0),
            config.scene
        );
    }
}

const lights = new Lights();

export default lights;
