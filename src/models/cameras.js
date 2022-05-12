import * as BABYLON from 'babylonjs';

class Cameras {

    constructor() {
        this.all = {};

        this.jump = new BABYLON.Animation(
            'jump', 'position.y', 60,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
        );

        const easingFunction = new BABYLON.CircleEase();
        easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);
        this.jump.setEasingFunction(easingFunction);
    }

    addCamera(config) {
        this.all[config.name] = this.setupCamera(config);

        this.addCameraWASD(config.name);
    }

    setupCamera(config) {
        const camera = new BABYLON.UniversalCamera(
            config.name,
            new BABYLON.Vector3(30, 3, -70),
            config.scene
        );

        camera.setTarget(new BABYLON.Vector3(10, 10, 0));

        camera.applyGravity = true;
        camera._needMoveForGravity = true;
        camera.ellipsoid = new BABYLON.Vector3(1, 1.5, 1);
        camera.checkCollisions = true;
        camera.attachControl(config.canvas, true);

        return camera;
    }

    addCameraWASD(name) {
        // this.all[name].keysUp.push(87);
        // this.all[name].keysDown.push(83);
        this.all[name].keysRight.push(68);
        this.all[name].keysLeft.push(65);
    }

    getGroundDistance(name, scene) {
        const origin = this.all[name].position;
        const direction = BABYLON.Vector3.Down();
        const length = 300;
        const ray = new BABYLON.Ray(origin, direction, length);

        const hit = scene.pickWithRay(ray);

        return hit.distance;
    }
}

const cameras = new Cameras();

export default cameras;
