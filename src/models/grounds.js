import * as BABYLON from 'babylonjs';

class Ground {

    constructor(config) {
        this.name = config.name;
        this.width = config.width || 100;
        this.height = config.height || 100;
        this.subdivision = config.subdivision || 0;
        this.scene = config.scene;
        this.updatable = config.updatable || false;

        this.ground = undefined;

        this.setup();
    }

    setup() {
        // Create a built-in "ground" shape; its constructor takes 6 params
        // name, width, height, subdivision, scene, updatable
        this.ground = BABYLON.Mesh.CreateGround(
            this.name,
            this.width,
            this.height,
            this.subdivision,
            this.scene,
            this.updatable
        );

        this.ground.checkCollisions = true;
    }

    setTexture(t) {
        this.ground.material = t.texture;
    }
}

class Grounds {

    constructor() {
        this.all = {};
    }

    addGround(config) {
        const newGround = new Ground(config);

        this.all[config.name] = newGround;

        return newGround;
    }
}

const grounds = new Grounds();

export default grounds;
