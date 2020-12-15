import * as THREE from '../three/build/three.module.js';

export function addSkyBox(Scene){	
	let loader = new THREE.CubeTextureLoader();
	loader.setPath( '/3d/skybox/glacial/')

	let textureCube = loader.load( [
		'px.png.jpg', 'nx.png.jpg',
		'py.png.jpg', 'ny.png.jpg',
		'pz.png.jpg', 'nz.png.jpg',
	] );

	let material = new THREE.MeshBasicMaterial( { side: THREE.DoubleSide,color: 0xffffff, envMap: textureCube })

	Scene.scene.background =  textureCube
}
