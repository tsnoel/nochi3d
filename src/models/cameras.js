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

    addCameraWASD(name) {
        this.all[name].keysUp.push(87);
        this.all[name].keysDown.push(83);
        this.all[name].keysRight.push(68);
        this.all[name].keysLeft.push(65);
    }

    addPointerLock(scene, canvas) {
        // On click event, request pointer lock
        scene.onPointerDown = () => {
            canvas.requestPointerLock =
                canvas.requestPointerLock ||
                canvas.msRequestPointerLock ||
                canvas.mozRequestPointerLock ||
                canvas.webkitRequestPointerLock;

            if (canvas.requestPointerLock) {
                canvas.requestPointerLock();
            }
        };
    }

    getGroundDistance(name, scene) {
        const origin = this.all[name].position;
        const direction = BABYLON.Vector3.Down();
        const length = 300;
        const ray = new BABYLON.Ray(origin, direction, length);

        const hit = scene.pickWithRay(ray);

        return hit.distance;
    }

    getFacingMesh(name, scene) {
        const ray = scene.createPickingRay(
            scene.pointerX, scene.pointerY,
            BABYLON.Matrix.Identity(), this.all[name]
        );

        const hit = scene.pickWithRay(ray);

        if (hit.distance < 30) {
            return hit.pickedMesh;
        }

        return undefined;
    }

    setupCamera(config) {
        const camera = new BABYLON.UniversalCamera(
            config.name,
            config.position || new BABYLON.Vector3(0, config.playerHeight * 2, 0),
            config.scene
        );

        camera.inertia = 0.3;
        camera.angularSensibility = 800;
        camera.speed = 10;

        camera.setTarget(new BABYLON.Vector3(0, 10, 0));

        camera.applyGravity = true;
        camera._needMoveForGravity = true;
        camera.ellipsoid = new BABYLON.Vector3(1.5, config.playerHeight, 1.5);
        camera.checkCollisions = true;
        camera.attachControl(config.canvas, true);

        return camera;
    }
}

const cameras = new Cameras();

export default cameras;
