<template>
    <canvas class="game" id="game"></canvas>
</template>

<script>
import * as BABYLON from 'babylonjs';
import * as cannon from 'cannon';

import 'babylonjs-loaders';

import demo from 'helpers/demo';

import CamerasModel from 'models/cameras';
import MeshModel from 'models/mesh';
import LightsModel from 'models/lights';
import TexturesModel from 'models/textures';

export default {
    name: 'App',
    data() {
        return {
            canvas: undefined,
            crouch: false,
            engine: undefined,
            jLock: false,
            jump: 2,
            scene: undefined,
            keys: {}
        };
    },
    mounted() {
        this.addKeyListeners();

        // Get the canvas DOM element
        this.canvas = document.getElementById('game');

        // Placate Firefox
        let gl = this.canvas.getContext('webgl');
        gl.getParameter(gl.RENDERER);

        // Load the 3D engine
        this.engine = new BABYLON.Engine(
            this.canvas,
            true,
            {preserveDrawingBuffer: true, stencil: true}
        );

        // Create a basic BJS Scene object
        this.scene = new BABYLON.Scene(this.engine);

        this.scene.gravity = new BABYLON.Vector3(0, -1.3, 0);
        this.scene.collisionsEnabled = true;

        this.scene.enablePhysics(
            null,
            new BABYLON.CannonJSPlugin(true, 10, cannon)
        );

        this.setTextures();

        demo.createScene({
            scene: this.scene,
            engine: this.engine,
            canvas: this.canvas
        });

        CamerasModel.addPointerLock(this.scene, this.canvas);

        this.scene.registerAfterRender(this.keyboardListener);

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
        addKeyListeners() {
            document.addEventListener ('keydown', (e) => {
                // if (e.keyCode == 87) { this.keys.w = true; }
                // if (e.keyCode == 65) { this.keys.a = true; }
                // if (e.keyCode == 83) { this.keys.s = true; }
                // if (e.keyCode == 68) { this.keys.d = true; }
                if (e.keyCode == 32) { this.keys.space = true; }
                if (e.keyCode == 16) { this.keys.shift = true; }
            });

            document.addEventListener ('keyup', (e) => {
                // if (e.keyCode == 87) { this.keys.w = false; }
                // if (e.keyCode == 65) { this.keys.a = false; }
                // if (e.keyCode == 83) { this.keys.s = false; }
                // if (e.keyCode == 68) { this.keys.d = false; }
                if (e.keyCode == 32) { this.keys.space = false; }
                if (e.keyCode == 16) { this.keys.shift = false; }
            });
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
        },
        setTextures() {
            const files = {
                ground1: 'assets/mochi_full.jpg',
                gregg: 'assets/gregg_face.png',
                leo: 'assets/leo_face.png',
                mochi: 'assets/mochi_face.jpg',
                mochi2: 'assets/mochi_face_2.png',
                nori: 'assets/nori_face.png',
                nori2: 'assets/nori_full.png',
                snow: 'assets/snow.png'
            };

            Object.keys(files).forEach((name) => {
                TexturesModel.addTexture({
                    name: name,
                    scene: this.scene,
                    asset: files[name]
                });
            });
        }
    }
}
</script>

<style>
html,
body {
    height: 100%;
    width: 100%;
}

html {
    overflow: hidden;
}

body {
    margin: 0;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    width: 100%;
}

.game {
    background-color: #42b983;
    height: 100%;
    width: 100%;
}
</style>
