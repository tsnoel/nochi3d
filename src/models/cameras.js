import * as BABYLON from 'babylonjs';

class Camera {

    constructor(config) {
        this.name = config.name;
        this.scene = config.scene;
        this.canvas = config.canvas;
        this.camera = undefined;

        this.wasd = config.wasd || true;

        this.setup();

        if (this.wasd) {
            this.addWASD();
        }
    }

    setup() {
        this.camera = new BABYLON.UniversalCamera(
            this.name,
            new BABYLON.Vector3(0, 3, -20),
            this.scene
        );

        this.camera.setTarget(BABYLON.Vector3.Zero());

        this.camera.applyGravity = true;
        this.camera.ellipsoid = new BABYLON.Vector3(1, 1.5, 1);
        this.camera.checkCollisions = true;
        this.camera.attachControl(this.canvas, true);
    }

    addWASD() {
        // Controls  WASD
        this.camera.keysUp.push(87);
        this.camera.keysDown.push(83);
        this.camera.keysRight.push(68);
        this.camera.keysLeft.push(65);
    }

}

class Cameras {

    constructor() {
        this.all = {};
    }

    addCamera(config) {
        const newCamera = new Camera(config);

        this.all[config.name] = newCamera;

        return newCamera;
    }
}

const cameras = new Cameras();

export default cameras;
