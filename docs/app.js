(function(){"use strict";var e={935:function(e,t,s){var n=s(963),i=s(252);function a(e,t,s,n,a,r){const c=(0,i.up)("router-view");return(0,i.wg)(),(0,i.j4)(c)}var r={name:"App"},c=s(744);const o=(0,c.Z)(r,[["render",a]]);var h=o,u=s(119);const d={class:"demo",id:"demo"};function l(e,t,s,n,a,r){return(0,i.wg)(),(0,i.iD)("canvas",d)}var m=s(385),p=s(125);class v{constructor(e){this.name=e.name,this.scene=e.scene,this.canvas=e.canvas,this.camera=void 0,this.wasd=e.wasd||!0,this.setup(),this.wasd&&this.addWASD()}setup(){this.camera=new m.UniversalCamera(this.name,new m.Vector3(0,3,-20),this.scene),this.camera.setTarget(m.Vector3.Zero()),this.camera.applyGravity=!0,this.camera.ellipsoid=new m.Vector3(1,1.5,1),this.camera.checkCollisions=!0,this.camera.attachControl(this.canvas,!0)}addWASD(){this.camera.keysUp.push(87),this.camera.keysDown.push(83),this.camera.keysRight.push(68),this.camera.keysLeft.push(65)}}class g{constructor(){this.all={}}addCamera(e){const t=new v(e);return this.all[e.name]=t,t}}const w=new g;var f=w;class y{constructor(e){this.name=e.name,this.width=e.width||100,this.height=e.height||100,this.subdivision=e.subdivision||0,this.scene=e.scene,this.updatable=e.updatable||!1,this.ground=void 0,this.setup()}setup(){this.ground=m.Mesh.CreateGround(this.name,this.width,this.height,this.subdivision,this.scene,this.updatable),this.ground.checkCollisions=!0}setTexture(e){this.ground.material=e.texture}}class b{constructor(){this.all={}}addGround(e){const t=new y(e);return this.all[e.name]=t,t}}const k=new b;var A=k;class x{constructor(e){this.name=e.name,this.scene=e.scene,this.light=void 0,this.setup()}setup(){this.light=new m.HemisphericLight(this.name,new m.Vector3(0,1,0),this.scene)}}class C{constructor(){this.all={}}addLight(e){const t=new x(e);return this.all[e.name]=t,t}}const O=new C;var T=O;class E{constructor(e){this.name=e.name,this.scene=e.scene,this.asset=e.asset||"",this.texture=void 0,this.setup(),this.asset&&this.setAsset()}setup(){this.texture=new m.StandardMaterial(this.name,this.scene)}setAsset(){this.texture.diffuseTexture=new m.Texture(this.asset,this.scene)}}class L{constructor(){this.all={}}addTexture(e){const t=new E(e);return this.all[e.name]=t,t}}const M=new L;var P=M,j={name:"demo",data(){return{camera:void 0,canvas:void 0,engine:void 0,map:{},scene:void 0}},mounted(){this.canvas=document.getElementById("demo");let e=this.canvas.getContext("webgl");e.getParameter(e.RENDERER),this.engine=new m.Engine(this.canvas,!0,{preserveDrawingBuffer:!0,stencil:!0}),this.createScene(),this.engine.runRenderLoop((()=>{this.scene.render()})),window.addEventListener("resize",(()=>{this.engine.resize()}))},methods:{createScene(){this.scene=new m.Scene(this.engine),this.scene.gravity=new m.Vector3(0,-.5,0),this.scene.collisionsEnabled=!0,this.scene.enablePhysics(null,new m.CannonJSPlugin(!0,10,p)),this.camera=f.addCamera({name:"camera",scene:this.scene,canvas:this.canvas}),this.scene.actionManager=new m.ActionManager(this.scene),this.scene.actionManager.registerAction(new m.ExecuteCodeAction(m.ActionManager.OnKeyDownTrigger,(e=>{this.map[e.sourceEvent.key]="keydown"==e.sourceEvent.type}))),this.scene.actionManager.registerAction(new m.ExecuteCodeAction(m.ActionManager.OnKeyUpTrigger,(e=>{this.map[e.sourceEvent.key]="keydown"==e.sourceEvent.type}))),this.scene.onPointerDown=e=>{this.canvas.requestPointerLock=this.canvas.requestPointerLock||this.canvas.msRequestPointerLock||this.canvas.mozRequestPointerLock||this.canvas.webkitRequestPointerLock,this.canvas.requestPointerLock&&this.canvas.requestPointerLock()},T.addLight({name:"light1",scene:this.scene});let e=m.Mesh.CreateSphere("sphere1",16,8,this.scene,!1,m.Mesh.FRONTSIDE),t=new m.StandardMaterial("sphereTexture",this.scene);t.diffuseTexture=new m.Texture("assets/nori.png",this.scene),e.material=t,e.position.y=4;const s=m.MeshBuilder.CreateBox("box",{size:8},this.scene);s.position.y=4;const n=new m.Animation("rotateSphere","rotation.y",10,m.Animation.ANIMATIONTYPE_FLOAT,m.Animation.ANIMATIONLOOPMODE_CYCLE),i=[];i.push({frame:0,value:0}),i.push({frame:40,value:2*Math.PI}),n.setKeys(i),e.animations.push(n),this.scene.beginAnimation(e,0,40,!0),s.checkCollisions=!0,s.visibility=0,A.addGround({name:"ground1",width:250,height:250,scene:this.scene}),P.addTexture({name:"ground1",scene:this.scene,asset:"assets/grass.jpg"}),A.all.ground1.setTexture(P.all.ground1),this.jumping=!1,this.scene.registerAfterRender(this.registerAfterRenderCallback)},registerAfterRenderCallback(){this.map[" "]&&!this.jumping&&(this.jumping=!0,this.camera.camera.cameraDirection.y+=2),this.camera.camera.cameraDirection.y<=.1&&(this.jumping=!1)}}};const D=(0,c.Z)(j,[["render",l],["__scopeId","data-v-eb778242"]]);var R=D;const S=[{path:"/",name:"Title",component:R}],I=(0,u.p7)({history:(0,u.r5)(),routes:S});var q=I;(0,n.ri)(h).use(q).mount("#app")}},t={};function s(n){var i=t[n];if(void 0!==i)return i.exports;var a=t[n]={exports:{}};return e[n].call(a.exports,a,a.exports,s),a.exports}s.m=e,function(){var e=[];s.O=function(t,n,i,a){if(!n){var r=1/0;for(u=0;u<e.length;u++){n=e[u][0],i=e[u][1],a=e[u][2];for(var c=!0,o=0;o<n.length;o++)(!1&a||r>=a)&&Object.keys(s.O).every((function(e){return s.O[e](n[o])}))?n.splice(o--,1):(c=!1,a<r&&(r=a));if(c){e.splice(u--,1);var h=i();void 0!==h&&(t=h)}}return t}a=a||0;for(var u=e.length;u>0&&e[u-1][2]>a;u--)e[u]=e[u-1];e[u]=[n,i,a]}}(),function(){s.d=function(e,t){for(var n in t)s.o(t,n)&&!s.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={143:0};s.O.j=function(t){return 0===e[t]};var t=function(t,n){var i,a,r=n[0],c=n[1],o=n[2],h=0;if(r.some((function(t){return 0!==e[t]}))){for(i in c)s.o(c,i)&&(s.m[i]=c[i]);if(o)var u=o(s)}for(t&&t(n);h<r.length;h++)a=r[h],s.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return s.O(u)},n=window["webpackChunknochi3d"]=window["webpackChunknochi3d"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=s.O(void 0,[998],(function(){return s(935)}));n=s.O(n)})();
//# sourceMappingURL=app.js.map?id=8ca5b7f75893e45c