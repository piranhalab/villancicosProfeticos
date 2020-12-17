import * as THREE from "../three/build/three.module.js";
class pinitoPath extends THREE.Curve {

	constructor( scale = 1 ) {
		super();
		this.scale = scale;
	}

	getPoint( t, optionalTarget = new THREE.Vector3() ) {

		/*const tx = t * 3 - 1.5;
		const ty = Math.sin( 2 * Math.PI * t );
		const tz = 0;
		*/
		const tx = (1-t) * 30*Math.cos(200*t) 
		const tz = (1-t) * 30*Math.sin(200*t)
		const ty = 100*t
		return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );

	}

}



export const addPine = function (Scene) {
	/*
	const geom = new THREE.TorusKnotGeometry( 20, 1.7, 10, 4,6,11 );
	const mat = new THREE.MeshStandardMaterial( { color: 0xff0000, metalness:0.5,roughness:0.5 } );
	const p1 = new THREE.Mesh( geom, mat );
	p1.rotation.x = Math.PI/2
	p1.position.set( 9.245764838085572,  1.6999999999999424,  250.2769107059081)

	const p2 = p1.clone()
	p2.position.y =3
	Scene.scene.add( p1 );
	Scene.scene.add( p2 );

	Scene.p1 = p1
	Scene.p2 = p2
	*/
	/*
	const geom= new THREE.ConeGeometry( 20, 100, 32 );
	const mat = new THREE.MeshStandardMaterial( {color: 0x00ff00} );
	const cone = new THREE.Mesh( geom, mat);
	cone.position.set(-4,5,250)
	Scene.cone = cone
	Scene.scene.add( cone );
	*/
	const path = new pinitoPath( 1);
	const geometry = new THREE.TubeGeometry( path, 100, 2, 8, false );
	const material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
	const mesh = new THREE.Mesh( geometry, material );
	mesh.position.set(-4,5,250)
	Scene.pine = mesh
	Scene.scene.add( mesh )
}



