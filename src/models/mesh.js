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
        if (type === 'ground') {
            this[type][config.name] = this.setupGround(config);
        } else if (type === 'sphere') {
            this[type][config.name] = this.setupSphere(config);
        } else if (type === 'imported') {
            this[type][config.name] = this.setupImported(config);
        } else if (type === 'tiledground') {
            this.ground[config.name] = this.setupTiledGround(config);
        } else {
            this[type][config.name] = {};
        }
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

    setupImported(config) {
        BABYLON.SceneLoader.ImportMesh(null,
            config.path, config.file, config.scene, (newMeshes) => {
            this.imported[config.name] = BABYLON.MeshBuilder.CreateBox(config.name,
                {size: config.size || 1},
                this.scene);

            this.imported[config.name].visibility = 0;

            newMeshes.forEach((nm) => {
                nm.checkCollisions = true;
                nm.parent = this.imported[config.name];
            });

            if (config.position) {
                this.imported[config.name].position = config.position;
            }

            if (config.rotation) {
                this.imported[config.name].rotation = config.rotation;
            }

            if (config.scaling) {
                this.imported[config.name].scaling = config.scaling;
            }
        });
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

    setupTiledGround(config) {
        const grid = { 'h' : 8, 'w' : 8 };

        const tiledGround = new BABYLON.MeshBuilder.CreateTiledGround(
            config.name, {xmin: -3, zmin: -3, xmax: 3, zmax: 3, subdivisions: grid}
        );

        const multimat = new BABYLON.MultiMaterial('multi', config.scene);
        multimat.subMaterials.push(config.texture);

        tiledGround.material = multimat;

        // Needed variables to set subMeshes
        const verticesCount = tiledGround.getTotalVertices();
        const tileIndicesLength = tiledGround.getIndices().length / (grid.w * grid.h);

        // Set subMeshes of the tiled ground
        tiledGround.subMeshes = [];
        let base = 0;

        for (let row = 0; row < grid.h; row++) {
            for (let col = 0; col < grid.w; col++) {
                tiledGround.subMeshes.push(new BABYLON.SubMesh(
                    row%2 ^ col%2, 0, verticesCount, base , tileIndicesLength, tiledGround
                ));
                base += tileIndicesLength;
            }
        }

        tiledGround.checkCollisions = true;

        return tiledGround;
    }
}

const mesh = new Mesh();

export default mesh;
