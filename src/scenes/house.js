import * as BABYLON from 'babylonjs';

import CamerasModel from 'models/cameras';
import MeshModel from 'models/mesh';
import TexturesModel from 'models/textures';

let hasGCN = false;
const meshLabels = {
    'door_gar': 'Garage',
    'door_mud0': 'Laundry Room',
    'door_bra2': 'Orb Room',
    'door_brb4': 'Bedroom',
    'door_bha7': 'Bathroom',
    'door_brc2': 'Bathroom',
    'door_brc4': 'Closet',
    'door_brc6': 'Main Bedroom',
    'goal_liv8': 'House',
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
        {name: 'm', diameter: 12, texture: TexturesModel.all.mochi, rotate: true, position: new BABYLON.Vector3(-45, 6, 13)},
        {name: 'm2', diameter: 6,  texture: TexturesModel.all.mochi2, reverseRotate: true, position: new BABYLON.Vector3(-45, 12, 13)},
        {name: 'n', diameter: 10, texture: TexturesModel.all.nori, rotate: true, position: new BABYLON.Vector3(-55, 6, -5)},
        {name: 'n2', diameter: 8, texture: TexturesModel.all.nori2, reverseRotate: true, position: new BABYLON.Vector3(-70, 25, -10)},
        {name: 'g', diameter: 9, texture: TexturesModel.all.gregg, rotate: true, position: new BABYLON.Vector3(-70, 20, 10)},
        {name: 'l', diameter: 9, texture: TexturesModel.all.leo, reverseRotate: true, position: new BABYLON.Vector3(-60, 14, -20)},
        {name: 'f', diameter: 8, texture: TexturesModel.all.fenny, rotate: true, position: new BABYLON.Vector3(-40, 10, -10)},
        {name: 'i', diameter: 8, texture: TexturesModel.all.indy, reverseRotate: true, position: new BABYLON.Vector3(-40, 16, -20)}
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

    const materials = {
        'red': {color: new BABYLON.Color3.Red()},
        'green': {color: new BABYLON.Color3.Green()},
        'blue': {color: new BABYLON.Color3.Blue()},
        'yellow': {color: new BABYLON.Color3.Yellow()},
        'magenta': {color: new BABYLON.Color3.Magenta()}
    };

    Object.keys(materials).forEach((name) => {
        materials[name].material = new BABYLON.StandardMaterial(name, data.scene);
        materials[name].material.diffuseColor = materials[name].color;
    });

    const walls = [
        // Garage
        {name: 'gar0',  height: 20, width: 15, material: 'green', position: new BABYLON.Vector3(-22.5, 30, -30)},
        {name: 'door_gar', height: 20, width: 15, material: 'magenta', position: new BABYLON.Vector3(-22.5, 10, -30)},
        {name: 'gar1',  height: 40, width: 15, material: 'red',   position: new BABYLON.Vector3(-7.5, 20, -30)},
        {name: 'gar2',  height: 40, width: 20, material: TexturesModel.all.floors, position: new BABYLON.Vector3(0, 20, -40),
            tiled: true, u1: 6, u2: 3, rotate: true},
        {name: 'gar3',  height: 40, width: 60, material: TexturesModel.all.floors, position: new BABYLON.Vector3(0, 20, -80),
            tiled: true, u1: 0, u2: 3, rotate: true},
        {name: 'gar6',  height: 40, width: 80, material: 'red',   position: new BABYLON.Vector3(-40, 20, -110)},
        {name: 'gar9',  height: 40, width: 80, material: 'blue',  position: new BABYLON.Vector3(-80, 20, -70), rotate: true},
        {name: 'gar11', height: 40, width: 50, material: 'red',   position: new BABYLON.Vector3(-55, 20, -30)},

        // Laundry
        {name: 'mud0',  height: 20, width: 15, material: 'green', position: new BABYLON.Vector3(-22.5, 30, 0)},
        {name: 'door_mud0', height: 20, width: 15, material: 'magenta', position: new BABYLON.Vector3(-22.5, 10, 0)},
        {name: 'mud1',  height: 40, width: 15, material: 'red',   position: new BABYLON.Vector3(-7.5, 20, 0)},
        {name: 'mud3',  height: 40, width: 30, material: 'blue',  position: new BABYLON.Vector3(0, 20, -15), rotate: true},

        // Bedroom A
        {name: 'bra0',  height: 40, width: 50, material: 'red',   position: new BABYLON.Vector3(-55, 20, 20)},
        {name: 'bra1',  height: 40, width: 5,  material: 'blue',  position: new BABYLON.Vector3(-30, 20, 17.5), rotate: true},
        {name: 'bra2',  height: 20, width: 15, material: 'green', position: new BABYLON.Vector3(-30, 30, 7.5), rotate: true},
        {name: 'door_bra2', height: 20, width: 15, material: 'magenta', position: new BABYLON.Vector3(-30, 10, 7.5), rotate: true},
        {name: 'bra4',  height: 40, width: 30, material: 'blue',  position: new BABYLON.Vector3(-30, 20, -15), rotate: true},
        {name: 'bra9',  height: 40, width: 50, material: TexturesModel.all.ground1,  position: new BABYLON.Vector3(-80, 20, -5), rotate: true},

        // Bedroom B
        {name: 'brb0',  height: 40, width: 50, material: 'red',   position: new BABYLON.Vector3(-55, 20, 70)},
        {name: 'brb1',  height: 40, width: 30, material: 'blue',  position: new BABYLON.Vector3(-30, 20, 55), rotate: true},
        {name: 'brb4',  height: 20, width: 15, material: 'green', position: new BABYLON.Vector3(-30, 30, 32.5), rotate: true},
        {name: 'door_brb4', height: 20, width: 15, material: 'magenta', position: new BABYLON.Vector3(-30, 10, 32.5), rotate: true},
        {name: 'brb5',  height: 40, width: 5,  material: 'blue',  position: new BABYLON.Vector3(-30, 20, 22.5), rotate: true},
        {name: 'brb9',  height: 40, width: 50, material: 'blue',  position: new BABYLON.Vector3(-80, 20, 45), rotate: true},

        // Bathroom A
        {name: 'bha0',  height: 40, width: 20, material: 'red',   position: new BABYLON.Vector3(0, 20, 60)},
        {name: 'bha6',  height: 40, width: 20, material: 'red',   position: new BABYLON.Vector3(0, 20, 20)},
        {name: 'bha7',  height: 20, width: 15, material: 'green', position: new BABYLON.Vector3(-10, 30, 27.5), rotate: true},
        {name: 'door_bha7', height: 20, width: 15, material: 'magenta', position: new BABYLON.Vector3(-10, 10, 27.5), rotate: true},
        {name: 'bha10', height: 40, width: 25, material: 'blue',  position: new BABYLON.Vector3(-10, 20, 47.5), rotate: true},

        // Bedroom C
        {name: 'brc0',  height: 40, width: 70, material: 'red',   position: new BABYLON.Vector3(-45, 20, 130)},
        {name: 'brc1',  height: 40, width: 15, material: 'blue',  position: new BABYLON.Vector3(-10, 20, 122.5), rotate: true},
        {name: 'brc2',  height: 20, width: 15, material: 'green', position: new BABYLON.Vector3(-10, 30, 107.5), rotate: true},
        {name: 'door_brc2',  height: 20, width: 15, material: 'magenta', position: new BABYLON.Vector3(-10, 10, 107.5), rotate: true},
        {name: 'brc3',  height: 40, width: 10, material: 'blue',  position: new BABYLON.Vector3(-10, 20, 95), rotate: true},
        {name: 'brc4',  height: 20, width: 15, material: 'green', position: new BABYLON.Vector3(-10, 30, 82.5), rotate: true},
        {name: 'door_brc4',  height: 20, width: 15, material: 'magenta', position: new BABYLON.Vector3(-10, 10, 82.5), rotate: true},
        {name: 'brc5',  height: 40, width: 15, material: 'blue',  position: new BABYLON.Vector3(-10, 20, 67.5), rotate: true},
        {name: 'brc6',  height: 20, width: 20, material: 'green', position: new BABYLON.Vector3(-20, 30, 60)},
        {name: 'door_brc6',  height: 20, width: 20, material: 'magenta', position: new BABYLON.Vector3(-20, 10, 60)},
        {name: 'brc9',  height: 40, width: 60, material: 'blue',  position: new BABYLON.Vector3(-80, 20, 100), rotate: true},

        // Bathroom B
        {name: 'bhb0',  height: 40, width: 20, material: 'red',   position: new BABYLON.Vector3(0, 20, 90)},
        {name: 'bhb3',  height: 40, width: 40, material: 'blue',  position: new BABYLON.Vector3(30, 20, 110), rotate: true},
        {name: 'bhb6',  height: 40, width: 40, material: 'red',   position: new BABYLON.Vector3(10, 20, 130)},

        // Living Room
        {name: 'liv0',  height: 40, width: 50, material: TexturesModel.all.floors, position: new BABYLON.Vector3(55, 20, -50),
            tiled: true, u1: 6, u2: 0},
        {name: 'liv3',  height: 40, width: 80, material: TexturesModel.all.floors, position: new BABYLON.Vector3(80, 20, -90),
            rotate: true, tiled: true, u1: 2, u2: 0},
        {name: 'liv6',  height: 40, width: 60, material: TexturesModel.all.floors, position: new BABYLON.Vector3(50, 20, -130),
            tiled: true, u1: 0, u2: 2},
        {name: 'liv7',  height: 40, width: 20, material: TexturesModel.all.floors, position: new BABYLON.Vector3(20, 20, -120),
            rotate: true, tiled: true, u1: 0, u2: 2},
        {name: 'liv8',  height: 10, width: 20, material: TexturesModel.all.floors, position: new BABYLON.Vector3(10, 35, -110),
            tiled: true, u1: 0, u2: 2},
        {name: 'goal_liv8',  height: 30, width: 20, material: 'yellow', position: new BABYLON.Vector3(10, 15, -110)},
        {name: 'liv11',  height: 15, width: 30, material: TexturesModel.all.floors, position: new BABYLON.Vector3(15, 32.5, -50),
            tiled: true, u1: 6, u2: 0},

        // Kitchen
        {name: 'kit0',  height: 15, width: 30, material: 'yellow', position: new BABYLON.Vector3(50, 32.5, 20)},
        {name: 'kit1',  height: 7,  width: 30, material: 'yellow', position: new BABYLON.Vector3(50, 3.5, 20)},
        {name: 'kit2',  height: 40, width: 15, material: 'red',    position: new BABYLON.Vector3(72.5, 20, 20)},
        {name: 'kit3',  height: 40, width: 70, material: 'blue',   position: new BABYLON.Vector3(80, 20, -15), rotate: true},
        {name: 'kit10', height: 15, width: 20, material: 'green',  position: new BABYLON.Vector3(20, 32.5, 20)},
        {name: 'kit11', height: 40, width: 5,  material: 'red',    position: new BABYLON.Vector3(32.5, 20, 20)},

        // Family Room
        {name: 'fam0',  height: 40, width: 70, material: 'red',   position: new BABYLON.Vector3(45, 20, 90)},
        {name: 'fam3',  height: 40, width: 70, material: 'blue',  position: new BABYLON.Vector3(80, 20, 55), rotate: true},
        {name: 'fam9',  height: 40, width: 70, material: 'blue',  position: new BABYLON.Vector3(10, 20, 55), rotate: true},

        // Floor Roof
        {name: 'floor', height: 275, width: 175, material: TexturesModel.all.floors, position: new BABYLON.Vector3(0, 0, 0),
            tiled: true, u1: 2, u2: 2},
        {name: 'roof', height: 275, width: 175, material: TexturesModel.all.floors, position: new BABYLON.Vector3(0, 40, 0),
            tiled: true, u1: 7, u2: 5}
    ];

    walls.forEach((wall) => {
        let p;

        if (wall.tiled) {
            const faceUV = Array(5).fill(new BABYLON.Vector4.Zero());
            const columns = 8;
            const rows = 1;
            faceUV[0] = new BABYLON.Vector4((wall.u1 || 0) / columns, (wall.v1 || 0) / rows,
                ((wall.u1 || 0) + 1) / columns, ((wall.v1 || 0) + 1) / rows);
            faceUV[1] = new BABYLON.Vector4((wall.u2 || 0) / columns, (wall.v2 || 0) / rows,
                ((wall.u2 || 0) + 1) / columns, ((wall.v2 || 0) + 1) / rows);

            const options = {
                faceUV: faceUV,
                width: wall.width,
                height: wall.height,
                depth: 0.5,
                tileSize: 20
            };

            p = BABYLON.MeshBuilder.CreateTiledBox(wall.name, options);
        } else {
            p = BABYLON.MeshBuilder.CreateBox(wall.name, {
                height: wall.height, width: wall.width, depth: 0.5
            });
        }

        if (wall.material && (typeof wall.material) === 'string') {
            p.material = materials[wall.material].material;
        } else if (wall.material) {
            p.material = wall.material;
        }

        p.position = wall.position;
        p.rotation.y = wall.rotate ? Math.PI/2 : 0;
        p.rotation.x = wall.name === 'roof' || wall.name === 'floor' ? Math.PI/-2 : 0;
        p.checkCollisions = true;

        /*
        const p = BABYLON.MeshBuilder.CreateBox(wall.name, {
            height: wall.height, width: wall.width, depth: 0.5
        });

        if (wall.material && (typeof wall.material) === 'string') {
            p.material = materials[wall.material].material;
        } else if (wall.material) {
            p.material = wall.material;
        }

        p.position = wall.position;
        p.rotation.y = wall.rotate ? Math.PI/2 : 0;
        p.rotation.x = wall.name === 'roof' || wall.name === 'floor' ? Math.PI/-2 : 0;
        p.checkCollisions = true;
        */
    });

    const objs = [
        {name: 'lamp', path: 'assets/bioshock2/', file: 'light_ceiling.glb',
            position: new BABYLON.Vector3(40, 40, 45), scaling: new BABYLON.Vector3(0.15, 0.15, 0.15)},
        {name: 'froggy_chair', path: 'assets/', file: 'Froggy Chair.glb', size: 0.2,
            position: new BABYLON.Vector3(50, 0, 55),
            rotation: new BABYLON.Vector3(0, Math.PI/-1.5, 0),
            scaling: new BABYLON.Vector3(100, 100, 100)},
        {name: 'gcn', path: 'assets/', file: 'gamecube.glb', collision: true, size: 25, position: new BABYLON.Vector3(25, 0, 125),
            rotation: new BABYLON.Vector3(Math.PI/2, Math.PI/-1.5, 0), scaling: new BABYLON.Vector3(0.25, 0.25, 0.25)}
    ];

    objs.forEach((obj) => {
        BABYLON.SceneLoader.ImportMesh(null, obj.path, obj.file, data.scene, (newMeshes) => {
            const box = BABYLON.MeshBuilder.CreateBox(
                obj.name, {size: obj.size || 1}, data.scene
            );

            newMeshes.forEach((nm) => {nm.parent = box;});

            if (obj.position) {box.position = obj.position;}
            if (obj.rotation) {box.rotation = obj.rotation;}
            if (obj.scaling) {box.scaling = obj.scaling;}
            if (obj.collision) {box.checkCollisions = true;}
            box.visibility = 0;
        });
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

function getStartingPosition(playerHeight) {
    return new BABYLON.Vector3(10, playerHeight * 2.55, -100);
}

function handleFacingMesh(mesh) {
    if (mesh && mesh.name.includes('door_')) {
        const label = meshLabels[mesh.name] || mesh.name.replace('door_', '');

        return {mesh, action: () => {mesh.dispose();}, actionLabel: 'Open', key: 'e', label};
    } else if (mesh && mesh.name.includes('goal_')) {
        const label = meshLabels[mesh.name] || mesh.name.replace('goal_', '');

        return {mesh, action: () => {if (hasGCN) { mesh.dispose(); return false;} return 'I need to find the Gamecube to leave!';}, actionLabel: 'Leave', key: 'e', label};
    } else if (mesh && mesh.name === 'gcn') {
        const label = meshLabels[mesh.name] || mesh.name;

        return {mesh, action: () => {mesh.dispose(); hasGCN = true;}, actionLabel: 'Collect', key: 'e', label};
    } else if (mesh && mesh.name === 'froggy_chair') {
        const label = meshLabels[mesh.name] || mesh.name;

        return {mesh, action: () => {return 'I can\'t sit now... I need to find the Gamecube!';}, actionLabel: 'Sit on', key: 'e', label};
    }

    return undefined;
}

export default {createScene, handleFacingMesh};
