import * as THREE from "../three/build/three.module.js";
export const addAliens = function (Scene) {
	const geom = new THREE.CylinderBufferGeometry( 0.5, 0.5, 1, 32,32, true );
	const mat = new THREE.MeshBasicMaterial( {
		map:new THREE.TextureLoader().load( "/img/alien.png" ),
		side: THREE.DoubleSide
	});
	mat.map.wrapS = THREE.RepeatWrapping;
	mat.map.wrapT = THREE.RepeatWrapping;
	mat.map.repeat.set(2.5,1)
	
	const cyl = new THREE.Mesh( geom, mat );
	cyl.rotation.y = 1.3
	Scene.scene.add( cyl );


	const geom2 = new THREE.CylinderBufferGeometry( 0.51, 0.51, 1, 32,32, true, 0, 3.8 );
	const mat2 = new THREE.MeshBasicMaterial( { side: THREE.DoubleSide, color: 0x222d33})
	const cyl2 = new THREE.Mesh( geom2, mat2 );
	Scene.scene.add( cyl2 );

}
