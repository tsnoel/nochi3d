import * as BABYLON from 'babylonjs';

class Light {

    constructor(config) {
        this.name = config.name;
        this.scene = config.scene;
        this.light = undefined;

        this.setup();
    }

    setup() {
        // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
        this.light = new BABYLON.HemisphericLight(
            this.name,
            new BABYLON.Vector3(0, 1, 0),
            this.scene
        );
    }

}

class Lights {

    constructor() {
        this.all = {};
    }

    addLight(config) {
        const newLight = new Light(config);

        this.all[config.name] = newLight;

        return newLight;
    }
}

const lights = new Lights();

export default lights;
