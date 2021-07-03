import * as THREE from "../three/build/three.module.js";
export const addVilla = function (Scene) {
	Scene.loader.load('/3d/casa.glb', function(gltf){
		let casa = gltf.scene
		casa.scale.setScalar(0.5)

		let pos=[
			[-10,-10],
			[-30,-20],
			[10,20],
			[-100, 100],
			[-100, 200],
			[-100, 300],
			[-10, 300],
			[100, 0],
			[100, 100],
			[100, 200],
			[100, 300],
		]
		pos.forEach((P)=>{
			let cs = casa.clone()
			cs.position.set(P[0],10,P[1])
			Scene.scene.add(cs)
		})
		Scene.villa = casa
	})
}
