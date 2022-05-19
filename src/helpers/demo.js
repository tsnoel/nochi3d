import * as BABYLON from 'babylonjs';

import CamerasModel from 'models/cameras';
import MeshModel from 'models/mesh';
import TexturesModel from 'models/textures';

function createScene(data) {
    const lights = [
        {type: 'PointLight', position: new BABYLON.Vector3(40, 30, -40),
            specular: new BABYLON.Color3(0.25, 0.25, 0.25), diffuse: new BABYLON.Color3.Teal()},
        {type: 'PointLight', position: new BABYLON.Vector3(-40, 30, 40),
            specular: new BABYLON.Color3(0.25, 0.25, 0.25), diffuse: new BABYLON.Color3.Magenta()},
        {type: 'HemisphericLight', position: new BABYLON.Vector3(0, 1, 0),
            specular: new BABYLON.Color3.Black(), diffuse: new BABYLON.Color3(0.3, 0.3, 0.3)}
        // {type: '', position: new BABYLON.Vector3(0, 0, 0), diffuse: new BABYLON.Color3(1, 1, 1),
        //     specular: new BABYLON.Color3(1, 1, 1), groundColor: new BABYLON.Color3(1, 1, 1)},
    ];

    lights.forEach((light, index) => {
        const l = new BABYLON[`${light.type}`](`${light.type}${index}`, light.position, data.scene);

        if (light.diffuse) { l.diffuse = light.diffuse; }
        if (light.specular) { l.specular = light.specular; }
        if (light.groundColor) { l.groundColor = light.groundColor; }
    });

    const grounds = [
        {name: 'ground1', width: 150, height: 150, texture: TexturesModel.all.ground1}
    ];

    grounds.forEach((ground) => {
        MeshModel.addMesh('ground', {
            ...ground,
            scene: data.scene
        });
    });

    const spheres = [
        {name: 'm',  diameter: 12, texture: TexturesModel.all.mochi,  rotate: true,        x: -15, y: 0,  z: 0},
        {name: 'm2', diameter: 6,  texture: TexturesModel.all.mochi2, reverseRotate: true, x: -15, y: 12, z: 0},
        {name: 'n',  diameter: 10, texture: TexturesModel.all.nori,   rotate: true,        x: 0,   y: 6,  z: 0},
        {name: 'n2', diameter: 50, texture: TexturesModel.all.nori2, x: 100, y: 25, z: -100},
        {name: 'g',  diameter: 9,  texture: TexturesModel.all.gregg,  rotate: true,        x: -30, y: 10, z: -28},
        {name: 'l',  diameter: 9,  texture: TexturesModel.all.leo,    reverseRotate: true, x: 38,  y: 8,  z: -25},
        {name: 'f',  diameter: 8,  texture: TexturesModel.all.fenny,  rotate: true,        x: -20, y: 10, z: 28},
        {name: 'i',  diameter: 8,  texture: TexturesModel.all.indy,   reverseRotate: true, x: -28, y: 12, z: 18}
    ];

    spheres.forEach((sphere) => {
        MeshModel.addMesh('sphere', {
            ...sphere,
            scene: data.scene
        });
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

    CamerasModel.addCamera({
        name: 'camera',
        position: new BABYLON.Vector3(0, 3, -40),
        scene: data.scene,
        canvas: data.canvas
    });
}

export default {createScene};
