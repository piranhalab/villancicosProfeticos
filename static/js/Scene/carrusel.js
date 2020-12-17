import {inside} from "../point-in-polygon/index.js"
import * as THREE from "../three/build/three.module.js";
export const addCarrusel = function (Scene) {
	const geom = new THREE.CylinderBufferGeometry( 48, 48, 4, 32, 32, true );
	const mat = new THREE.MeshBasicMaterial( {color: 0xffff00, transparent:true, opacity:0.5,side: THREE.DoubleSide} );
	const rueda = new THREE.Mesh( geom, mat );
	rueda.rotation.z = Math.PI/2
	rueda.rotation.y = Math.PI/2
	rueda.position.set(32.8233879059397813, 51, 379.41482997209545)
	Scene.rueda = rueda
	Scene.scene.add( rueda );
	
	// asientos
	const geom2 = new THREE.SphereGeometry( 5, 32, 32 );
	const mat2 = new THREE.MeshBasicMaterial( {color: 0x00aaff, transparent:true, opacity:0.5,side: THREE.DoubleSide} );
	const asiento = new THREE.Mesh( geom2, mat2 );

	let asientos = new THREE.Group()
	asientos.rotation.order = "YXZ"
	asientos.position.set(32.82,0,379.414)
	asientos.rotation.y = Math.PI/2
	for(let k = 0; k<16;k++){
		let as = asiento.clone()
		as.position.set(0, Math.sin(THREE.Math.DEG2RAD  * (k * 360/16)) * 50,  - Math.cos(THREE.Math.DEG2RAD  * (k * 360/16)) * 50)
		asientos.add(as)
	}
	setInterval(()=>{
		asientos.rotation.x +=0.025
		if(Users.me.level >0){
			let t = new THREE.Vector3(); // create once an reuse it
			let asiento = asientos.children[Users.me.level-1];
			asiento.material.opacity= 0
			asiento.getWorldPosition( t );
			Scene.camera.position.set(t.x,t.y,t.z)
		}
	},200)
	Scene.scene.add(asientos)
	asientos.position.y = 51
	Scene.asientos = asientos


	const geom3 = new THREE.BoxBufferGeometry( 5, 5, 5 );
	const mat3 = new THREE.MeshBasicMaterial( {color: 0x00aa00, transparent:true, opacity:0.2,side: THREE.DoubleSide} );
	const entrada = new THREE.Mesh( geom3, mat3 );
	entrada.position.set(24, 2.5, 433)
	Scene.scene.add(entrada)
	Scene.entr = entrada
	let EntradaVrtx = [
		[21.485394355621537,430.27712900629257],
		[21.485394355621537,435.27712900629257],
		[26.485394355621537,435.27712900629257],
		[26.485394355621537,430.27712900629257]
	]
	
	window.addEventListener("keyup", function(event){
		let key = event.key
		let lvl = Users.me.level
		let pos = Scene.camera.position

		if(key=="Enter" || key=="x" || key=="X"){
			if(Users.me.level >0){
				let asiento = asientos.children[Users.me.level-1];
				asiento.material.opacity= 0.1
				Users.me.level = 0
				Scene.camera.position.set(22.77595307167979, 1.6999999999997357, 335.2361828277905)
				Scene.controls.vel = (1 + parseFloat(document.querySelector("#velocidad").value)) / 100
				return
			}
			let res = inside([pos.x, pos.z], EntradaVrtx)
			console.info("RES",res)
			if(res){
				Users.me.level = 1+Math.floor(Math.random()*16)
				Scene.controls.vel = 0
			}
		}
	})

}
