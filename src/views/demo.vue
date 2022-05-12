<template>
  <canvas class="demo" id="demo"></canvas>
</template>

<script>
import * as BABYLON from 'babylonjs';
import * as cannon from 'cannon';

import CamerasModel from 'models/cameras';
import MeshModel from 'models/mesh';
import LightsModel from 'models/lights';
import TexturesModel from 'models/textures';

export default {
    name: 'demo',
    data() {
        return {
            canvas: undefined,
            engine: undefined,
            jLock: false,
            jump: 2,
            kDown: {}, // object for multiple key presses
            scene: undefined
        };
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
        addKeyControls() {
            this.scene.actionManager = new BABYLON.ActionManager(this.scene);

            this.scene.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, (evt) => {
                    this.kDown[evt.sourceEvent.key] = evt.sourceEvent.type == 'keydown';
                })
            );

            this.scene.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, (evt) => {
                    this.kDown[evt.sourceEvent.key] = evt.sourceEvent.type == 'keydown';
                })
            );
        },
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

            this.scene.gravity = new BABYLON.Vector3(0, -0.6, 0);
            this.scene.collisionsEnabled = true;

            this.scene.enablePhysics(
                null,
                new BABYLON.CannonJSPlugin(true, 10, cannon)
            );


            this.addKeyControls();
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

            MeshModel.addMesh('sphere',
                {
                    name: 'sphere1',
                    diameter: 10,
                    scene: this.scene,
                    texture: TexturesModel.all.nori,
                    rotate: true,
                    y: 6
                }
            );

            MeshModel.addMesh('sphere',
                {
                    name: 'sphere2',
                    diameter: 8,
                    scene: this.scene,
                    texture: TexturesModel.all.gregg,
                    rotate: true,
                    x: 20,
                    y: 10,
                    z: -28
                }
            );

            MeshModel.addMesh('sphere',
                {
                    name: 'sphere3',
                    diameter: 12,
                    scene: this.scene,
                    texture: TexturesModel.all.mochi,
                    reverseRotate: true,
                    x: -15
                }
            );

            MeshModel.addMesh('sphere',
                {
                    name: 'sphere4',
                    diameter: 6,
                    scene: this.scene,
                    texture: TexturesModel.all.mochi2,
                    rotate: true,
                    x: -15,
                    y: 12
                }
            );

            MeshModel.addMesh('sphere',
                {
                    name: 'sphere5',
                    diameter: 8,
                    scene: this.scene,
                    texture: TexturesModel.all.leo,
                    reverseRotate: true,
                    x: 28,
                    y: 8,
                    z: -18
                }
            );

            MeshModel.addMesh('sphere',
                {
                    name: 'sphereL',
                    diameter: 50,
                    scene: this.scene,
                    texture: TexturesModel.all.nori2,
                    x: 100,
                    y: 25,
                    z: -100
                }
            );

            MeshModel.addMesh('ground',
                {
                    name: 'ground1',
                    width: 150,
                    height: 150,
                    scene: this.scene,
                    texture: TexturesModel.all.ground1
                }
            );

            this.scene.registerAfterRender(this.registerAfterRenderCallback);
        },
        registerAfterRenderCallback() {
            if (CamerasModel.getGroundDistance('camera', this.scene) < 4 && !this.jLock) {
                this.jump = 2;
            }

            if(this.kDown[' '] && !this.jLock && this.jump > 0) {
                this.jump--;
                this.jLock = true;

                CamerasModel.all.camera.animations = [];
                let a = new BABYLON.Animation(
                    "a",
                    "position.y",
                    60,
                    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
                );

                // Animation keys
                let keys = [];
                keys.push({frame: 0, value: CamerasModel.all.camera.position.y});
                keys.push({frame: 20, value: CamerasModel.all.camera.position.y + 16});
                a.setKeys(keys);

                let easingFunction = new BABYLON.CircleEase();
                easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
                a.setEasingFunction(easingFunction);

                CamerasModel.all.camera.animations.push(a);
                this.scene.beginAnimation(CamerasModel.all.camera, 0, 20, false);
            }

            if(!this.kDown[' '] && this.jLock) {
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
