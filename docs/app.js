(function(){"use strict";var e={4036:function(e,t,i){var n=i(9963),o=i(6252),a=i(3577);const r=(0,o._)("canvas",{class:"game",id:"game"},null,-1),s=(0,o._)("div",{class:"cross"},[(0,o._)("div",null,"+")],-1),h={key:0,class:"text"},l={key:1,class:"text"};function c(e,t,i,n,c,m){return(0,o.wg)(),(0,o.iD)(o.HY,null,[r,s,c.interact&&!c.message?((0,o.wg)(),(0,o.iD)("div",h,[(0,o._)("div",null,"Press '"+(0,a.zw)(c.interact.key.toUpperCase())+"'",1),(0,o._)("div",null,(0,a.zw)(c.interact.actionLabel)+" "+(0,a.zw)(c.interact.label),1)])):c.message?((0,o.wg)(),(0,o.iD)("div",l,[(0,o._)("div",null,(0,a.zw)(c.message),1)])):(0,o.kq)("",!0)],64)}var m=i(5385),d=i(1125);i(2001),i(6699);class u{constructor(){this.all={},this.jump=new m.Animation("jump","position.y",60,m.Animation.ANIMATIONTYPE_FLOAT,m.Animation.ANIMATIONLOOPMODE_CYCLE);const e=new m.CircleEase;e.setEasingMode(m.EasingFunction.EASINGMODE_EASEOUT),this.jump.setEasingFunction(e)}addCamera(e){this.all[e.name]=this.setupCamera(e),this.addCameraWASD(e.name)}addCameraWASD(e){this.all[e].keysUp.push(87),this.all[e].keysDown.push(83),this.all[e].keysRight.push(68),this.all[e].keysLeft.push(65)}addPointerLock(e,t){e.onPointerDown=()=>{t.requestPointerLock=t.requestPointerLock||t.msRequestPointerLock||t.mozRequestPointerLock||t.webkitRequestPointerLock,t.requestPointerLock&&t.requestPointerLock()}}getGroundDistance(e,t){const i=this.all[e].position,n=m.Vector3.Down(),o=300,a=new m.Ray(i,n,o),r=t.pickWithRay(a);return r.distance}getFacingMesh(e,t){const i=t.createPickingRay(t.pointerX,t.pointerY,m.Matrix.Identity(),this.all[e]),n=t.pickWithRay(i);if(n.distance<30)return n.pickedMesh}setupCamera(e){const t=new m.UniversalCamera(e.name,e.position||new m.Vector3(0,2*e.playerHeight,0),e.scene);return t.inertia=.3,t.angularSensibility=800,t.speed=10,t.setTarget(new m.Vector3(0,10,0)),t.applyGravity=!0,t._needMoveForGravity=!0,t.ellipsoid=new m.Vector3(1.5,e.playerHeight,1.5),t.checkCollisions=!0,t.attachControl(e.canvas,!0),t}}const p=new u;var g=p;class w{constructor(){this.ground={},this.imported={},this.sphere={},this.rotateSphere=new m.Animation("rotateSphere","rotation.y",10,m.Animation.ANIMATIONTYPE_FLOAT,m.Animation.ANIMATIONLOOPMODE_CYCLE),this.rotateSphere.setKeys([{frame:0,value:0},{frame:100,value:2*Math.PI}]),this.reverseRotateSphere=new m.Animation("rotateSphere","rotation.y",10,m.Animation.ANIMATIONTYPE_FLOAT,m.Animation.ANIMATIONLOOPMODE_CYCLE),this.reverseRotateSphere.setKeys([{frame:0,value:0},{frame:100,value:-2*Math.PI}])}addMesh(e,t){"ground"===e?this[e][t.name]=this.setupGround(t):"sphere"===e?this[e][t.name]=this.setupSphere(t):"imported"===e?this[e][t.name]=this.setupImported(t):"tiledground"===e?this.ground[t.name]=this.setupTiledGround(t):this[e][t.name]={}}setTexture(e,t,i){this[e][t].material=i}setupGround(e){let t=m.Mesh.CreateGround(e.name,e.width||100,e.height||100,e.subdivision||0,e.scene,e.updatable||!1);return e.texture&&(t.material=e.texture),t.checkCollisions=!0,t}setupImported(e){m.SceneLoader.ImportMesh(null,e.path,e.file,e.scene,(t=>{this.imported[e.name]=m.MeshBuilder.CreateBox(e.name,{size:e.size||1},this.scene),t.forEach((t=>{t.parent=this.imported[e.name]})),e.position&&(this.imported[e.name].position=e.position),e.rotation&&(this.imported[e.name].rotation=e.rotation),e.scaling&&(this.imported[e.name].scaling=e.scaling),this.imported[e.name].visibility=0,this.imported[e.name].checkCollisions=!0}))}setupSphere(e){const t=m.MeshBuilder.CreateBox(e.name,{size:e.diameter||1},e.scene);t.position.x=e.x||0,t.position.y=e.y||e.diameter/2||0,t.position.z=e.z||0,t.checkCollisions=!0,t.visibility=0;const i=m.Mesh.CreateSphere(`${e.name}_inner`,e.segment||16,e.diameter||1,e.scene,e.updatable||!1,e.sideOrientation||m.Mesh.FRONTSIDE);return e.texture&&(i.material=e.texture),e.rotate?(i.animations.push(this.rotateSphere),e.scene.beginAnimation(i,0,100,!0)):e.reverseRotate&&(i.animations.push(this.reverseRotateSphere),e.scene.beginAnimation(i,0,100,!0)),i.parent=t,t}setupTiledGround(e){const t={h:8,w:8},i=new m.MeshBuilder.CreateTiledGround(e.name,{xmin:-3,zmin:-3,xmax:3,zmax:3,subdivisions:t}),n=new m.MultiMaterial("multi",e.scene);n.subMaterials.push(e.texture),i.material=n;const o=i.getTotalVertices(),a=i.getIndices().length/(t.w*t.h);i.subMeshes=[];let r=0;for(let s=0;s<t.h;s++)for(let e=0;e<t.w;e++)i.subMeshes.push(new m.SubMesh(s%2^e%2,0,o,r,a,i)),r+=a;return i.checkCollisions=!0,i}}const f=new w;var b=f;class y{constructor(){this.all={}}addTexture(e){return this.all[e.name]=this.setupTexture(e),this.all[e.name]}setAsset(e,t){const i=new m.Texture(t.asset,t.scene);setTimeout((()=>{i.updateSamplingMode(1)}),1e3),e.diffuseTexture=i}setupTexture(e){let t=new m.StandardMaterial(this.name,this.scene);return e.asset&&this.setAsset(t,e),t}}const v=new y;var V=v;let k=!1;const C={door_gar:"Garage",door_mud0:"Laundry Room",door_bra2:"Orb Room",door_brb4:"Bedroom",door_bha7:"Bathroom",door_brc2:"Bathroom",door_brc4:"Closet",door_brc6:"Main Bedroom",goal_liv8:"House",gcn:"Gamecube",froggy_chair:"Chair"};function M(e){const t=[{type:"HemisphericLight",position:new m.Vector3(0,1,0),specular:new m.Color3.Black,diffuse:new m.Color3(.5,.5,.5)},{type:"HemisphericLight",position:new m.Vector3(0,-1,0),specular:new m.Color3.Black,diffuse:new m.Color3(.75,.75,.75)}];t.forEach(((t,i)=>{const n=new m[`${t.type}`](`${t.type}${i}`,t.position,e.scene);t.diffuse&&(n.diffuse=t.diffuse),t.specular&&(n.specular=t.specular),t.groundColor&&(n.groundColor=t.groundColor)}));const i=[{name:"m",diameter:12,texture:V.all.mochi,rotate:!0,position:new m.Vector3(-45,6,13)},{name:"m2",diameter:6,texture:V.all.mochi2,reverseRotate:!0,position:new m.Vector3(-45,12,13)},{name:"n",diameter:10,texture:V.all.nori,rotate:!0,position:new m.Vector3(-55,6,-5)},{name:"n2",diameter:8,texture:V.all.nori2,reverseRotate:!0,position:new m.Vector3(-70,25,-10)},{name:"g",diameter:9,texture:V.all.gregg,rotate:!0,position:new m.Vector3(-70,20,10)},{name:"l",diameter:9,texture:V.all.leo,reverseRotate:!0,position:new m.Vector3(-60,14,-20)},{name:"f",diameter:8,texture:V.all.fenny,rotate:!0,position:new m.Vector3(-40,10,-10)},{name:"i",diameter:8,texture:V.all.indy,reverseRotate:!0,position:new m.Vector3(-40,16,-20)}];i.forEach((t=>{const i=m.Mesh.CreateSphere(`${t.name}_inner`,t.segment||16,t.diameter||1,t.scene,t.updatable||!1,m.Mesh.FRONTSIDE);i.position=t.position,t.texture&&(i.material=t.texture),t.rotate?(i.animations.push(b.rotateSphere),e.scene.beginAnimation(i,0,100,!0)):t.reverseRotate&&(i.animations.push(b.reverseRotateSphere),e.scene.beginAnimation(i,0,100,!0))}));const n={red:{color:new m.Color3.Red},green:{color:new m.Color3.Green},blue:{color:new m.Color3.Blue},yellow:{color:new m.Color3.Yellow},magenta:{color:new m.Color3.Magenta}};Object.keys(n).forEach((t=>{n[t].material=new m.StandardMaterial(t,e.scene),n[t].material.diffuseColor=n[t].color}));const o=[{name:"gar0",height:20,width:15,material:"green",position:new m.Vector3(-22.5,30,-30)},{name:"door_gar",height:20,width:15,material:"magenta",position:new m.Vector3(-22.5,10,-30)},{name:"gar1",height:40,width:15,material:"red",position:new m.Vector3(-7.5,20,-30)},{name:"gar2",height:40,width:20,material:V.all.floors,position:new m.Vector3(0,20,-40),tiled:!0,u1:6,u2:3,rotate:!0},{name:"gar3",height:40,width:60,material:V.all.floors,position:new m.Vector3(0,20,-80),tiled:!0,u1:0,u2:3,rotate:!0},{name:"gar6",height:40,width:80,material:"red",position:new m.Vector3(-40,20,-110)},{name:"gar9",height:40,width:80,material:"blue",position:new m.Vector3(-80,20,-70),rotate:!0},{name:"gar11",height:40,width:50,material:"red",position:new m.Vector3(-55,20,-30)},{name:"mud0",height:20,width:15,material:"green",position:new m.Vector3(-22.5,30,0)},{name:"door_mud0",height:20,width:15,material:"magenta",position:new m.Vector3(-22.5,10,0)},{name:"mud1",height:40,width:15,material:"red",position:new m.Vector3(-7.5,20,0)},{name:"mud3",height:40,width:30,material:"blue",position:new m.Vector3(0,20,-15),rotate:!0},{name:"bra0",height:40,width:50,material:"red",position:new m.Vector3(-55,20,20)},{name:"bra1",height:40,width:5,material:"blue",position:new m.Vector3(-30,20,17.5),rotate:!0},{name:"bra2",height:20,width:15,material:"green",position:new m.Vector3(-30,30,7.5),rotate:!0},{name:"door_bra2",height:20,width:15,material:"magenta",position:new m.Vector3(-30,10,7.5),rotate:!0},{name:"bra4",height:40,width:30,material:"blue",position:new m.Vector3(-30,20,-15),rotate:!0},{name:"bra9",height:40,width:50,material:V.all.ground1,position:new m.Vector3(-80,20,-5),rotate:!0},{name:"brb0",height:40,width:50,material:"red",position:new m.Vector3(-55,20,70)},{name:"brb1",height:40,width:30,material:"blue",position:new m.Vector3(-30,20,55),rotate:!0},{name:"brb4",height:20,width:15,material:"green",position:new m.Vector3(-30,30,32.5),rotate:!0},{name:"door_brb4",height:20,width:15,material:"magenta",position:new m.Vector3(-30,10,32.5),rotate:!0},{name:"brb5",height:40,width:5,material:"blue",position:new m.Vector3(-30,20,22.5),rotate:!0},{name:"brb9",height:40,width:50,material:"blue",position:new m.Vector3(-80,20,45),rotate:!0},{name:"bha0",height:40,width:20,material:"red",position:new m.Vector3(0,20,60)},{name:"bha6",height:40,width:20,material:"red",position:new m.Vector3(0,20,20)},{name:"bha7",height:20,width:15,material:"green",position:new m.Vector3(-10,30,27.5),rotate:!0},{name:"door_bha7",height:20,width:15,material:"magenta",position:new m.Vector3(-10,10,27.5),rotate:!0},{name:"bha10",height:40,width:25,material:"blue",position:new m.Vector3(-10,20,47.5),rotate:!0},{name:"brc0",height:40,width:70,material:"red",position:new m.Vector3(-45,20,130)},{name:"brc1",height:40,width:15,material:"blue",position:new m.Vector3(-10,20,122.5),rotate:!0},{name:"brc2",height:20,width:15,material:"green",position:new m.Vector3(-10,30,107.5),rotate:!0},{name:"door_brc2",height:20,width:15,material:"magenta",position:new m.Vector3(-10,10,107.5),rotate:!0},{name:"brc3",height:40,width:10,material:"blue",position:new m.Vector3(-10,20,95),rotate:!0},{name:"brc4",height:20,width:15,material:"green",position:new m.Vector3(-10,30,82.5),rotate:!0},{name:"door_brc4",height:20,width:15,material:"magenta",position:new m.Vector3(-10,10,82.5),rotate:!0},{name:"brc5",height:40,width:15,material:"blue",position:new m.Vector3(-10,20,67.5),rotate:!0},{name:"brc6",height:20,width:20,material:"green",position:new m.Vector3(-20,30,60)},{name:"door_brc6",height:20,width:20,material:"magenta",position:new m.Vector3(-20,10,60)},{name:"brc9",height:40,width:60,material:"blue",position:new m.Vector3(-80,20,100),rotate:!0},{name:"bhb0",height:40,width:20,material:"red",position:new m.Vector3(0,20,90)},{name:"bhb3",height:40,width:40,material:"blue",position:new m.Vector3(30,20,110),rotate:!0},{name:"bhb6",height:40,width:40,material:"red",position:new m.Vector3(10,20,130)},{name:"liv0",height:40,width:50,material:V.all.floors,position:new m.Vector3(55,20,-50),tiled:!0,u1:6,u2:0},{name:"liv3",height:40,width:80,material:V.all.floors,position:new m.Vector3(80,20,-90),rotate:!0,tiled:!0,u1:2,u2:0},{name:"liv6",height:40,width:60,material:V.all.floors,position:new m.Vector3(50,20,-130),tiled:!0,u1:0,u2:2},{name:"liv7",height:40,width:20,material:V.all.floors,position:new m.Vector3(20,20,-120),rotate:!0,tiled:!0,u1:0,u2:2},{name:"liv8",height:10,width:20,material:V.all.floors,position:new m.Vector3(10,35,-110),tiled:!0,u1:0,u2:2},{name:"goal_liv8",height:30,width:20,material:"yellow",position:new m.Vector3(10,15,-110)},{name:"liv11",height:15,width:30,material:V.all.floors,position:new m.Vector3(15,32.5,-50),tiled:!0,u1:6,u2:0},{name:"kit0",height:15,width:30,material:"yellow",position:new m.Vector3(50,32.5,20)},{name:"kit1",height:7,width:30,material:"yellow",position:new m.Vector3(50,3.5,20)},{name:"kit2",height:40,width:15,material:"red",position:new m.Vector3(72.5,20,20)},{name:"kit3",height:40,width:70,material:"blue",position:new m.Vector3(80,20,-15),rotate:!0},{name:"kit10",height:15,width:20,material:"green",position:new m.Vector3(20,32.5,20)},{name:"kit11",height:40,width:5,material:"red",position:new m.Vector3(32.5,20,20)},{name:"fam0",height:40,width:70,material:"red",position:new m.Vector3(45,20,90)},{name:"fam3",height:40,width:70,material:"blue",position:new m.Vector3(80,20,55),rotate:!0},{name:"fam9",height:40,width:70,material:"blue",position:new m.Vector3(10,20,55),rotate:!0},{name:"floor",height:275,width:175,material:V.all.floors,position:new m.Vector3(0,0,0),tiled:!0,u1:2,u2:2},{name:"roof",height:275,width:175,material:V.all.floors,position:new m.Vector3(0,40,0),tiled:!0,u1:7,u2:5}];o.forEach((e=>{let t;if(e.tiled){const i=Array(5).fill(new m.Vector4.Zero),n=8,o=1;i[0]=new m.Vector4((e.u1||0)/n,(e.v1||0)/o,((e.u1||0)+1)/n,((e.v1||0)+1)/o),i[1]=new m.Vector4((e.u2||0)/n,(e.v2||0)/o,((e.u2||0)+1)/n,((e.v2||0)+1)/o);const a={faceUV:i,width:e.width,height:e.height,depth:.5,tileSize:20};t=m.MeshBuilder.CreateTiledBox(e.name,a)}else t=m.MeshBuilder.CreateBox(e.name,{height:e.height,width:e.width,depth:.5});e.material&&"string"===typeof e.material?t.material=n[e.material].material:e.material&&(t.material=e.material),t.position=e.position,t.rotation.y=e.rotate?Math.PI/2:0,t.rotation.x="roof"===e.name||"floor"===e.name?Math.PI/-2:0,t.checkCollisions=!0}));const a=[{name:"lamp",path:"assets/bioshock2/",file:"light_ceiling.glb",position:new m.Vector3(40,40,45),scaling:new m.Vector3(.15,.15,.15)},{name:"froggy_chair",path:"assets/",file:"Froggy Chair.glb",size:.2,position:new m.Vector3(50,0,55),rotation:new m.Vector3(0,Math.PI/-1.5,0),scaling:new m.Vector3(100,100,100)},{name:"gcn",path:"assets/",file:"gamecube.glb",collision:!0,size:25,position:new m.Vector3(25,0,125),rotation:new m.Vector3(Math.PI/2,Math.PI/-1.5,0),scaling:new m.Vector3(.25,.25,.25)}];a.forEach((t=>{m.SceneLoader.ImportMesh(null,t.path,t.file,e.scene,(i=>{const n=m.MeshBuilder.CreateBox(t.name,{size:t.size||1},e.scene);i.forEach((e=>{e.parent=n})),t.position&&(n.position=t.position),t.rotation&&(n.rotation=t.rotation),t.scaling&&(n.scaling=t.scaling),t.collision&&(n.checkCollisions=!0),n.visibility=0}))})),_(e.playerHeight,e.scene,e.canvas)}function _(e,t,i){const n=L(e);g.addCamera({name:"camera",playerHeight:e,position:n,scene:t,canvas:i}),g.addPointerLock(t,i)}function L(e){return new m.Vector3(10,2.55*e,-100)}function x(e){if(e&&e.name.includes("door_")){const t=C[e.name]||e.name.replace("door_","");return{mesh:e,action:()=>{e.dispose()},actionLabel:"Open",key:"e",label:t}}if(e&&e.name.includes("goal_")){const t=C[e.name]||e.name.replace("goal_","");return{mesh:e,action:()=>k?(e.dispose(),!1):"I need to find the Gamecube to leave!",actionLabel:"Leave",key:"e",label:t}}if(e&&"gcn"===e.name){const t=C[e.name]||e.name;return{mesh:e,action:()=>{e.dispose(),k=!0},actionLabel:"Collect",key:"e",label:t}}if(e&&"froggy_chair"===e.name){const t=C[e.name]||e.name;return{mesh:e,action:()=>"I can't sit now... I need to find the Gamecube!",actionLabel:"Sit on",key:"e",label:t}}}var A={createScene:M,handleFacingMesh:x};class O{constructor(){this.all={}}addLight(e){return this.all[e.name]=this.setupLight(e),this.all[e.name]}setupLight(e){return new m.HemisphericLight(e.name,new m.Vector3(0,1,0),e.scene)}}new O;const E=2,T=5;var S={name:"App",data(){return{canvas:void 0,crouch:!1,engine:void 0,interact:void 0,jLock:!1,jumpCounter:E,message:void 0,scene:void 0,keys:{}}},mounted(){this.addKeyListeners(),this.canvas=document.getElementById("game");let e=this.canvas.getContext("webgl");e.getParameter(e.RENDERER),this.engine=new m.Engine(this.canvas,!0,{preserveDrawingBuffer:!0,stencil:!0}),this.scene=new m.Scene(this.engine),this.scene.gravity=new m.Vector3(0,-2.4,0),this.scene.collisionsEnabled=!0,this.scene.enablePhysics(null,new m.CannonJSPlugin(!0,10,d)),this.setTextures(),A.createScene({scene:this.scene,engine:this.engine,canvas:this.canvas,playerHeight:T}),this.scene.registerAfterRender(this.keyboardListener),this.engine.runRenderLoop((()=>{this.scene.render()})),window.addEventListener("resize",(()=>{this.engine.resize()}))},methods:{addKeyListeners(){document.addEventListener("keydown",(e=>{69==e.keyCode&&(this.keys.e=!0),32==e.keyCode&&(this.keys.space=!0),16==e.keyCode&&(this.keys.shift=!0)})),document.addEventListener("keyup",(e=>{69==e.keyCode&&(this.keys.e=!1),32==e.keyCode&&(this.keys.space=!1),16==e.keyCode&&(this.keys.shift=!1)}))},keyboardListener(){if(this.scene.isReady()&&(this.keys.shift&&!this.crouch?(g.all.camera.ellipsoid.y=T/2,this.crouch=!0):!this.keys.shift&&this.crouch&&(g.all.camera.position.y+=T,g.all.camera.ellipsoid.y=T,this.crouch=!1),this.jumpCounter<E&&!this.jLock&&g.getGroundDistance("camera",this.scene)<2*T+1&&(this.jumpCounter=E),this.keys.space&&!this.jLock&&this.jumpCounter>0&&(this.jumpCounter--,this.jLock=!0,g.jump.setKeys([{frame:0,value:g.all.camera.position.y},{frame:20,value:g.all.camera.position.y+16}]),g.all.camera.animations=[g.jump],this.scene.beginAnimation(g.all.camera,0,20,!1)),this.jLock&&!this.keys.space&&(this.jLock=!1),this.interact=A.handleFacingMesh(g.getFacingMesh("camera",this.scene)),this.interact&&this.keys[this.interact.key])){const e=this.interact.action();e&&(this.message=e,setTimeout((()=>{this.message=""}),1500))}},setTextures(){const e={ground1:"assets/mochi_full.jpg",gregg:"assets/gregg_face.png",leo:"assets/leo_face.png",mochi:"assets/mochi_face.jpg",mochi2:"assets/mochi_face_2.png",nori:"assets/nori_face.png",nori2:"assets/nori_full.png",fenny:"assets/fenny.png",indy:"assets/indy.png",floors:"assets/floors.png"};Object.keys(e).forEach((t=>{V.addTexture({name:t,scene:this.scene,asset:e[t]})}))}}},I=i(3744);const P=(0,I.Z)(S,[["render",c]]);var R=P;(0,n.ri)(R).mount("#app")}},t={};function i(n){var o=t[n];if(void 0!==o)return o.exports;var a=t[n]={exports:{}};return e[n].call(a.exports,a,a.exports,i),a.exports}i.m=e,function(){var e=[];i.O=function(t,n,o,a){if(!n){var r=1/0;for(c=0;c<e.length;c++){n=e[c][0],o=e[c][1],a=e[c][2];for(var s=!0,h=0;h<n.length;h++)(!1&a||r>=a)&&Object.keys(i.O).every((function(e){return i.O[e](n[h])}))?n.splice(h--,1):(s=!1,a<r&&(r=a));if(s){e.splice(c--,1);var l=o();void 0!==l&&(t=l)}}return t}a=a||0;for(var c=e.length;c>0&&e[c-1][2]>a;c--)e[c]=e[c-1];e[c]=[n,o,a]}}(),function(){i.d=function(e,t){for(var n in t)i.o(t,n)&&!i.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={143:0};i.O.j=function(t){return 0===e[t]};var t=function(t,n){var o,a,r=n[0],s=n[1],h=n[2],l=0;if(r.some((function(t){return 0!==e[t]}))){for(o in s)i.o(s,o)&&(i.m[o]=s[o]);if(h)var c=h(i)}for(t&&t(n);l<r.length;l++)a=r[l],i.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return i.O(c)},n=window["webpackChunknochi3d"]=window["webpackChunknochi3d"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=i.O(void 0,[998],(function(){return i(4036)}));n=i.O(n)})();
//# sourceMappingURL=app.js.map?id=fdb8af370870565a