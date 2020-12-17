import * as THREE from "./three/build/three.module.js";
import  {GLTFLoader} from "./three/examples/jsm/loaders/GLTFLoader.js"
import  {DRACOLoader} from "./three/examples/jsm/loaders/DRACOLoader.js"

import { Controls } from "./Controls.js";
import { Avatar } from "./Scene/Avatar.js";

import { addSkyBox } from "./Scene/Sky.js";

import { addFloor } from "./Scene/Floor.js";
import { addZordon } from "./Scene/Zordon.js";
import { addCiudad } from "./Scene/Ciudad.js";
import { addScreens } from "./Scene/Screens.js"
import { addSnow } from "./Scene/snow.js"
import { addVilla } from "./Scene/villa.js"
//import { addAliens } from "./Scene/aliens.js"
import { addCarrusel } from "./Scene/carrusel.js"
import { addEsferas } from "./Scene/esferas.js"
import { addPine } from "./Scene/pine.js"

export const Scene = {
    scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000),
    renderer: new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance"}),
    loader: new GLTFLoader(),
    dracoLoader: new DRACOLoader(),
    ambientLight: new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.5 ),
    pointLight: new THREE.DirectionalLight( 0xffffff, 1, 800 ),
//	new THREE.SpotLight(0x61647C),
    init: function () {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.querySelector("#scene").appendChild(this.renderer.domElement);
	this.dracoLoader.setDecoderPath( '/js/three/examples/js/libs/draco/' );
	this.loader.setDRACOLoader( this.dracoLoader );

	this.renderer.shadowMap.enabled = true;
	this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

	this.renderer.outputEncoding = THREE.GammaEncoding
	this.renderer.toneMappingExposure = 80
	this.renderer.gammaFactor = 0.02
	
	this.scene.add( this.ambientLight );
	this.scene.add( this.pointLight );
	
	
	this.pointLight.position.set(-20, 27, 14)
	this.pointLight.target.position.set(-90, -50, 1)
	this.pointLight.castShadow = true;

	this.pointLight.shadow.mapSize.width = 1024;//512;
	this.pointLight.shadow.mapSize.height = 1024//512;


	//this.scene.fog = new THREE.FogExp2()
	this.renderer.toneMapping = THREE.ReinhardToneMapping;
 	//postprocessing(Scene)

        this.controls = Controls.init(this);
        this.avatar = Avatar.init(this);

	this.sky = addSkyBox(this)
        this.floor = addFloor(this)
        this.ciudad = addCiudad(this)
        this.zordon = addZordon(this)
	    this.snow = addSnow(this)
	addScreens(this)
	addVilla(this)
//	addAliens(this)
	addCarrusel(this)
	addEsferas(this) 
	addPine(this)

        this.animate();
    },
    audioListener: {},
    salas: {},
    
    animate: function () {
        window.requestAnimationFrame(Scene.animate);
        Scene.renderer.render(Scene.scene, Scene.camera);
    }
};
window.addEventListener('resize', function onWindowResize() {
    Scene.camera.aspect = window.innerWidth / window.innerHeight;
    Scene.camera.updateProjectionMatrix();
    Scene.renderer.setSize(window.innerWidth, window.innerHeight);
}, false);
document.querySelectorAll(".quality").forEach(function (qual_item) {
    qual_item.addEventListener("click", function (event) {
        let selection = event.target;
        let quality = parseFloat(selection.getAttribute("quality"));
        document.querySelectorAll(".quality").forEach(function (qual) {
            qual.classList.remove("active");
        });
        selection.classList.add("active");
        Scene.renderer.setPixelRatio(quality);
    });
});
window.Scene = Scene;
window.THREE = THREE;
