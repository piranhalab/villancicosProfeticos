import * as THREE from "../three/build/three.module.js";

export const addEsferas = function (Scene) {

	const esfera = new THREE.Group()
	const esferas = new THREE.Group()

	const geom = new THREE.SphereGeometry( 2, 32, 32 );
	const mat = new THREE.MeshStandardMaterial ( {
		color: 0xb24b27,
		metalness: 0.2,
		roughneess:0.1
	} );
	const bola = new THREE.Mesh( geom, mat );

	const geom2 = new THREE.CylinderGeometry( 0.7, 0.7, 1, 32 );
	const palito = new THREE.Mesh( geom2, mat );
	palito.position.y = 2

	esfera.add(bola)
	esfera.add(palito)
	for (let k=0; k<200; k++){
		let esf = esfera.clone()
		esf.position.set(THREE.Math.randFloat(-300,300),
			THREE.Math.randFloat(20,100),
			THREE.Math.randFloat(-300,300),
		)
		esferas.add(esf)
	}
	
	Scene.esfera = esferas
	Scene.scene.add(esferas)
}
