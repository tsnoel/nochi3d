<template>
  <canvas class="demo" id="demo"></canvas>
</template>

<script>
import * as BABYLON from 'babylonjs';
import * as cannon from 'cannon';

import CamerasModel from 'models/cameras';
import GroundsModel from 'models/grounds';
import LightsModel from 'models/lights';
import TexturesModel from 'models/textures';

export default {
    name: 'demo',
    data() {
        return {
            camera: undefined,
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
        createScene() {
            // Create a basic BJS Scene object
            this.scene = new BABYLON.Scene(this.engine);

            this.scene.gravity = new BABYLON.Vector3(0, -0.75, 0);
            this.scene.collisionsEnabled = true;

            this.scene.enablePhysics(
                null,
                new BABYLON.CannonJSPlugin(true, 10, cannon)
            );

            CamerasModel.addCamera({
                name: 'camera',
                scene: this.scene,
                canvas: this.canvas
            });

            /****************************Key Controls************************************************/

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

            /****************************End Key Controls************************************************/

            // On click event, request pointer lock
            this.scene.onPointerDown = (evt) => {

                this.canvas.requestPointerLock = this.canvas.requestPointerLock || this.canvas.msRequestPointerLock ||
                    this.canvas.mozRequestPointerLock || this.canvas.webkitRequestPointerLock;

                if (this.canvas.requestPointerLock) {
                    this.canvas.requestPointerLock();
                }

            };

            LightsModel.addLight({
                name: 'light1',
                scene: this.scene
            });

            // Create a built-in "sphere" shape; its constructor takes 6 params:
            // name, segment, diameter, scene, updatable, sideOrientation
            let sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 8, this.scene, false, BABYLON.Mesh.FRONTSIDE);

            let sphereTexture = new BABYLON.StandardMaterial('sphereTexture', this.scene);
            sphereTexture.diffuseTexture = new BABYLON.Texture('assets/nori.png', this.scene);

            sphere.material = sphereTexture;

            // Move the sphere upward 1/2 of its height
            sphere.position.y = 4;

            const box = BABYLON.MeshBuilder.CreateBox('box', {
                size: 8
            }, this.scene);
            box.position.y = 4;

            const rotateSphere = new BABYLON.Animation('rotateSphere', 'rotation.y', 10,
                BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

            const keyFrames = [];

            keyFrames.push({
                frame: 0,
                value: 0
            });

            keyFrames.push({
                frame: 40,
                value: 2 * Math.PI
            });

            rotateSphere.setKeys(keyFrames);

            sphere.animations.push(rotateSphere);

            this.scene.beginAnimation(sphere, 0, 40, true);

            box.checkCollisions = true;
            box.visibility = 0;

            GroundsModel.addGround({
                name: 'ground1',
                width: 250,
                height: 250,
                scene: this.scene
            });

            TexturesModel.addTexture({
                name: 'ground1',
                scene: this.scene,
                asset: 'assets/grass.jpg'
            });

            GroundsModel.all.ground1.setTexture(
                TexturesModel.all.ground1
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
                easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);
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
