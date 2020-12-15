import * as THREE from "../three/build/three.module.js";

export const addCiudad = function(Scene){
	let cityGeometry = new THREE.TorusKnotBufferGeometry(15, 0.5, 100, 16 );
	var cityMaterial = new THREE.MeshStandardMaterial( {
		color: 0xfaff6b,
		metalness: 0.9,
		roughness: 0.1,
		//envmap: scene.background,
		//side: THREE.DoubleSide,
		// map: cityTexture,
		//transparent: true,
		//opacity: 0.75,
	} );
	let tam;
	for(var i = 0; i < 20; i++){
		for(var j = 0; j < 20; j++){
			var city = new THREE.Mesh( cityGeometry, cityMaterial );
			//city.wireframe = true;
			//city.wireframeLinewidth = 2;
			tam = Math.random() * 320;

			city.position.x = i * 100 - 1000;
			city.position.z = j* 100 - 1000;
			city.position.y = tam  ;
			city.scale.x = 3;
			city.scale.y = 3;
			city.scale.z = 3;
			city.rotation.x = Math.PI /2 * Math.random();
			Scene.scene.add( city);
		}
	}
	let x = 0
	setInterval(
		()=>{
			let colors = [0x00fff7, 0xffa600, 0xff00dd];
			cityMaterial.color.set(colors[x % colors.length])
			x++;
		}, 2000
	)
	return cityMaterial
}
