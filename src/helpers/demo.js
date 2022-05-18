import * as BABYLON from 'babylonjs';

import CamerasModel from 'models/cameras';
import MeshModel from 'models/mesh';
import LightsModel from 'models/lights';
import TexturesModel from 'models/textures';

function createScene(data) {
    LightsModel.addLight({
        name: 'light1',
        scene: data.scene
    });

    MeshModel.addMesh('imported', {
        name: 'penguin',
        path: 'assets/',
        file: 'penguin.glb',
        scene: data.scene,
        position: new BABYLON.Vector3(0, 11, 0),
        rotation: new BABYLON.Vector3(Math.PI/2, Math.PI, 0),
        scaling: new BABYLON.Vector3(2, 2, 2)
    });

    MeshModel.addMesh('sphere', {
        name: 'mochiS',
        diameter: 12,
        scene: data.scene,
        texture: TexturesModel.all.mochi,
        reverseRotate: true,
        x: -15
    });

    MeshModel.addMesh('sphere', {
        name: 'mochi2S',
        diameter: 6,
        scene: data.scene,
        texture: TexturesModel.all.mochi2,
        rotate: true,
        x: -15,
        y: 12
    });

    MeshModel.addMesh('sphere', {
        name: 'noriS',
        diameter: 10,
        scene: data.scene,
        texture: TexturesModel.all.nori,
        rotate: true,
        y: 6
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

    MeshModel.addMesh('sphere', {
        name: 'greggS',
        diameter: 8,
        scene: data.scene,
        texture: TexturesModel.all.gregg,
        rotate: true,
        x: -30,
        y: 10,
        z: -28
    });

    MeshModel.addMesh('sphere', {
        name: 'leoS',
        diameter: 8,
        scene: data.scene,
        texture: TexturesModel.all.leo,
        reverseRotate: true,
        x: 38,
        y: 8,
        z: -25
    });

    MeshModel.addMesh('sphere', {
        name: 'fennyS',
        diameter: 8,
        scene: data.scene,
        texture: TexturesModel.all.fenny,
        rotate: true,
        x: -20,
        y: 10,
        z: 28
    });

    MeshModel.addMesh('sphere', {
        name: 'indyS',
        diameter: 8,
        scene: data.scene,
        texture: TexturesModel.all.indy,
        reverseRotate: true,
        x: -28,
        y: 12,
        z: 18
    });

    MeshModel.addMesh('ground', {
        name: 'ground1',
        width: 150,
        height: 150,
        scene: this.scene,
        texture: TexturesModel.all.ground1
    });

    CamerasModel.addCamera({
        name: 'camera',
        position: new BABYLON.Vector3(0, 3, -40),
        scene: data.scene,
        canvas: data.canvas
    });
}

export default {createScene};
