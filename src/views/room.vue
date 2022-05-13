<template>
    <canvas class="room" id="room"></canvas>
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
    name: 'room',
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
        this.canvas = document.getElementById('room');

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
        addTextures() {
            TexturesModel.addTexture({
                name: 'snow',
                scene: this.scene,
                asset: 'assets/snow.png'
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

            CamerasModel.addPointerLock(this.scene, this.canvas);
            this.addTextures();

            CamerasModel.addCamera({
                name: 'camera',
                position: new BABYLON.Vector3(0, 3, -40),
                scene: this.scene,
                canvas: this.canvas
            });

            LightsModel.addLight({
                name: 'light1',
                scene: this.scene
            });

            MeshModel.addMesh('imported', {
                name: 'penguin1',
                path: 'assets/',
                file: 'penguin.glb',
                scene: this.scene,
                position: new BABYLON.Vector3(0, 0, 0),
                rotation: new BABYLON.Vector3(Math.PI/2, Math.PI, 0),
                scaling: new BABYLON.Vector3(2, 2, 2)
            });

            MeshModel.addMesh('imported', {
                name: 'penguin2',
                path: 'assets/',
                file: 'penguin.glb',
                scene: this.scene,
                position: new BABYLON.Vector3(6, 0, -6),
                rotation: new BABYLON.Vector3(Math.PI/2, Math.PI, 0),
            });

            MeshModel.addMesh('imported', {
                name: 'penguin3',
                path: 'assets/',
                file: 'penguin.glb',
                scene: this.scene,
                position: new BABYLON.Vector3(-6, 0, -6),
                rotation: new BABYLON.Vector3(Math.PI/2, Math.PI, 0),
            });

            MeshModel.addMesh('ground', {
                name: 'ground2',
                width: 250,
                height: 250,
                scene: this.scene,
                texture: TexturesModel.all.snow
            });

            this.scene.registerAfterRender(this.keyboardListener);
        },
        keyboardListener() {
            if (!this.scene.isReady()) {
                return;
            }

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
.room {
    background-color: #42b983;
    height: 100%;
    width: 100%;
}
</style>
