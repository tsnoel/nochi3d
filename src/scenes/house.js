import * as BABYLON from 'babylonjs';

import Structure from 'scenes/house/structure';

import CamerasModel from 'models/cameras';
import MeshModel from 'models/mesh';
import TexturesModel from 'models/textures';

let hasGCN = false;
const meshLabels = {
    ...Structure.meshLabels,
    'gcn': 'Gamecube',
    'froggy_chair': 'Chair'
}

function createScene(data) {
    const lights = [
        // {type: 'PointLight', position: new BABYLON.Vector3(40, 30, 45),
        //    specular: new BABYLON.Color3(0, 0, 0), diffuse: new BABYLON.Color3(0.75, 0.75, 0.75)},
        // {type: 'PointLight', position: new BABYLON.Vector3(-40, 30, 40),
        //     specular: new BABYLON.Color3(0.25, 0.25, 0.25), diffuse: new BABYLON.Color3.Magenta()},
        {type: 'HemisphericLight', position: new BABYLON.Vector3(0, 1, 0),
            specular: new BABYLON.Color3.Black(), diffuse: new BABYLON.Color3(0.5, 0.5, 0.5)},
        {type: 'HemisphericLight', position: new BABYLON.Vector3(0, -1, 0),
            specular: new BABYLON.Color3.Black(), diffuse: new BABYLON.Color3(0.75, 0.75, 0.75)}
    ];

    lights.forEach((light, index) => {
        const l = new BABYLON[`${light.type}`](`${light.type}${index}`, light.position, data.scene);

        if (light.diffuse) { l.diffuse = light.diffuse; }
        if (light.specular) { l.specular = light.specular; }
        if (light.groundColor) { l.groundColor = light.groundColor; }
    });

    const spheres = [
        {name: 'mochi', diameter: 12, texture: TexturesModel.all.mochi,
            rotate: true, position: new BABYLON.Vector3(-45, 6, 13)},
        {name: 'mochi2', diameter: 6,  texture: TexturesModel.all.mochi2,
            reverseRotate: true, position: new BABYLON.Vector3(-45, 12, 13)},
        {name: 'nori', diameter: 10, texture: TexturesModel.all.nori,
            rotate: true, position: new BABYLON.Vector3(-55, 6, -5)},
        {name: 'nori2', diameter: 8, texture: TexturesModel.all.nori2,
            reverseRotate: true, position: new BABYLON.Vector3(-70, 25, -10)},
        {name: 'g', diameter: 9, texture: TexturesModel.all.gregg,
            rotate: true, position: new BABYLON.Vector3(-70, 20, 10)},
        {name: 'l', diameter: 9, texture: TexturesModel.all.leo,
            reverseRotate: true, position: new BABYLON.Vector3(-60, 14, -20)},
        {name: 'f', diameter: 8, texture: TexturesModel.all.fenny,
            rotate: true, position: new BABYLON.Vector3(-40, 10, -10)},
        {name: 'i', diameter: 8, texture: TexturesModel.all.indy,
            reverseRotate: true, position: new BABYLON.Vector3(-40, 16, -20)}
    ];

    spheres.forEach((config) => {
        // Create a built-in "sphere" shape; its constructor takes 6 params:
        // name, segment, diameter, scene, updatable, sideOrientation
        const s = BABYLON.Mesh.CreateSphere(
            `${config.name}_inner`,
            config.segment || 16,
            config.diameter || 1,
            config.scene,
            config.updatable || false,
            BABYLON.Mesh.FRONTSIDE
        );

        s.position = config.position;
        // box.checkCollisions = true;

        if (config.texture) {
            s.material = config.texture;
        }

        if (config.rotate) {
            s.animations.push(MeshModel.rotateSphere);
            data.scene.beginAnimation(s, 0, 100, true);
        } else if (config.reverseRotate) {
            s.animations.push(MeshModel.reverseRotateSphere);
            data.scene.beginAnimation(s, 0, 100, true);
        }
    });

    Structure.createStructure(data.scene);

    const objs = [
        {name: 'lamp', path: 'assets/bioshock2/', file: 'light_ceiling.glb',
            position: new BABYLON.Vector3(40, 40, 45), scaling: new BABYLON.Vector3(0.15, 0.15, 0.15)},
        {name: 'froggy_chair', path: 'assets/', file: 'Froggy Chair.glb', size: 0.1,
            position: new BABYLON.Vector3(50, 0, 55),
            rotation: new BABYLON.Vector3(0, Math.PI/-1.5, 0),
            scaling: new BABYLON.Vector3(100, 100, 100)},
        {name: 'sit_werewolf', path: 'assets/', file: 'sit_werewolf2.glb', size: 0.2,
            position: new BABYLON.Vector3(-40, 0, 35),
            rotation: new BABYLON.Vector3(Math.PI/2, Math.PI/1.5, 0),
            scaling: new BABYLON.Vector3(0.8, 0.8, 0.8)},
        {name: 'gcn', path: 'assets/', file: 'gamecube.glb', collision: true, size: 25, position: new BABYLON.Vector3(25, 0, 125),
            rotation: new BABYLON.Vector3(Math.PI/2, Math.PI/-1.5, 0), scaling: new BABYLON.Vector3(-0.25, 0.25, 0.25)}
    ];

    objs.forEach((obj) => {
        createImport(obj, data.scene);
    });

    createCamera(data.playerHeight, data.scene, data.canvas);
}

function createCamera(playerHeight, scene, canvas) {
    const position = getStartingPosition(playerHeight);

    CamerasModel.addCamera({
        name: 'camera',
        playerHeight, position,
        scene, canvas
    });

    CamerasModel.addPointerLock(scene, canvas);
}

function createImport(obj, scene) {
    BABYLON.SceneLoader.ImportMesh(null, obj.path, obj.file, scene, (newMeshes) => {
        const box = BABYLON.MeshBuilder.CreateBox(
            obj.name, {size: obj.size || 1}, scene
        );

        box.position.y += (obj.size * obj.scaling.y) / 2;

        newMeshes.forEach((nm) => {nm.parent = box;});

        if (obj.position) {box.position = obj.position;}
        if (obj.rotation) {box.rotation = obj.rotation;}
        if (obj.scaling) {box.scaling = obj.scaling;}

        if (obj.collision) {box.checkCollisions = true;}
        box.visibility = 0.5;
    });
}

function getStartingPosition(playerHeight) {
    return new BABYLON.Vector3(10, playerHeight * 2.55, -100);
}

function handleFacingMesh(mesh, scene) {
    if (mesh) {
        const label = meshLabels[mesh.name] || mesh.name;

        if (mesh.name.includes('door_')) {
            return {
                mesh,
                label,
                actionLabel: 'Open',
                key: 'e',
                action: () => {
                    mesh.dispose();
                }
            };
        } else if (mesh.name.includes('goal_')) {
            return {
                mesh,
                label,
                actionLabel: 'Leave',
                key: 'e',
                action: () => {
                    if (hasGCN) {
                        mesh.dispose();
                        return false;
                    }
                    return 'I need to find the Gamecube to leave!';
                }
            };
        } else if (mesh.name === 'gcn') {
            return {
                mesh,
                label,
                actionLabel: 'Collect',
                key: 'e',
                resetKey: true,
                action: () => {
                    mesh.dispose();
                    window.open('https://en.wikipedia.org/wiki/GameCube', '_blank');
                    hasGCN = true;
                }
            };
        } else if (mesh.name === 'froggy_chair') {
            return {
                mesh,
                label,
                actionLabel: hasGCN ? 'Print' : 'Sit on',
                key: 'e',
                resetKey: true,
                action: () => {
                    if (hasGCN) {
                        createImport({name: 'print_gcn', path: 'assets/', file: 'gamecube.glb', size: 25,
                            position: new BABYLON.Vector3(50, 3.5, 55), rotation: new BABYLON.Vector3(Math.PI/2, Math.PI/-1.5, 0),
                            scaling: new BABYLON.Vector3(-0.25, 0.25, 0.25)}, scene);
                        setTimeout(() => {window.print(); (scene.getMeshByName('print_gcn')).dispose();}, 250);
                        return false;
                    }
                    return 'I can\'t sit now... I need to find the Gamecube!';
                }
            };
        }
    }

    return undefined;
}

export default {createScene, handleFacingMesh};
