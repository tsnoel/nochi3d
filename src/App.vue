<template>
    <canvas class="game" id="game"></canvas>
    <div class="cross">
        <div>+</div>
    </div>
    <div v-if="interact && !message" class="text">
        <div>Press '{{interact.key.toUpperCase()}}'</div>
        <div>{{interact.actionLabel}} {{interact.label}}</div>
    </div>
    <div v-else-if="message" class="text">
        <div>{{message}}</div>
    </div>
</template>

<script>
import * as BABYLON from 'babylonjs';
import * as cannon from 'cannon';

import 'babylonjs-loaders';

// import demo from 'scenes/demo';
import house from 'scenes/house';

import CamerasModel from 'models/cameras';
import MeshModel from 'models/mesh';
import LightsModel from 'models/lights';
import TexturesModel from 'models/textures';

const MAXJUMP = 2;
const PLAYERHEIGHT = 5;

export default {
    name: 'App',
    data() {
        return {
            canvas: undefined,
            crouch: false,
            engine: undefined,
            interact: undefined,
            jLock: false,
            jumpCounter: MAXJUMP,
            message: undefined,
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

        this.scene.gravity = new BABYLON.Vector3(0, -2.4, 0);
        this.scene.collisionsEnabled = true;

        this.scene.enablePhysics(
            null,
            new BABYLON.CannonJSPlugin(true, 10, cannon)
        );

        this.setTextures();

        // demo.createScene({
        house.createScene({
            scene: this.scene,
            engine: this.engine,
            canvas: this.canvas,
            playerHeight: PLAYERHEIGHT
        });

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
                if (e.keyCode == 69) { this.keys.e = true; }
                if (e.keyCode == 32) { this.keys.space = true; }
                if (e.keyCode == 16) { this.keys.shift = true; }
            });

            document.addEventListener ('keyup', (e) => {
                if (e.keyCode == 69) { this.keys.e = false; }
                if (e.keyCode == 32) { this.keys.space = false; }
                if (e.keyCode == 16) { this.keys.shift = false; }
            });
        },
        keyboardListener() {
            if (!this.scene.isReady()) {
                return;
            }

            if (this.keys.shift && !this.crouch) {
                CamerasModel.all.camera.ellipsoid.y = PLAYERHEIGHT / 2;
                this.crouch = true;
            } else if (!this.keys.shift && this.crouch) {
                CamerasModel.all.camera.position.y += PLAYERHEIGHT;
                CamerasModel.all.camera.ellipsoid.y = PLAYERHEIGHT;
                this.crouch = false;
            }

            if (this.jumpCounter < MAXJUMP && !this.jLock &&
                CamerasModel.getGroundDistance('camera', this.scene) < (PLAYERHEIGHT * 2) + 1) {
                this.jumpCounter = MAXJUMP;
            }

            if (this.keys.space && !this.jLock && this.jumpCounter > 0) {
                this.jumpCounter--;
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

            this.interact = house.handleFacingMesh(CamerasModel.getFacingMesh('camera', this.scene), this.scene);

            if (this.interact && this.keys[this.interact.key]) {
                const res = this.interact.action();

                if (this.interact.resetKey) {
                    this.keys[this.interact.key] = false;
                }

                if (res) {
                    this.message = res;

                    setTimeout(() => {this.message = ''}, 1500);
                }
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
                fenny: 'assets/fenny.png',
                indy: 'assets/indy.png',
                floors: 'assets/floors.png',
                walls: 'assets/walls.png'
            };

            Object.keys(files).forEach((name) => {
                TexturesModel.addTexture({
                    name: name,
                    samplingMode: name === 'walls' || name === 'floors' ? 1 : 0,
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

@page {
    size: landscape;
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

.cross {
    position: absolute;
    z-index: 1;
    font-size: 3rem;
    color: white;
    top: 50%;
    width: 100%;
    text-align: center;
    opacity: 0.5;
}

.text {
    position: absolute;
    z-index: 1;
    font-size: 2rem;
    color: white;
    top: 65%;
    width: 100%;
    text-align: center;

	text-shadow: -1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000;
}
</style>
