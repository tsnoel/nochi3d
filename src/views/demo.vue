<template>
    <canvas class="demo" id="demo"></canvas>
</template>

<script>
import * as BABYLON from 'babylonjs';
import * as cannon from 'cannon';

import 'babylonjs-loaders';

import CamerasModel from 'models/cameras';
import MeshModel from 'models/mesh';
import LightsModel from 'models/lights';
import TexturesModel from 'models/textures';

export default {
    name: 'demo',
    data() {
        return {
            canvas: undefined,
            crouch: false,
            engine: undefined,
            jLock: false,
            jump: 2,
            kDown: {}, // object for multiple key presses
            scene: undefined
        };
    },
    props: {
        keys: Object
    },
    mounted() {
        // Get the canvas DOM element
        this.canvas = document.getElementById('demo');

        // Placate Firefox
        let gl = this.canvas.getContext('webgl');
        gl.getParameter(gl.RENDERER);

        // Load the 3D engine
        this.engine = new BABYLON.Engine(
            this.canvas,
            true,
            {preserveDrawingBuffer: true, stencil: true}
        );

        this.createScene();

        // run the render loop
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });

        // the canvas/window resize event handler
        window.addEventListener('resize', () => {
            this.engine.resize();
        });
    },
    methods: {
        addPointerLock() {
            // On click event, request pointer lock
            this.scene.onPointerDown = () => {
                this.canvas.requestPointerLock =
                    this.canvas.requestPointerLock ||
                    this.canvas.msRequestPointerLock ||
                    this.canvas.mozRequestPointerLock ||
                    this.canvas.webkitRequestPointerLock;

                if (this.canvas.requestPointerLock) {
                    this.canvas.requestPointerLock();
                }
            };
        },
        addTextures() {
            TexturesModel.addTexture({
                name: 'ground1',
                scene: this.scene,
                asset: 'assets/mochi_full.jpg'
            });

            TexturesModel.addTexture({
                name: 'gregg',
                scene: this.scene,
                asset: 'assets/gregg_face.png'
            });

            TexturesModel.addTexture({
                name: 'leo',
                scene: this.scene,
                asset: 'assets/leo_face.png'
            });

            TexturesModel.addTexture({
                name: 'mochi',
                scene: this.scene,
                asset: 'assets/mochi_face.jpg'
            });

            TexturesModel.addTexture({
                name: 'mochi2',
                scene: this.scene,
                asset: 'assets/mochi_face_2.png'
            });

            TexturesModel.addTexture({
                name: 'nori',
                scene: this.scene,
                asset: 'assets/nori_face.png'
            });

            TexturesModel.addTexture({
                name: 'nori2',
                scene: this.scene,
                asset: 'assets/nori_full.png'
            });
        },
        createScene() {
            // Create a basic BJS Scene object
            this.scene = new BABYLON.Scene(this.engine);

            this.scene.gravity = new BABYLON.Vector3(0, -1.3, 0);
            this.scene.collisionsEnabled = true;

            this.scene.enablePhysics(
                null,
                new BABYLON.CannonJSPlugin(true, 10, cannon)
            );

            this.addPointerLock();
            this.addTextures();

            CamerasModel.addCamera({
                name: 'camera',
                scene: this.scene,
                canvas: this.canvas
            });

            LightsModel.addLight({
                name: 'light1',
                scene: this.scene
            });

            BABYLON.SceneLoader.ImportMesh(null, 'assets/', 'penguin.glb', this.scene, (newMeshes) => {
                MeshModel.imported.penguin = BABYLON.MeshBuilder.CreateBox(
                    'penguin', { size: 6 }, this.scene);

                MeshModel.imported.penguin.visibility = 0;

                newMeshes.forEach((nm) => {
                    nm.parent = MeshModel.imported.penguin;
                });

                MeshModel.imported.penguin.position.y = 11;
                MeshModel.imported.penguin.rotation.x = Math.PI/2;
                MeshModel.imported.penguin.rotation.y = Math.PI;

                MeshModel.imported.penguin.checkCollisions = true;

                MeshModel.imported.penguin.animations.push(MeshModel.reverseRotateSphere);
                this.scene.beginAnimation(MeshModel.imported.penguin, 0, 100, true);
            });

            MeshModel.addMesh('sphere', {
                name: 'noriS',
                diameter: 10,
                scene: this.scene,
                texture: TexturesModel.all.nori,
                rotate: true,
                y: 6
            });

            MeshModel.addMesh('sphere', {
                    name: 'greggS',
                    diameter: 8,
                    scene: this.scene,
                    texture: TexturesModel.all.gregg,
                    rotate: true,
                    x: 20,
                    y: 10,
                    z: -28
            });

            MeshModel.addMesh('sphere', {
                name: 'mochiS',
                diameter: 12,
                scene: this.scene,
                texture: TexturesModel.all.mochi,
                reverseRotate: true,
                x: -15
            });

            MeshModel.addMesh('sphere', {
                name: 'mochi2S',
                diameter: 6,
                scene: this.scene,
                texture: TexturesModel.all.mochi2,
                rotate: true,
                x: -15,
                y: 12
            });

            MeshModel.addMesh('sphere', {
                name: 'leoS',
                diameter: 8,
                scene: this.scene,
                texture: TexturesModel.all.leo,
                reverseRotate: true,
                x: 28,
                y: 8,
                z: -18
            });

            MeshModel.addMesh('sphere', {
                name: 'nori2SL',
                diameter: 50,
                scene: this.scene,
                texture: TexturesModel.all.nori2,
                x: 100,
                y: 25,
                z: -100
            });

            MeshModel.addMesh('ground', {
                name: 'ground1',
                width: 150,
                height: 150,
                scene: this.scene,
                texture: TexturesModel.all.ground1
            });

            this.scene.registerAfterRender(this.keyboardListener);
        },
        keyboardListener() {
            if (!this.scene.isReady()) {
                return;
            }

            /*
            if (this.keys.w || this.keys.a || this.keys.s || this.keys.d) {
                const playerSpeed = 1;
                const x = playerSpeed * parseFloat(Math.sin(CamerasModel.all.camera.rotation.y));
                const z = playerSpeed * parseFloat(Math.cos(CamerasModel.all.camera.rotation.y));

                const xx = playerSpeed * parseFloat(Math.sin(CamerasModel.all.camera.rotation.y + (Math.PI / 2)));
                const zz = playerSpeed * parseFloat(Math.cos(CamerasModel.all.camera.rotation.y + (Math.PI / 2)));

                if (this.keys.w) {
                    CamerasModel.all.camera.position.x += x;
                    CamerasModel.all.camera.position.z += z;
                }

                if (this.keys.s) {
                    CamerasModel.all.camera.position.x += -x;
                    CamerasModel.all.camera.position.z += -z;
                }

                if (this.keys.a) {
                    CamerasModel.all.camera.position.x += -xx;
                    CamerasModel.all.camera.position.z += -zz;
                }

                if (this.keys.d) {
                    CamerasModel.all.camera.position.x += xx;
                    CamerasModel.all.camera.position.z += zz;
                }
            }
            */

            if (this.keys.shift && !this.crouch) {
                CamerasModel.all.camera.ellipsoid.y = 0.75;
                this.crouch = true;
            } else if (!this.keys.shift && this.crouch) {
                CamerasModel.all.camera.position.y += 1.5;
                CamerasModel.all.camera.ellipsoid.y = 1.5;
                this.crouch = false;
            }

            if (this.jump < 2 && !this.jLock &&
                CamerasModel.getGroundDistance('camera', this.scene) < 4) {
                this.jump = 2;
            }

            if (this.keys.space && !this.jLock && this.jump > 0) {
                this.jump--;
                this.jLock = true;

                CamerasModel.jump.setKeys([
                    {frame: 0, value: CamerasModel.all.camera.position.y},
                    {frame: 20, value: CamerasModel.all.camera.position.y + 16}
                ]);

                CamerasModel.all.camera.animations = [CamerasModel.jump];

                this.scene.beginAnimation(CamerasModel.all.camera, 0, 20, false);
            }

            if (this.jLock && !this.keys.space) {
                this.jLock = false;
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.demo {
    background-color: #42b983;
    height: 100%;
    width: 100%;
}
</style>
