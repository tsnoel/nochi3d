import * as BABYLON from 'babylonjs';

class Mesh {

    constructor() {
        this.ground = {};
        this.imported = {};
        this.sphere = {};

        this.rotateSphere = new BABYLON.Animation(
            'rotateSphere', 'rotation.y', 10,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
        );

        this.rotateSphere.setKeys([
            { frame: 0, value: 0 },
            { frame: 100, value: 2 * Math.PI }
        ]);

        this.reverseRotateSphere = new BABYLON.Animation(
            'rotateSphere', 'rotation.y', 10,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
        );

        this.reverseRotateSphere.setKeys([
            { frame: 0, value: 0 },
            { frame: 100, value: -2 * Math.PI }
        ]);
    }

    addMesh(type, config) {
        this[type][config.name] = {};

        if (type === 'ground') {
            this[type][config.name] = this.setupGround(config);
        } else if (type === 'sphere') {
            this[type][config.name] = this.setupSphere(config);
        }

        return this[type][config.name];
    }

    setTexture(type, name, texture) {
        this[type][name].material = texture;
    }

    setupGround(config) {
        // Create a built-in "ground" shape; its constructor takes 6 params
        // name, width, height, subdivision, scene, updatable
        let grd = BABYLON.Mesh.CreateGround(
            config.name,
            config.width || 100,
            config.height || 100,
            config.subdivision || 0,
            config.scene,
            config.updatable || false
        );

        if (config.texture) {
            grd.material = config.texture;
        }

        grd.checkCollisions = true;

        return grd;
    }

    setupSphere(config) {
        const box = BABYLON.MeshBuilder.CreateBox(
            config.name,
            {
                size: config.diameter || 1
            },
            config.scene
        );

        box.position.x = config.x || 0;
        box.position.y = config.y || config.diameter / 2 || 0;
        box.position.z = config.z || 0;

        box.checkCollisions = true;
        box.visibility = 0;

        // Create a built-in "sphere" shape; its constructor takes 6 params:
        // name, segment, diameter, scene, updatable, sideOrientation
        const s = BABYLON.Mesh.CreateSphere(
            `${config.name}_inner`,
            config.segment || 16, // ???
            config.diameter || 1,
            config.scene,
            config.updatable || false,
            config.sideOrientation || BABYLON.Mesh.FRONTSIDE // ???
        );

        if (config.texture) {
            s.material = config.texture;
        }

        if (config.rotate) {
            s.animations.push(this.rotateSphere);
            config.scene.beginAnimation(s, 0, 100, true);
        } else if (config.reverseRotate) {
            s.animations.push(this.reverseRotateSphere);
            config.scene.beginAnimation(s, 0, 100, true);
        }

        s.parent = box;

        return box;
    }
}

const mesh = new Mesh();

export default mesh;
