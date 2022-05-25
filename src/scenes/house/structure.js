import * as BABYLON from 'babylonjs';

import TexturesModel from 'models/textures';

const meshLabels = {
    'door_gar': 'Garage',
    'door_mud0': 'Laundry Room',
    'door_bra2': 'Orb Room',
    'door_brb4': 'Bedroom',
    'door_bha7': 'Bathroom',
    'door_brc2': 'Bathroom',
    'door_brc4': 'Closet',
    'door_brc6': 'Main Bedroom',
    'goal_liv8': 'House'
};

const materials = {
    'red': {color: new BABYLON.Color3.Red()},
    'green': {color: new BABYLON.Color3.Green()},
    'blue': {color: new BABYLON.Color3.Blue()},
    'yellow': {color: new BABYLON.Color3.Yellow()},
    'magenta': {color: new BABYLON.Color3.Magenta()}
};

const wallMap = {
    'kitchen': {u: 0, v: 0},
    'living': {u: 2, v: 0},
    'outside': {u: 3, v: 5},
    'orb': {u: 14, v: 1},
    'family': {u: 6, v: 2},
    'bathroom1': {u: 3, v: 4},
    'bathroom2': {u: 6, v:1},
    'laundry': {u: 7, v: 6},
    'hall': {u: 0, v: 6},
    'garage': {u: 12, v: 6},
    'bedroom2': {u: 10, v: 1},
    'bedroom3': {u: 12, v: 3},
    'closet': {u: 15, v: 4}
};

const floors = [
    // Floor Roof
    {name: 'floor', height: 275, width: 175, material: TexturesModel.all.floors, position: new BABYLON.Vector3(0, 0, 0),
        coordinates: {map: 'floors', a: {u: 2}, b: {u: 2}}},
    {name: 'roof', height: 275, width: 175, material: TexturesModel.all.floors, position: new BABYLON.Vector3(0, 40, 0),
        coordinates: {map: 'floors', a: {u: 7}, b: {u: 5}}}
];

const walls = [
    // Garage
    {name: 'gar0', height: 20, width: 15, position: new BABYLON.Vector3(-22.5, 30, -30),
        coordinates: {map: 'walls', a: wallMap.laundry, b: wallMap.garage}},
    {name: 'door_gar', height: 20, width: 15, position: new BABYLON.Vector3(-22.5, 10, -30),
        material: 'magenta'}, // ====================================
    {name: 'gar1', height: 40, width: 15, position: new BABYLON.Vector3(-7.5, 20, -30),
        coordinates: {map: 'walls', a: wallMap.laundry, b: wallMap.garage}},
    {name: 'gar2', height: 40, width: 20, position: new BABYLON.Vector3(0, 20, -40), rotate: true,
        coordinates: {map: 'walls', a: wallMap.kitchen, b: wallMap.garage}},
    {name: 'gar3', height: 40, width: 60, position: new BABYLON.Vector3(0, 20, -80), rotate: true,
        coordinates: {map: 'walls', a: wallMap.living, b: wallMap.garage}},
    {name: 'gar6', height: 40, width: 80, position: new BABYLON.Vector3(-40, 20, -110),
        coordinates: {map: 'walls', a: wallMap.garage, b: wallMap.outside}},
    {name: 'gar9', height: 40, width: 80, position: new BABYLON.Vector3(-80, 20, -70), rotate: true,
        coordinates: {map: 'walls', a: wallMap.garage, b: wallMap.outside}},
    {name: 'gar11', height: 40, width: 50, position: new BABYLON.Vector3(-55, 20, -30),
        coordinates: {map: 'walls', a: wallMap.orb, b: wallMap.garage}},

    // Laundry
    {name: 'mud0', height: 20, width: 15, position: new BABYLON.Vector3(-22.5, 30, 0),
        coordinates: {map: 'walls', a: wallMap.hall, b: wallMap.laundry}},
    {name: 'door_mud0', height: 20, width: 15, position: new BABYLON.Vector3(-22.5, 10, 0),
        material: 'magenta'}, // ====================================
    {name: 'mud1', height: 40, width: 15, position: new BABYLON.Vector3(-7.5, 20, 0),
        coordinates: {map: 'walls', a: wallMap.hall, b: wallMap.laundry}},
    {name: 'mud3', height: 40, width: 30, position: new BABYLON.Vector3(0, 20, -15), rotate: true,
        coordinates: {map: 'walls', a: wallMap.kitchen, b: wallMap.laundry}},

    // Bedroom A
    {name: 'bra0', height: 40, width: 50, position: new BABYLON.Vector3(-55, 20, 20),
        coordinates: {map: 'walls', a: wallMap.bedroom2, b: wallMap.orb}},
    {name: 'bra1', height: 40, width: 5, position: new BABYLON.Vector3(-30, 20, 17.5), rotate: true,
        coordinates: {map: 'walls', a: wallMap.hall, b: wallMap.orb}},
    {name: 'bra2', height: 20, width: 15, position: new BABYLON.Vector3(-30, 30, 7.5), rotate: true,
        coordinates: {map: 'walls', a: wallMap.hall, b: wallMap.orb}},
    {name: 'door_bra2', height: 20, width: 15, position: new BABYLON.Vector3(-30, 10, 7.5), rotate: true,
        material: 'magenta'}, // ====================================
    {name: 'bra4', height: 40, width: 30, position: new BABYLON.Vector3(-30, 20, -15), rotate: true,
        coordinates: {map: 'walls', a: wallMap.laundry, b: wallMap.orb}},
    {name: 'bra9', height: 40, width: 50, position: new BABYLON.Vector3(-80, 20, -5), rotate: true,
        coordinates: {map: 'walls', a: wallMap.orb, b: wallMap.outside}},

    // Bedroom B
    {name: 'brb0', height: 40, width: 50, position: new BABYLON.Vector3(-55, 20, 70),
        material: 'red'}, // ====================================
    {name: 'brb1', height: 40, width: 30, position: new BABYLON.Vector3(-30, 20, 55), rotate: true,
        material: 'blue'}, // ====================================
    {name: 'brb4', height: 20, width: 15, position: new BABYLON.Vector3(-30, 30, 32.5), rotate: true,
        material: 'green'}, // ====================================
    {name: 'door_brb4', height: 20, width: 15, position: new BABYLON.Vector3(-30, 10, 32.5), rotate: true,
        material: 'magenta'}, // ====================================
    {name: 'brb5', height: 40, width: 5, position: new BABYLON.Vector3(-30, 20, 22.5), rotate: true,
        material: 'blue'}, // ====================================
    {name: 'brb9', height: 40, width: 50, position: new BABYLON.Vector3(-80, 20, 45), rotate: true,
        material: 'blue'}, // ====================================

    // Bathroom A
    {name: 'bha0', height: 40, width: 20, position: new BABYLON.Vector3(0, 20, 60),
        coordinates: {map: 'walls', a: wallMap.closet, b: wallMap.bathroom1}},
    {name: 'bha6', height: 40, width: 20, position: new BABYLON.Vector3(0, 20, 20),
        coordinates: {map: 'walls', a: wallMap.bathroom1, b: wallMap.kitchen}},
    {name: 'bha7', height: 20, width: 15, position: new BABYLON.Vector3(-10, 30, 27.5), rotate: true,
        coordinates: {map: 'walls', a: wallMap.bathroom1, b: wallMap.hall}},
    {name: 'door_bha7', height: 20, width: 15, position: new BABYLON.Vector3(-10, 10, 27.5), rotate: true,
        material: 'magenta'}, // ====================================
    {name: 'bha10', height: 40, width: 25, position: new BABYLON.Vector3(-10, 20, 47.5), rotate: true,
        coordinates: {map: 'walls', a: wallMap.bathroom1, b: wallMap.hall}},

    // Bedroom C
    {name: 'brc0', height: 40, width: 70, position: new BABYLON.Vector3(-45, 20, 130),
        material: 'red'}, // ====================================
    {name: 'brc1', height: 40, width: 15, position: new BABYLON.Vector3(-10, 20, 122.5), rotate: true,
        material: 'blue'}, // ====================================
    {name: 'brc2', height: 20, width: 15, position: new BABYLON.Vector3(-10, 30, 107.5), rotate: true,
        material: 'green'}, // ====================================
    {name: 'door_brc2', height: 20, width: 15, position: new BABYLON.Vector3(-10, 10, 107.5), rotate: true,
        material: 'magenta'}, // ====================================
    {name: 'brc3', height: 40, width: 10, position: new BABYLON.Vector3(-10, 20, 95), rotate: true,
        material: 'blue'}, // ====================================
    {name: 'brc4', height: 20, width: 15, position: new BABYLON.Vector3(-10, 30, 82.5), rotate: true,
        material: 'green'}, // ====================================
    {name: 'door_brc4',  height: 20, width: 15, position: new BABYLON.Vector3(-10, 10, 82.5), rotate: true,
        material: 'magenta'}, // ====================================
    {name: 'brc5', height: 40, width: 15, position: new BABYLON.Vector3(-10, 20, 67.5), rotate: true,
        material: 'blue'}, // ====================================
    {name: 'brc6', height: 20, width: 20, position: new BABYLON.Vector3(-20, 30, 60),
        material: 'green'}, // ====================================
    {name: 'door_brc6', height: 20, width: 20, position: new BABYLON.Vector3(-20, 10, 60),
        material: 'magenta'}, // ====================================
    {name: 'brc9', height: 40, width: 60, position: new BABYLON.Vector3(-80, 20, 100), rotate: true,
        material: 'blue'}, // ====================================

    // Bathroom B
    {name: 'bhb6',  height: 40, width: 20, position: new BABYLON.Vector3(0, 20, 90),
        coordinates: {map: 'walls', a: wallMap.bathroom2, b: wallMap.closet}},
    {name: 'bhb3',  height: 40, width: 40, position: new BABYLON.Vector3(30, 20, 110), rotate: true,
        coordinates: {map: 'walls', a: wallMap.outside, b: wallMap.bathroom2}},
    {name: 'bhb0',  height: 40, width: 40, position: new BABYLON.Vector3(10, 20, 130),
        coordinates: {map: 'walls', a: wallMap.outside, b: wallMap.bathroom2}},

    // Living Room
    {name: 'liv0',  height: 40, width: 50, position: new BABYLON.Vector3(55, 20, -50),
        coordinates: {map: 'walls', a: wallMap.kitchen, b: wallMap.living}},
    {name: 'liv3',  height: 40, width: 80, position: new BABYLON.Vector3(80, 20, -90), rotate: true,
        coordinates: {map: 'walls', a: wallMap.outside, b: wallMap.living}},
    {name: 'liv6',  height: 40, width: 60, position: new BABYLON.Vector3(50, 20, -130),
        coordinates: {map: 'walls', a: wallMap.living, b: wallMap.outside}},
    {name: 'liv7',  height: 40, width: 20, position: new BABYLON.Vector3(20, 20, -120), rotate: true,
        coordinates: {map: 'walls', a: wallMap.living, b: wallMap.outside}},
    {name: 'liv8',  height: 10, width: 20, position: new BABYLON.Vector3(10, 35, -110),
        coordinates: {map: 'walls', a: wallMap.living, b: wallMap.outside}},
    {name: 'goal_liv8',  height: 30, width: 20, position: new BABYLON.Vector3(10, 15, -110),
        material: 'yellow'}, // ====================================
    {name: 'liv1',  height: 15, width: 30, position: new BABYLON.Vector3(15, 32.5, -50),
        coordinates: {map: 'walls', a: wallMap.kitchen, b: wallMap.living}},

    // Kitchen
    {name: 'kit0', height: 15, width: 30, position: new BABYLON.Vector3(50, 32.5, 20),
        coordinates: {map: 'walls', a: wallMap.family, b: wallMap.kitchen}},
    {name: 'kit1', height: 7,  width: 30, position: new BABYLON.Vector3(50, 3.5, 20),
        coordinates: {map: 'walls', a: wallMap.family, b: wallMap.kitchen, isBottom: true}},
    {name: 'kit2', height: 40, width: 15, position: new BABYLON.Vector3(72.5, 20, 20),
        coordinates: {map: 'walls', a: wallMap.family, b: wallMap.kitchen}},
    {name: 'kit3', height: 40, width: 70, position: new BABYLON.Vector3(80, 20, -15), rotate: true,
        coordinates: {map: 'walls', a: wallMap.outside, b: wallMap.kitchen}},
    {name: 'kit10', height: 15, width: 20, position: new BABYLON.Vector3(20, 32.5, 20),
        coordinates: {map: 'walls', a: wallMap.family, b: wallMap.kitchen}},
    {name: 'kit11', height: 40, width: 5, position: new BABYLON.Vector3(32.5, 20, 20),
        coordinates: {map: 'walls', a: wallMap.family, b: wallMap.kitchen}},

    // Family Room
    {name: 'fam0',  height: 40, width: 70, position: new BABYLON.Vector3(45, 20, 90),
        coordinates: {map: 'walls', a: wallMap.outside, b: wallMap.family}},
    {name: 'fam3',  height: 40, width: 70, position: new BABYLON.Vector3(80, 20, 55), rotate: true,
        coordinates: {map: 'walls', a: wallMap.outside, b: wallMap.family}},
    {name: 'fam9',  height: 40, width: 70, position: new BABYLON.Vector3(10, 20, 55), rotate: true,
        coordinates: {map: 'walls', a: wallMap.family, b: wallMap.bathroom1}},
];

function patternOptions(coordinates, tileMap) {
    const faceUV = Array(6).fill(new BABYLON.Vector4.Zero());

    faceUV[0] = new BABYLON.Vector4(
        (coordinates.a.u || 0) / tileMap.columns,
        (coordinates.a.v || 0) / tileMap.rows,
        ((coordinates.a.u || 0) + 1) / tileMap.columns,
        ((coordinates.a.v || 0) + 1) / tileMap.rows
    );

    faceUV[1] = new BABYLON.Vector4(
        (coordinates.b.u || 0) / tileMap.columns,
        (coordinates.b.v || 0) / tileMap.rows,
        ((coordinates.b.u || 0) + 1) / tileMap.columns,
        ((coordinates.b.v || 0) + 1) / tileMap.rows
    );

    console.log(faceUV);

    return {
        alignVertical: coordinates.isBottom ? BABYLON.Mesh.BOTTOM : BABYLON.Mesh.TOP,
        faceUV: faceUV,
        tileHeight: tileMap.tileHeight,
        tileWidth: tileMap.tileWidth
    };
}

function createStructure(scene) {
    Object.keys(materials).forEach((name) => {
        materials[name].material = new BABYLON.StandardMaterial(name, scene);
        materials[name].material.diffuseColor = materials[name].color;
    });

    const tileMaps = {
        'floors': {columns: 8, rows: 1, tileHeight: 40, tileWidth: 40, material: TexturesModel.all.floors},
        'walls': {columns: 16, rows: 7, tileHeight: 40, tileWidth: 20, material: TexturesModel.all.walls}
    };

    [...walls, ...floors].forEach((wall) => {
        let p;
        const standardOptions = {height: wall.height, width: wall.width, depth: 0.5};

        if (wall.material && (typeof wall.material) === 'string') {
            p = BABYLON.MeshBuilder.CreateBox(wall.name, standardOptions);

            p.material = materials[wall.material].material;
        } else if (wall.coordinates) {
            const options = {
                ...standardOptions,
                ...patternOptions(wall.coordinates, tileMaps[wall.coordinates.map])
            };

            console.log(options, wall.coordinates.map, {...TexturesModel.all.floors});

            p = BABYLON.MeshBuilder.CreateTiledBox(wall.name, options);

            p.material = tileMaps[wall.coordinates.map].material;
        }

        p.position = wall.position;
        p.rotation.y = wall.rotate ? Math.PI/2 : 0;
        p.rotation.x = wall.name === 'roof' || wall.name === 'floor' ? Math.PI/-2 : 0;
        p.checkCollisions = true;
    });
}

export default {createStructure, meshLabels};
