<template>
  <canvas class="demo" id="demo"></canvas>
</template>

<script>
import * as BABYLON from 'babylonjs';
import * as cannon from 'cannon';

export default {
    name: 'demo',
    mounted() {
        // Get the canvas DOM element
        let canvas = document.getElementById('demo');

        // Load the 3D engine
        let engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});

        // CreateScene function that creates and return the scene
        let createScene = () => {

            // Create a basic BJS Scene object
            let scene = new BABYLON.Scene(engine);

            scene.gravity = new BABYLON.Vector3(0, -.75, 0);
            scene.collisionsEnabled = true;
            // scene.enablePhysics();

            scene.enablePhysics(null, new BABYLON.CannonJSPlugin(true, 10, cannon));


            // Create a FreeCamera, and set its position to {x: 0, y: 5, z: -10}
            // let camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);
            // const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0));
            // camera.attachControl(canvas, true);

            // Target the camera to scene origin
            // camera.setTarget(BABYLON.Vector3.Zero());

            // Attach the camera to the canvas
            // camera.attachControl(canvas, false);

            const camera = new BABYLON.UniversalCamera('camera', new BABYLON.Vector3(0, 3, -20), scene);

            camera.setTarget(BABYLON.Vector3.Zero());

            camera.applyGravity = true;
            camera.ellipsoid = new BABYLON.Vector3(1, 1.5, 1);
            camera.checkCollisions = true;
            camera.attachControl(canvas, true);


            // Skybox
            // const skybox = BABYLON.Mesh.CreateBox("skyBox", 300.0, scene);
            // const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
            // skyboxMaterial.backFaceCulling = false;
            // skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/skybox", scene);
            // skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
            // skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
            // skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
            // skybox.material = skyboxMaterial;


            // Controls  WASD
            camera.keysUp.push(87);
            camera.keysDown.push(83);
            camera.keysRight.push(68);
            camera.keysLeft.push(65);

            /****************************Key Controls************************************************/

            const map ={}; //object for multiple key presses
            scene.actionManager = new BABYLON.ActionManager(scene);

            scene.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, (evt) => {
                    map[evt.sourceEvent.key] = evt.sourceEvent.type == 'keydown';
                })
            );

            scene.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, (evt) => {
                    map[evt.sourceEvent.key] = evt.sourceEvent.type == 'keydown';
                })
            );

            /****************************End Key Controls************************************************/

            // On click event, request pointer lock
            scene.onPointerDown = (evt) => {

                canvas.requestPointerLock = canvas.requestPointerLock || canvas.msRequestPointerLock ||
                    canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;

                if (canvas.requestPointerLock) {
                    canvas.requestPointerLock();
                }

            };


            // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
            let light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);

            // Create a built-in "sphere" shape; its constructor takes 6 params:
            // name, segment, diameter, scene, updatable, sideOrientation
            let sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 8, scene, false, BABYLON.Mesh.FRONTSIDE);

            let sphereTexture = new BABYLON.StandardMaterial('sphereTexture', scene);
            sphereTexture.diffuseTexture = new BABYLON.Texture('assets/nori.png', scene);

            sphere.material = sphereTexture;

            // Move the sphere upward 1/2 of its height
            sphere.position.y = 4;

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

            scene.beginAnimation(sphere, 0, 40, true);

            sphere.checkCollisions = true;

            // Create a built-in "ground" shape; its constructor takes 6 params
            // name, width, height, subdivision, scene, updatable
            let ground = BABYLON.Mesh.CreateGround('ground1', 100, 100, 2, scene, false);

            let groundTexture = new BABYLON.StandardMaterial('groundTexture', scene);
            groundTexture.diffuseTexture = new BABYLON.Texture('assets/grass.jpg', scene);

            ground.material = groundTexture;

            ground.checkCollisions = true;

            this.jumping = false;
            scene.registerAfterRender(() => {
                if(map[' '] && !this.jumping) {
                    this.jumping = true;
                    camera.cameraDirection.y += 2;
                }

                if (camera.cameraDirection.y <= 0.1) {
                    this.jumping = false;
                }
            });

            // Return the created scene
            return scene;
        }

        // call the createScene function
        let scene = createScene();

        // run the render loop
        engine.runRenderLoop(() => {
            scene.render();
        });

        // the canvas/window resize event handler
        window.addEventListener('resize', () => {
            engine.resize();
        });
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
