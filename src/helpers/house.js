import * as BABYLON from 'babylonjs';

import CamerasModel from 'models/cameras';
import MeshModel from 'models/mesh';
import TexturesModel from 'models/textures';

function createScene(data) {
    const lights = [
        // {type: 'PointLight', position: new BABYLON.Vector3(40, 30, -40),
        //     specular: new BABYLON.Color3(0.25, 0.25, 0.25), diffuse: new BABYLON.Color3.Teal()},
        // {type: 'PointLight', position: new BABYLON.Vector3(-40, 30, 40),
        //     specular: new BABYLON.Color3(0.25, 0.25, 0.25), diffuse: new BABYLON.Color3.Magenta()},
        {type: 'HemisphericLight', position: new BABYLON.Vector3(0, 1, 0),
            specular: new BABYLON.Color3.Black(), diffuse: new BABYLON.Color3(1, 1, 1)}
    ];

    lights.forEach((light, index) => {
        const l = new BABYLON[`${light.type}`](`${light.type}${index}`, light.position, data.scene);

        if (light.diffuse) { l.diffuse = light.diffuse; }
        if (light.specular) { l.specular = light.specular; }
        if (light.groundColor) { l.groundColor = light.groundColor; }
    });

    const grounds = [
        {name: 'mainGround', width: 175, height: 275}
    ];

    grounds.forEach((ground) => {
        MeshModel.addMesh('ground', {
            ...ground,
            scene: data.scene
        });
    });

    const materials = {
        'red': {color: new BABYLON.Color3.Red()},
        'green': {color: new BABYLON.Color3.Green()},
        'blue': {color: new BABYLON.Color3.Blue()},
        'yellow': {color: new BABYLON.Color3.Yellow()}
    };

    Object.keys(materials).forEach((name) => {
        materials[name].material = new BABYLON.StandardMaterial(name, data.scene);
        materials[name].material.diffuseColor = materials[name].color;
    });

    const walls = [
        {name: 'garage1', height: 40, width: 15, material: 'red', position: new BABYLON.Vector3(-7.5, 20, -30)},
        {name: 'garage12', height: 20, width: 15, material: 'green', position: new BABYLON.Vector3(-22.5, 30, -30)},
        {name: 'garage11', height: 40, width: 50, material: 'red', position: new BABYLON.Vector3(-55, 20, -30)},
        {name: 'garage9', height: 40, width: 80, material: 'blue', position: new BABYLON.Vector3(-80, 20, -70), rotate: true},
        {name: 'garage6', height: 40, width: 80, material: 'red', position: new BABYLON.Vector3(-40, 20, -110)},
        {name: 'garage3', height: 40, width: 80, material: 'blue', position: new BABYLON.Vector3(0, 20, -70), rotate: true},
        {name: 'bra9', height: 40, width: 50, material: 'blue', position: new BABYLON.Vector3(-80, 20, -5), rotate: true},
        {name: 'bra12', height: 40, width: 50, material: 'red', position: new BABYLON.Vector3(-55, 20, 20)},
        {name: 'bra4', height: 40, width: 30, material: 'blue', position: new BABYLON.Vector3(-30, 20, -15), rotate: true},
        {name: 'bra1', height: 40, width: 5, material: 'blue', position: new BABYLON.Vector3(-30, 20, 17.5), rotate: true},
        {name: 'bra2', height: 20, width: 15, material: 'green', position: new BABYLON.Vector3(-30, 30, 7.5), rotate: true},
        {name: 'laundry3', height: 40, width: 30, material: 'blue', position: new BABYLON.Vector3(0, 20, -15), rotate: true},
        {name: 'laundry1', height: 40, width: 15, material: 'red', position: new BABYLON.Vector3(-7.5, 20, 0)},
        {name: 'laundry12', height: 20, width: 15, material: 'green', position: new BABYLON.Vector3(-22.5, 30, 0)},
        {name: 'brb9', height: 40, width: 50, material: 'blue', position: new BABYLON.Vector3(-80, 20, 45), rotate: true},
        {name: 'brb5', height: 40, width: 5, material: 'blue', position: new BABYLON.Vector3(-30, 20, 22.5), rotate: true},
        {name: 'brb4', height: 20, width: 15, material: 'green', position: new BABYLON.Vector3(-30, 30, 32.5), rotate: true},
        {name: 'brb12', height: 40, width: 50, material: 'red', position: new BABYLON.Vector3(-55, 20, 70)},
        {name: 'brb1', height: 40, width: 30, material: 'blue', position: new BABYLON.Vector3(-30, 20, 55), rotate: true},
        {name: 'living6', height: 40, width: 60, material: 'red', position: new BABYLON.Vector3(50, 20, -130)},
        {name: 'living7', height: 40, width: 20, material: 'blue', position: new BABYLON.Vector3(20, 20, -120), rotate: true},
        {name: 'living8', height: 40, width: 20, material: 'yellow', position: new BABYLON.Vector3(10, 20, -110)},
        {name: 'living3', height: 40, width: 80, material: 'blue', position: new BABYLON.Vector3(80, 20, -90), rotate: true},
        {name: 'living12', height: 40, width: 50, material: 'red', position: new BABYLON.Vector3(55, 20, -50)},
        {name: 'kitchen3', height: 40, width: 70, material: 'blue', position: new BABYLON.Vector3(80, 20, -15), rotate: true},
        {name: 'kitchen12', height: 20, width: 40, material: 'yellow', position: new BABYLON.Vector3(50, 30, 20)},
        {name: 'kitchen1', height: 5, width: 40, material: 'yellow', position: new BABYLON.Vector3(50, 2.5, 20)},
        {name: 'kitchen2', height: 40, width: 10, material: 'red', position: new BABYLON.Vector3(75, 20, 20)},
        {name: 'family3', height: 40, width: 70, material: 'blue', position: new BABYLON.Vector3(80, 20, 55), rotate: true},
        {name: 'family9', height: 40, width: 70, material: 'blue', position: new BABYLON.Vector3(10, 20, 55), rotate: true},
        {name: 'family12', height: 40, width: 70, material: 'red', position: new BABYLON.Vector3(45, 20, 90)},
        {name: 'batha6', height: 40, width: 20, material: 'red', position: new BABYLON.Vector3(0, 20, 20)},
        {name: 'batha6', height: 40, width: 20, material: 'red', position: new BABYLON.Vector3(0, 20, 20)},
        {name: 'batha12', height: 40, width: 20, material: 'red', position: new BABYLON.Vector3(0, 20, 60)},
        {name: 'batha7', height: 20, width: 15, material: 'green', position: new BABYLON.Vector3(-10, 30, 27.5), rotate: true},
        {name: 'batha10', height: 40, width: 25, material: 'blue', position: new BABYLON.Vector3(-10, 20, 47.5), rotate: true},
        {name: 'bathb12', height: 40, width: 20, material: 'red', position: new BABYLON.Vector3(0, 20, 90)},
        {name: 'brc1', height: 40, width: 15, material: 'blue', position: new BABYLON.Vector3(-10, 20, 122.5), rotate: true},
        {name: 'brc2', height: 20, width: 15, material: 'green', position: new BABYLON.Vector3(-10, 30, 107.5), rotate: true},
        {name: 'brc3', height: 40, width: 10, material: 'blue', position: new BABYLON.Vector3(-10, 20, 95), rotate: true},
        {name: 'brc4', height: 20, width: 15, material: 'green', position: new BABYLON.Vector3(-10, 30, 82.5), rotate: true},
        {name: 'brc5', height: 40, width: 15, material: 'blue', position: new BABYLON.Vector3(-10, 20, 67.5), rotate: true},
        {name: 'brc9', height: 40, width: 60, material: 'blue', position: new BABYLON.Vector3(-80, 20, 100), rotate: true},
        {name: 'brc12', height: 40, width: 70, material: 'red', position: new BABYLON.Vector3(-45, 20, 130)},
        {name: 'bathb3', height: 40, width: 40, material: 'blue', position: new BABYLON.Vector3(30, 20, 110), rotate: true},
        {name: 'bathb3', height: 40, width: 40, material: 'red', position: new BABYLON.Vector3(10, 20, 130)},
        {name: 'bathb3', height: 40, width: 40, material: 'red', position: new BABYLON.Vector3(10, 20, 130)},
        {name: 'roof', height: 275, width: 175, material: 'yellow', position: new BABYLON.Vector3(0, 40, 0)}
    ];

    walls.forEach((wall) => {
        const p = BABYLON.MeshBuilder.CreateBox(wall.name, {
            height: wall.height, width: wall.width, depth: 0.5
        });

        p.material = materials[wall.material].material;
        p.position = wall.position;
        p.rotation.y = wall.rotate ? Math.PI/2 : 0;
        p.rotation.x = wall.name === 'roof' ? Math.PI/-2 : 0;
        p.checkCollisions = true;
    });

    CamerasModel.addCamera({
        name: 'camera',
        position: new BABYLON.Vector3(10, 3, -100),
        scene: data.scene,
        canvas: data.canvas
    });

    // CamerasModel.all.camera.onCollide = (mesh) => {
    //     console.log(mesh);
    // }
}

export default {createScene};
